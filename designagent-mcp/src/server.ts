import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { listScreens, loadScreenKit } from "./screenKits.js";
import { getThemeKit } from "./themeKits.js";

async function main() {
  const server = new McpServer({
    name: "designagent-mcp",
    version: "0.1.0",
  });

  // list_screens tool
  server.registerTool(
    "list_screens",
    {
      title: "List Screens",
      description: "List available DesignAgent screen kits.",
      inputSchema: {},
      outputSchema: {
        screens: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            framework: z.string(),
            tags: z.array(z.string()),
          })
        ),
      },
    },
    async () => {
      const screens = listScreens();
      const output = { screens };
      return {
        content: [{ type: "text", text: JSON.stringify(output) }],
        structuredContent: output,
      };
    }
  );

  // get_screen_kit tool
  server.registerTool(
    "get_screen_kit",
    {
      title: "Get Screen Kit",
      description:
        "Get the file kit for a given DesignAgent screen (paths + file content).",
      inputSchema: {
        screenId: z.string(),
      },
      outputSchema: {
        files: z.array(
          z.object({
            path: z.string(),
            content: z.string(),
          })
        ),
      },
    },
    async (input) => {
      const kit = await loadScreenKit(input.screenId);
      if (!kit) {
        throw new Error(`Unknown screenId: ${input.screenId}`);
      }
      const output = {
        files: kit.files,
      };
      return {
        content: [{ type: "text", text: JSON.stringify(output) }],
        structuredContent: output,
      };
    }
  );

  // get_theme_kit tool
  const GetThemeKitInputSchema = z.object({
    themeId: z.string().describe("Theme identifier, e.g. 'midnight', 'activeGreen', 'wellnessPeach'"),
  });

  const GetThemeKitOutputSchema = z.object({
    files: z.array(
      z.object({
        path: z.string(),
        content: z.string(),
      })
    ),
  });

  server.registerTool(
    "get_theme_kit",
    {
      title: "Get Theme Kit",
      description: "Get DesignAgent theme files (tokens + theme + rules) for a given themeId.",
      inputSchema: GetThemeKitInputSchema,
      outputSchema: GetThemeKitOutputSchema,
    },
    async (input) => {
      const kit = getThemeKit(input.themeId);
      if (!kit) {
        throw new Error(`Unknown themeId: ${input.themeId}`);
      }
      const output = {
        files: kit.files,
      };
      return {
        content: [{ type: "text", text: JSON.stringify(output) }],
        structuredContent: output,
      };
    }
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("DesignAgent MCP server error:", err);
  process.exit(1);
});

