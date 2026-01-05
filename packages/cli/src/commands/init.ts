import { cp, stat, mkdir } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

interface InitOptions {
  force?: boolean;
}

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function initCommand(path: string, options: InitOptions): Promise<void> {
  const targetPath = resolve(process.cwd(), path);
  
  console.log(`Initializing DesignAgent workspace at: ${targetPath}`);

  // Check if target exists
  try {
    const stats = await stat(targetPath);
    if (stats.isDirectory()) {
      // Check if it has content
      const systemPath = join(targetPath, 'system.json');
      try {
        await stat(systemPath);
        if (!options.force) {
          console.error('Error: Workspace already exists. Use --force to overwrite.');
          process.exit(1);
        }
        console.log('Overwriting existing workspace...');
      } catch {
        // No system.json, continue
      }
    }
  } catch {
    // Target doesn't exist, create it
    await mkdir(targetPath, { recursive: true });
  }

  // Find workspace-template
  // Walk up from CLI package to find workspace-template
  let templatePath = resolve(__dirname, '../../../../workspace-template');
  
  try {
    await stat(templatePath);
  } catch {
    // Try alternate location (when running from dist)
    templatePath = resolve(__dirname, '../../../../../workspace-template');
    try {
      await stat(templatePath);
    } catch {
      console.error('Error: Could not find workspace-template.');
      console.error('Make sure you are running from within the DesignAgent repository.');
      process.exit(1);
    }
  }

  // Copy template to target
  try {
    await cp(templatePath, targetPath, { recursive: true });
    console.log('');
    console.log('✓ Workspace initialized successfully!');
    console.log('');
    console.log('Structure created:');
    console.log('  tokens/');
    console.log('    core.json');
    console.log('    semantic.light.json');
    console.log('    semantic.dark.json');
    console.log('    platform.web.json');
    console.log('    platform.rn.json');
    console.log('  contracts/');
    console.log('    Button.contract.json');
    console.log('  system.json');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Edit system.json with your design system name');
    console.log('  2. Add tokens in tokens/');
    console.log('  3. Define contracts in contracts/');
    console.log('  4. Run: designagent validate');
  } catch (err) {
    console.error('Error copying template:', err);
    process.exit(1);
  }
}
