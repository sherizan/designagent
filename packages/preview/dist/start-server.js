#!/usr/bin/env node
import { SystemWorkspace } from '@designagent/core';
import { startVitePreviewServer } from './vite-server.js';
const workspacePath = process.env.DESIGNAGENT_WORKSPACE;
const port = parseInt(process.env.DESIGNAGENT_PORT || '3333', 10);
if (!workspacePath) {
    console.error('Error: DESIGNAGENT_WORKSPACE environment variable is required');
    process.exit(1);
}
console.log(`Starting preview server for workspace: ${workspacePath}`);
const workspace = new SystemWorkspace(workspacePath);
startVitePreviewServer({ port, workspace })
    .then((server) => {
    console.log(`PREVIEW_READY:${server.url}`);
    console.log(`Preview server running at ${server.url}`);
    process.on('SIGTERM', async () => {
        console.log('Shutting down preview server...');
        await server.stop();
        process.exit(0);
    });
    process.on('SIGINT', async () => {
        console.log('Shutting down preview server...');
        await server.stop();
        process.exit(0);
    });
})
    .catch((err) => {
    console.error('Failed to start preview server:', err);
    process.exit(1);
});
//# sourceMappingURL=start-server.js.map