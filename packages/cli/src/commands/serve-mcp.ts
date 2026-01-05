import { resolve } from 'node:path';
import { SystemWorkspace } from '@designagent/core';
import { startMCPServer } from '@designagent/mcp';

interface ServeMcpOptions {
  workspace: string;
}

export async function serveMcpCommand(options: ServeMcpOptions): Promise<void> {
  const workspacePath = resolve(process.cwd(), options.workspace);

  const workspace = new SystemWorkspace(workspacePath);

  // Check workspace exists
  if (!(await workspace.exists())) {
    // Write to stderr so it doesn't interfere with MCP protocol
    process.stderr.write('Error: Workspace not found.\n');
    process.stderr.write('Run "designagent init" to create a workspace.\n');
    process.exit(1);
  }

  // Start MCP server (blocks on stdio)
  try {
    await startMCPServer({ workspacePath });
  } catch (err) {
    process.stderr.write(`MCP server error: ${err}\n`);
    process.exit(1);
  }
}
