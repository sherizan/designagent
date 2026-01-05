import { createServer } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import type { SystemWorkspace } from '@designagent/core';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
export async function startVitePreviewServer(
  options: VitePreviewServerOptions
): Promise<VitePreviewServer> {
  const { port = 3333, workspace } = options;

  const viteServer = await createServer({
    configFile: false,
    root: resolve(__dirname, '../app'),
    server: {
      port,
      strictPort: false,
      host: 'localhost',
    },
    plugins: [
      react(),
      // Inject workspace data as virtual module
      {
        name: 'designagent-workspace',
        configureServer(server) {
          // API endpoint for contracts list
          server.middlewares.use('/api/contracts', async (_req, res) => {
            try {
              const contracts = await workspace.listContracts();
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ contracts }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: String(err) }));
            }
          });

          // API endpoint for single contract
          server.middlewares.use('/api/contracts/', async (req, res, next) => {
            const url = req.url || '';
            if (url === '/' || url === '') {
              next();
              return;
            }
            
            const name = url.slice(1).split('?')[0];
            if (!name) {
              next();
              return;
            }

            try {
              const contract = await workspace.readContract(name);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ contract }));
            } catch (err) {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: String(err) }));
            }
          });

          // API endpoint for tokens
          server.middlewares.use('/api/tokens/', async (req, res, next) => {
            const url = req.url || '';
            const parts = url.slice(1).split('/');
            
            if (parts.length < 2) {
              next();
              return;
            }

            const platform = parts[0] as 'web' | 'rn';
            const theme = parts[1]?.split('?')[0] as 'light' | 'dark';

            if (!['web', 'rn'].includes(platform) || !['light', 'dark'].includes(theme)) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid platform or theme' }));
              return;
            }

            try {
              const tokens = await workspace.compileTokens({ platform, theme });
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ tokens, platform, theme }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: String(err) }));
            }
          });
        },
      },
    ],
  });

  await viteServer.listen();

  const resolvedPort = viteServer.config.server.port || port;
  const url = `http://localhost:${resolvedPort}`;

  return {
    url,
    port: resolvedPort,
    stop: async () => {
      await viteServer.close();
    },
  };
}
