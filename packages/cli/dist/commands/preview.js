import { resolve } from 'node:path';
import { SystemWorkspace } from '@designagent/core';
import { createPreviewServer } from '@designagent/preview';
export async function previewCommand(options) {
    const workspacePath = resolve(process.cwd(), options.workspace);
    const port = parseInt(options.port, 10);
    const workspace = new SystemWorkspace(workspacePath);
    // Check workspace exists
    if (!(await workspace.exists())) {
        console.error('Error: Workspace not found.');
        console.error('Run "designagent init" to create a workspace.');
        process.exit(1);
    }
    // Validate first
    const validation = await workspace.validate();
    if (!validation.valid) {
        console.error('Error: Workspace has validation errors.');
        console.error('Run "designagent validate" to see details.');
        process.exit(1);
    }
    // Start server
    const server = createPreviewServer(workspace, { port });
    try {
        const { port: actualPort, host } = await server.start();
        console.log('');
        console.log('DesignAgent Preview Server');
        console.log('==========================');
        console.log('');
        console.log(`  Workspace: ${workspacePath}`);
        console.log(`  Server:    http://${host}:${actualPort}`);
        console.log('');
        console.log('Endpoints:');
        console.log(`  GET /api/contracts           - List all contracts`);
        console.log(`  GET /api/contracts/:name     - Get contract by name`);
        console.log(`  GET /api/tokens/:platform/:theme - Get compiled tokens`);
        console.log(`  GET /api/registry            - List registered components`);
        console.log(`  GET /api/validate            - Validate workspace`);
        console.log('');
        console.log('Watching for file changes...');
        console.log('Press Ctrl+C to stop.');
        console.log('');
        // Handle shutdown
        process.on('SIGINT', async () => {
            console.log('');
            console.log('Shutting down...');
            await server.stop();
            process.exit(0);
        });
        process.on('SIGTERM', async () => {
            await server.stop();
            process.exit(0);
        });
    }
    catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
}
//# sourceMappingURL=preview.js.map