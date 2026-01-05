import express, { type Express, type Request, type Response } from 'express';
import { createServer, type Server as HttpServer } from 'node:http';
import { watch, type FSWatcher } from 'node:fs';
import { SystemWorkspace, type Platform, type Theme } from '@designagent/core';
import { ComponentRegistry, createRegistry } from './registry.js';

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
export class PreviewServer {
  private app: Express;
  private server: HttpServer | null = null;
  private watcher: FSWatcher | null = null;
  private registry: ComponentRegistry;
  private reloadCallbacks: Array<() => void> = [];

  constructor(
    private workspace: SystemWorkspace,
    private options: PreviewServerOptions = {}
  ) {
    this.registry = createRegistry();
    this.app = this.createApp();
  }

  /**
   * Create Express app with API routes.
   */
  private createApp(): Express {
    const app = express();
    app.use(express.json());

    // CORS for local development
    app.use((_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    // API: List contracts
    app.get('/api/contracts', async (_req: Request, res: Response) => {
      try {
        const contracts = await this.workspace.listContracts();
        res.json({ contracts });
      } catch (error) {
        res.status(500).json({ error: String(error) });
      }
    });

    // API: Get contract
    app.get('/api/contracts/:name', async (req: Request, res: Response) => {
      try {
        const name = req.params.name;
        if (!name) {
          res.status(400).json({ error: 'Missing contract name' });
          return;
        }
        const contract = await this.workspace.readContract(name);
        res.json({ contract });
      } catch (error) {
        res.status(404).json({ error: String(error) });
      }
    });

    // API: Get compiled tokens
    app.get('/api/tokens/:platform/:theme', async (req: Request, res: Response) => {
      try {
        const platform = req.params.platform as Platform;
        const theme = req.params.theme as Theme;

        if (!['web', 'rn'].includes(platform)) {
          res.status(400).json({ error: 'Invalid platform. Use "web" or "rn".' });
          return;
        }
        if (!['light', 'dark'].includes(theme)) {
          res.status(400).json({ error: 'Invalid theme. Use "light" or "dark".' });
          return;
        }

        const tokens = await this.workspace.compileTokens({ platform, theme });
        res.json({ tokens, platform, theme });
      } catch (error) {
        res.status(500).json({ error: String(error) });
      }
    });

    // API: Registry status
    app.get('/api/registry', (_req: Request, res: Response) => {
      res.json({
        registered: this.registry.list(),
        count: this.registry.list().length,
      });
    });

    // API: Validate workspace
    app.get('/api/validate', async (_req: Request, res: Response) => {
      try {
        const result = await this.workspace.validate();
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: String(error) });
      }
    });

    // Health check
    app.get('/health', (_req: Request, res: Response) => {
      res.json({ status: 'ok', workspace: this.workspace.rootPath });
    });

    // Root - simple status page
    app.get('/', async (_req: Request, res: Response) => {
      try {
        const contracts = await this.workspace.listContracts();
        const system = await this.workspace.readSystem();
        res.json({
          name: 'DesignAgent Preview',
          system: system.name,
          version: system.version,
          contracts,
          endpoints: {
            contracts: '/api/contracts',
            tokens: '/api/tokens/:platform/:theme',
            registry: '/api/registry',
            validate: '/api/validate',
          },
        });
      } catch (error) {
        res.status(500).json({ error: String(error) });
      }
    });

    return app;
  }

  /**
   * Start the preview server.
   */
  async start(): Promise<{ port: number; host: string }> {
    const port = this.options.port ?? 3456;
    const host = this.options.host ?? 'localhost';

    return new Promise((resolve, reject) => {
      this.server = createServer(this.app);
      
      this.server.on('error', reject);
      
      this.server.listen(port, host, () => {
        // Start file watcher for hot reload
        this.startWatcher();
        resolve({ port, host });
      });
    });
  }

  /**
   * Stop the preview server.
   */
  async stop(): Promise<void> {
    this.stopWatcher();
    
    return new Promise((resolve, reject) => {
      if (!this.server) {
        resolve();
        return;
      }

      this.server.close((err) => {
        if (err) reject(err);
        else resolve();
      });
      
      this.server = null;
    });
  }

  /**
   * Start file watcher for hot reload.
   */
  private startWatcher(): void {
    try {
      this.watcher = watch(
        this.workspace.rootPath,
        { recursive: true },
        (_eventType, filename) => {
          if (filename?.endsWith('.json')) {
            this.reload();
          }
        }
      );
    } catch {
      // Watching not supported, ignore
    }
  }

  /**
   * Stop file watcher.
   */
  private stopWatcher(): void {
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }
  }

  /**
   * Trigger reload callbacks.
   */
  reload(): void {
    for (const callback of this.reloadCallbacks) {
      callback();
    }
  }

  /**
   * Register a reload callback.
   */
  onReload(callback: () => void): void {
    this.reloadCallbacks.push(callback);
  }

  /**
   * Get the component registry.
   */
  getRegistry(): ComponentRegistry {
    return this.registry;
  }
}

/**
 * Create a preview server instance.
 */
export function createPreviewServer(
  workspace: SystemWorkspace,
  options?: PreviewServerOptions
): PreviewServer {
  return new PreviewServer(workspace, options);
}
