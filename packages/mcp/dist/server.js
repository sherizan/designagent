import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { SystemWorkspace } from '@designagent/core';
import { listComponents, getComponent, getTokens, validateComponentUsage, } from './tools.js';
/**
 * Create and start the MCP server.
 */
export async function createMCPServer(options) {
    const workspace = new SystemWorkspace(options.workspacePath);
    // Verify workspace exists
    if (!(await workspace.exists())) {
        throw new Error(`Workspace not found: ${options.workspacePath}`);
    }
    const server = new Server({
        name: 'designagent',
        version: '0.1.0',
    }, {
        capabilities: {
            tools: {},
        },
    });
    // List available tools
    server.setRequestHandler(ListToolsRequestSchema, async () => {
        return {
            tools: [
                {
                    name: 'listComponents',
                    description: 'List all component contracts in the workspace',
                    inputSchema: {
                        type: 'object',
                        properties: {},
                        required: [],
                    },
                },
                {
                    name: 'getComponent',
                    description: 'Get a specific component contract by name',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'string',
                                description: 'Component name (e.g., "Button")',
                            },
                        },
                        required: ['name'],
                    },
                },
                {
                    name: 'getTokens',
                    description: 'Get compiled design tokens for a platform and theme',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            platform: {
                                type: 'string',
                                enum: ['web', 'rn'],
                                description: 'Target platform',
                            },
                            theme: {
                                type: 'string',
                                enum: ['light', 'dark'],
                                description: 'Theme to compile',
                            },
                        },
                        required: ['platform', 'theme'],
                    },
                },
                {
                    name: 'validateUsage',
                    description: 'Validate component usage against its contract',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            component: {
                                type: 'string',
                                description: 'Component name',
                            },
                            props: {
                                type: 'object',
                                description: 'Props to validate',
                            },
                        },
                        required: ['component', 'props'],
                    },
                },
            ],
        };
    });
    // Handle tool calls
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        try {
            switch (name) {
                case 'listComponents': {
                    const result = await listComponents(workspace);
                    return {
                        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
                    };
                }
                case 'getComponent': {
                    const componentName = args.name;
                    const result = await getComponent(workspace, componentName);
                    return {
                        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
                    };
                }
                case 'getTokens': {
                    const { platform, theme } = args;
                    const result = await getTokens(workspace, { platform, theme });
                    return {
                        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
                    };
                }
                case 'validateUsage': {
                    const { component, props } = args;
                    const result = await validateComponentUsage(workspace, { component, props });
                    return {
                        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
                    };
                }
                default:
                    return {
                        content: [{ type: 'text', text: `Unknown tool: ${name}` }],
                        isError: true,
                    };
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            return {
                content: [{ type: 'text', text: `Error: ${message}` }],
                isError: true,
            };
        }
    });
    return server;
}
/**
 * Start MCP server with stdio transport.
 */
export async function startMCPServer(options) {
    const server = await createMCPServer(options);
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
//# sourceMappingURL=server.js.map