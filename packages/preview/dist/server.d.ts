import { SystemWorkspace } from '@designagent/core';
import { ComponentRegistry } from './registry.js';
/**
 * Preview server options.
 */
export interface PreviewServerOptions {
    port?: number;
    host?: string;
}
/**
 * Preview server - local runtime for component exploration.
 */
export declare class PreviewServer {
    private workspace;
    private options;
    private app;
    private server;
    private watcher;
    private registry;
    private reloadCallbacks;
    constructor(workspace: SystemWorkspace, options?: PreviewServerOptions);
    /**
     * Create Express app with API routes.
     */
    private createApp;
    /**
     * Start the preview server.
     */
    start(): Promise<{
        port: number;
        host: string;
    }>;
    /**
     * Stop the preview server.
     */
    stop(): Promise<void>;
    /**
     * Start file watcher for hot reload.
     */
    private startWatcher;
    /**
     * Stop file watcher.
     */
    private stopWatcher;
    /**
     * Trigger reload callbacks.
     */
    reload(): void;
    /**
     * Register a reload callback.
     */
    onReload(callback: () => void): void;
    /**
     * Get the component registry.
     */
    getRegistry(): ComponentRegistry;
}
/**
 * Create a preview server instance.
 */
export declare function createPreviewServer(workspace: SystemWorkspace, options?: PreviewServerOptions): PreviewServer;
//# sourceMappingURL=server.d.ts.map