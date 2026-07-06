// Anonymous tool-usage counts from the DesignAgent MCP bridge (designagent-figma
// repo, claude-plugin/mcp). Payload: { v: version, id: install-uuid, counts:
// { toolName: n } } — tool names and tallies only, never design content.
// Tallies land in Upstash Redis via its REST pipeline API (no client dependency):
//   tools:total          — all-time hash of tool → calls
//   tools:YYYY-MM        — monthly hash for trend
//   users:YYYY-MM        — HyperLogLog of active install ids
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const TOOL_NAME = /^[a-z][a-z0-9_]{0,63}$/;

export async function POST(request: Request) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return new Response(null, { status: 503 });
  }
  let body: { v?: unknown; id?: unknown; counts?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }
  const counts = Object.entries((body.counts ?? {}) as Record<string, unknown>).filter(
    (entry): entry is [string, number] =>
      TOOL_NAME.test(entry[0]) &&
      typeof entry[1] === 'number' &&
      Number.isInteger(entry[1]) &&
      entry[1] > 0 &&
      entry[1] <= 10_000
  );
  if (counts.length === 0 || counts.length > 100) {
    return new Response(null, { status: 400 });
  }
  const month = new Date().toISOString().slice(0, 7);
  const pipeline: (string | number)[][] = [];
  for (const [tool, n] of counts) {
    pipeline.push(['HINCRBY', 'tools:total', tool, n]);
    pipeline.push(['HINCRBY', `tools:${month}`, tool, n]);
  }
  if (typeof body.id === 'string' && body.id.length > 0 && body.id.length <= 64) {
    pipeline.push(['PFADD', `users:${month}`, body.id]);
  }
  const result = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: { authorization: `Bearer ${REDIS_TOKEN}` },
    body: JSON.stringify(pipeline),
  });
  return new Response(null, { status: result.ok ? 204 : 502 });
}
