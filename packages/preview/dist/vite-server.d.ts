import type { SystemWorkspace } from '@designagent/core';
export interface VitePreviewServerOptions {
    port?: number;
    workspace: SystemWorkspace;
}
export interface VitePreviewServer {
    url: string;
    port: number;
    stop: () => Promise<void>;
}
/**
 * Create and start a Vite-powered preview server.
 */
export declare function startVitePreviewServer(options: VitePreviewServerOptions): Promise<VitePreviewServer>;
//# sourceMappingURL=vite-server.d.ts.map