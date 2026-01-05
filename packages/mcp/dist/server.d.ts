import { Server } from '@modelcontextprotocol/sdk/server/index.js';
/**
 * MCP server options.
 */
export interface MCPServerOptions {
    workspacePath: string;
}
/**
 * Create and start the MCP server.
 */
export declare function createMCPServer(options: MCPServerOptions): Promise<Server>;
/**
 * Start MCP server with stdio transport.
 */
export declare function startMCPServer(options: MCPServerOptions): Promise<void>;
//# sourceMappingURL=server.d.ts.map