import { spawn, type ChildProcess } from 'node:child_process';
import { join } from 'node:path';
import { getWorkspacePath, workspaceExists } from './workspace-manager';

interface PreviewProcess {
  process: ChildProcess;
  port: number;
  workspaceId: string;
  url: string;
}

let activePreview: PreviewProcess | null = null;

/**
 * Get preview status
 */
export function getPreviewStatus(): { running: boolean; url: string | null; workspaceId: string | null } {
  if (activePreview && !activePreview.process.killed) {
    return {
      running: true,
      url: activePreview.url,
      workspaceId: activePreview.workspaceId,
    };
  }
  return { running: false, url: null, workspaceId: null };
}

/**
 * Find a free port starting from the given port
 */
async function findFreePort(startPort: number): Promise<number> {
  const net = await import('node:net');
  
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      const { port } = server.address() as { port: number };
      server.close(() => resolve(port));
    });
    server.on('error', () => {
      resolve(findFreePort(startPort + 1));
    });
  });
}

/**
 * Start the preview server for a workspace
 */
export async function startPreview(workspaceId: string): Promise<{ url: string; port: number }> {
  // Stop any existing preview
  await stopPreview();

  // Verify workspace exists
  if (!(await workspaceExists(workspaceId))) {
    throw new Error(`Workspace not found: ${workspaceId}`);
  }

  const workspacePath = getWorkspacePath(workspaceId);
  const port = await findFreePort(3333);
  
  // Start the preview server using the packages/preview Vite server
  // We'll spawn a node process that runs a small script to start the server
  const previewScript = `
    import { SystemWorkspace } from '@designagent/core';
    import { startVitePreviewServer } from '@designagent/preview';
    
    const workspace = new SystemWorkspace('${workspacePath.replace(/\\/g, '\\\\')}');
    const server = await startVitePreviewServer({ port: ${port}, workspace });
    console.log('PREVIEW_READY:' + server.url);
    
    process.on('SIGTERM', async () => {
      await server.stop();
      process.exit(0);
    });
  `;

  const previewDir = join(process.cwd(), 'packages', 'preview');
  
  // Spawn the preview server using the start-server script
  const child = spawn('node', ['dist/start-server.js'], {
    cwd: previewDir,
    env: {
      ...process.env,
      DESIGNAGENT_WORKSPACE: workspacePath,
      DESIGNAGENT_PORT: String(port),
    },
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });

  const url = `http://localhost:${port}`;

  // Wait for server to be ready
  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Preview server startup timeout'));
    }, 30000);

    const checkReady = () => {
      // Check if server is responding
      fetch(url)
        .then((res) => {
          if (res.ok || res.status === 200) {
            clearTimeout(timeout);
            resolve();
          } else {
            setTimeout(checkReady, 500);
          }
        })
        .catch(() => {
          setTimeout(checkReady, 500);
        });
    };

    child.stdout?.on('data', (data) => {
      const output = data.toString();
      if (output.includes('ready') || output.includes('Local:') || output.includes('localhost')) {
        clearTimeout(timeout);
        // Give it a moment to fully initialize
        setTimeout(resolve, 500);
      }
    });

    child.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });

    child.on('exit', (code) => {
      if (code !== 0 && code !== null) {
        clearTimeout(timeout);
        reject(new Error(`Preview server exited with code ${code}`));
      }
    });

    // Start checking after a short delay
    setTimeout(checkReady, 1000);
  });

  activePreview = {
    process: child,
    port,
    workspaceId,
    url,
  };

  return { url, port };
}

/**
 * Stop the preview server
 */
export async function stopPreview(): Promise<void> {
  if (activePreview) {
    activePreview.process.kill('SIGTERM');
    
    // Wait for process to exit
    await new Promise<void>((resolve) => {
      if (activePreview?.process.killed) {
        resolve();
        return;
      }
      
      const timeout = setTimeout(() => {
        activePreview?.process.kill('SIGKILL');
        resolve();
      }, 5000);

      activePreview?.process.on('exit', () => {
        clearTimeout(timeout);
        resolve();
      });
    });

    activePreview = null;
  }
}
