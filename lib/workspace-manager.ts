import { readdir, readFile, writeFile, cp, mkdir, stat } from 'node:fs/promises';
import { join, basename, dirname } from 'node:path';
import { homedir } from 'node:os';
import { v4 as uuidv4 } from 'uuid';

/**
 * Base directory for all workspaces
 */
export const WORKSPACES_DIR = join(homedir(), '.designagent', 'workspaces');

/**
 * Template directory in the repo
 */
export const TEMPLATE_DIR = join(process.cwd(), 'workspace-template');

/**
 * File tree node
 */
export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
}

/**
 * Grouped file tree for editor
 */
export interface GroupedTree {
  system: FileNode | null;
  tokens: FileNode[];
  contracts: FileNode[];
}

/**
 * Workspace info returned on creation
 */
export interface WorkspaceInfo {
  workspaceId: string;
  workspacePath: string;
  tree: GroupedTree;
}

/**
 * Validation error
 */
export interface ValidationError {
  file: string;
  message: string;
  line?: number;
  column?: number;
  level: 'error' | 'warn';
}

/**
 * Get the full path to a workspace
 */
export function getWorkspacePath(workspaceId: string): string {
  return join(WORKSPACES_DIR, workspaceId);
}

/**
 * Check if a workspace exists
 */
export async function workspaceExists(workspaceId: string): Promise<boolean> {
  try {
    const stats = await stat(getWorkspacePath(workspaceId));
    return stats.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Create a new workspace by copying the template
 */
export async function createWorkspace(): Promise<WorkspaceInfo> {
  const workspaceId = uuidv4();
  const workspacePath = getWorkspacePath(workspaceId);

  // Ensure workspaces directory exists
  await mkdir(WORKSPACES_DIR, { recursive: true });

  // Check if template exists
  let templateExists = false;
  try {
    await stat(TEMPLATE_DIR);
    templateExists = true;
  } catch {
    templateExists = false;
  }

  if (templateExists) {
    // Copy template to new workspace
    await cp(TEMPLATE_DIR, workspacePath, { recursive: true });
  } else {
    // Create minimal structure programmatically
    await mkdir(workspacePath, { recursive: true });
    await mkdir(join(workspacePath, 'tokens'), { recursive: true });
    await mkdir(join(workspacePath, 'contracts'), { recursive: true });

    // Create minimal system.json
    const systemJson = {
      name: 'my-design-system',
      version: '0.1.0',
      description: 'A DesignAgent-managed design system',
      componentSource: { type: 'npm', value: '@uistack/components' },
      defaultPlatform: 'web',
      defaultTheme: 'light',
    };
    await writeFile(
      join(workspacePath, 'system.json'),
      JSON.stringify(systemJson, null, 2)
    );

    // Create minimal core tokens
    const coreTokens = {
      tokens: {
        'colors.primary': { value: '#3b82f6', category: 'color' },
        'spacing.base': { value: 16, category: 'spacing' },
      },
    };
    await writeFile(
      join(workspacePath, 'tokens', 'core.json'),
      JSON.stringify(coreTokens, null, 2)
    );

    // Create minimal semantic tokens
    const semanticLight = {
      $theme: 'light',
      tokens: {
        'color.primary': { ref: 'colors.primary' },
      },
    };
    await writeFile(
      join(workspacePath, 'tokens', 'semantic.light.json'),
      JSON.stringify(semanticLight, null, 2)
    );

    const semanticDark = {
      $theme: 'dark',
      tokens: {
        'color.primary': { ref: 'colors.primary' },
      },
    };
    await writeFile(
      join(workspacePath, 'tokens', 'semantic.dark.json'),
      JSON.stringify(semanticDark, null, 2)
    );

    // Create platform rules
    const platformWeb = {
      $platform: 'web',
      rules: [
        { category: 'spacing', transform: 'px' },
        { category: 'color', transform: 'passthrough' },
      ],
    };
    await writeFile(
      join(workspacePath, 'tokens', 'platform.web.json'),
      JSON.stringify(platformWeb, null, 2)
    );

    const platformRn = {
      $platform: 'rn',
      rules: [
        { category: 'spacing', transform: 'number' },
        { category: 'color', transform: 'passthrough' },
      ],
    };
    await writeFile(
      join(workspacePath, 'tokens', 'platform.rn.json'),
      JSON.stringify(platformRn, null, 2)
    );
  }

  // Get the file tree
  const tree = await getWorkspaceTree(workspaceId);

  return { workspaceId, workspacePath, tree };
}

/**
 * Read directory recursively and build file tree
 */
async function readDirRecursive(dirPath: string, relativeTo: string): Promise<FileNode[]> {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const nodes: FileNode[] = [];

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    const relativePath = fullPath.replace(relativeTo + '/', '');

    if (entry.isDirectory()) {
      const children = await readDirRecursive(fullPath, relativeTo);
      nodes.push({
        name: entry.name,
        path: relativePath,
        type: 'directory',
        children,
      });
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      nodes.push({
        name: entry.name,
        path: relativePath,
        type: 'file',
      });
    }
  }

  return nodes.sort((a, b) => {
    // Directories first, then files
    if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

/**
 * Get the grouped file tree for a workspace
 */
export async function getWorkspaceTree(workspaceId: string): Promise<GroupedTree> {
  const workspacePath = getWorkspacePath(workspaceId);

  const tree: GroupedTree = {
    system: null,
    tokens: [],
    contracts: [],
  };

  // Check for system.json
  try {
    await stat(join(workspacePath, 'system.json'));
    tree.system = {
      name: 'system.json',
      path: 'system.json',
      type: 'file',
    };
  } catch {
    // No system.json
  }

  // Get tokens
  try {
    const tokensPath = join(workspacePath, 'tokens');
    const tokenFiles = await readdir(tokensPath);
    tree.tokens = tokenFiles
      .filter((f) => f.endsWith('.json'))
      .map((f) => ({
        name: f,
        path: `tokens/${f}`,
        type: 'file' as const,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    // No tokens directory
  }

  // Get contracts
  try {
    const contractsPath = join(workspacePath, 'contracts');
    const contractFiles = await readdir(contractsPath);
    tree.contracts = contractFiles
      .filter((f) => f.endsWith('.json'))
      .map((f) => ({
        name: f,
        path: `contracts/${f}`,
        type: 'file' as const,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    // No contracts directory
  }

  return tree;
}

/**
 * Read a file from a workspace
 */
export async function readWorkspaceFile(
  workspaceId: string,
  filePath: string
): Promise<string> {
  const fullPath = join(getWorkspacePath(workspaceId), filePath);
  return readFile(fullPath, 'utf-8');
}

/**
 * Write a file to a workspace
 */
export async function writeWorkspaceFile(
  workspaceId: string,
  filePath: string,
  content: string
): Promise<void> {
  const fullPath = join(getWorkspacePath(workspaceId), filePath);
  
  // Ensure directory exists
  await mkdir(dirname(fullPath), { recursive: true });
  
  await writeFile(fullPath, content, 'utf-8');
}

/**
 * Validate a workspace
 */
export async function validateWorkspace(
  workspaceId: string
): Promise<ValidationError[]> {
  const errors: ValidationError[] = [];
  const workspacePath = getWorkspacePath(workspaceId);

  // Get all JSON files
  const tree = await getWorkspaceTree(workspaceId);
  const files: string[] = [];

  if (tree.system) files.push(tree.system.path);
  files.push(...tree.tokens.map((t) => t.path));
  files.push(...tree.contracts.map((c) => c.path));

  // Validate each file
  for (const filePath of files) {
    try {
      const content = await readWorkspaceFile(workspaceId, filePath);
      
      // Try to parse JSON
      try {
        JSON.parse(content);
      } catch (parseError) {
        const err = parseError as SyntaxError;
        // Extract line/column from error message if possible
        const match = err.message.match(/position (\d+)/);
        const position = match ? parseInt(match[1], 10) : undefined;
        
        let line: number | undefined;
        let column: number | undefined;
        
        if (position !== undefined) {
          const lines = content.substring(0, position).split('\n');
          line = lines.length;
          column = (lines[lines.length - 1]?.length ?? 0) + 1;
        }

        errors.push({
          file: filePath,
          message: `Invalid JSON: ${err.message}`,
          line,
          column,
          level: 'error',
        });
      }
    } catch {
      errors.push({
        file: filePath,
        message: 'File not found or unreadable',
        level: 'error',
      });
    }
  }

  // TODO: Call core validator if available
  // try {
  //   const { SystemWorkspace } = await import('@designagent/core');
  //   const workspace = new SystemWorkspace(workspacePath);
  //   const result = await workspace.validate();
  //   // ... map result.errors to ValidationError[]
  // } catch {
  //   // Core not available, skip advanced validation
  // }

  return errors;
}
