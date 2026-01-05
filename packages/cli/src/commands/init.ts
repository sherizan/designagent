import { cp, stat, mkdir, writeFile } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

interface InitOptions {
  force?: boolean;
  preset?: string;
}

interface PresetMeta {
  version: string;
  createdAt: string;
  source: string;
  id?: string;
}

interface PresetSystem {
  name: string;
  version: string;
  defaultPlatform: 'web' | 'rn';
  defaultTheme: 'light' | 'dark';
  componentSource: { type: string; value: string };
}

interface TokenValue {
  value: string | number;
  category: string;
}

interface SemanticTokenValue {
  ref?: string;
  value?: string | number;
  description?: string;
}

interface CoreTokens {
  $version: string;
  tokens: Record<string, TokenValue>;
}

interface SemanticTokens {
  $version: string;
  $theme: string;
  tokens: Record<string, SemanticTokenValue>;
}

interface PlatformRules {
  $version: string;
  $platform: string;
  rules: {
    spacing: { format: string };
    borderRadius: { format: string };
    fontSize: { format: string };
  };
}

interface ContractDefinition {
  name: string;
  path: string;
  content: Record<string, unknown>;
}

interface PresetJSON {
  meta: PresetMeta;
  system: PresetSystem;
  tokens: {
    core: CoreTokens;
    semantic: {
      light: SemanticTokens;
      dark?: SemanticTokens;
    };
    platformRules: {
      web: PlatformRules;
      rn: PlatformRules;
    };
  };
  contracts: ContractDefinition[];
  showroom: {
    density: string;
    style: string;
  };
}

const __dirname = dirname(fileURLToPath(import.meta.url));

async function fetchPreset(url: string): Promise<PresetJSON> {
  // Handle local file path
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('file://')) {
    const { readFile } = await import('node:fs/promises');
    const filePath = url.replace('file://', '');
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content);
  }

  // Handle HTTP(S) URL
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch preset: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<PresetJSON>;
}

async function initFromPreset(targetPath: string, preset: PresetJSON): Promise<void> {
  // Create directories
  await mkdir(targetPath, { recursive: true });
  await mkdir(join(targetPath, 'tokens'), { recursive: true });
  await mkdir(join(targetPath, 'contracts'), { recursive: true });
  await mkdir(join(targetPath, 'schemas'), { recursive: true });

  // Write system.json
  const systemJson = {
    name: preset.system.name,
    version: preset.system.version,
    description: 'A DesignAgent-managed design system',
    componentSource: preset.system.componentSource,
    defaultPlatform: preset.system.defaultPlatform,
    defaultTheme: preset.system.defaultTheme,
  };
  await writeFile(
    join(targetPath, 'system.json'),
    JSON.stringify(systemJson, null, 2),
    'utf-8'
  );

  // Write tokens/core.json
  await writeFile(
    join(targetPath, 'tokens', 'core.json'),
    JSON.stringify(preset.tokens.core, null, 2),
    'utf-8'
  );

  // Write tokens/semantic.light.json
  await writeFile(
    join(targetPath, 'tokens', 'semantic.light.json'),
    JSON.stringify(preset.tokens.semantic.light, null, 2),
    'utf-8'
  );

  // Write tokens/semantic.dark.json if present
  if (preset.tokens.semantic.dark) {
    await writeFile(
      join(targetPath, 'tokens', 'semantic.dark.json'),
      JSON.stringify(preset.tokens.semantic.dark, null, 2),
      'utf-8'
    );
  }

  // Write platform rules
  await writeFile(
    join(targetPath, 'tokens', 'platform.web.json'),
    JSON.stringify(preset.tokens.platformRules.web, null, 2),
    'utf-8'
  );
  await writeFile(
    join(targetPath, 'tokens', 'platform.rn.json'),
    JSON.stringify(preset.tokens.platformRules.rn, null, 2),
    'utf-8'
  );

  // Write contracts
  for (const contract of preset.contracts) {
    await writeFile(
      join(targetPath, 'contracts', `${contract.name}.contract.json`),
      JSON.stringify(contract.content, null, 2),
      'utf-8'
    );
  }

  // Copy schemas from workspace-template
  let templatePath = resolve(__dirname, '../../../../workspace-template');
  try {
    await stat(templatePath);
  } catch {
    templatePath = resolve(__dirname, '../../../../../workspace-template');
  }

  try {
    const schemasPath = join(templatePath, 'schemas');
    await cp(schemasPath, join(targetPath, 'schemas'), { recursive: true });
  } catch {
    // Schemas copy failed, continue without them
    console.log('Note: Could not copy schemas from workspace-template');
  }
}

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

  // Handle preset initialization
  if (options.preset) {
    console.log(`Fetching preset from: ${options.preset}`);
    try {
      const preset = await fetchPreset(options.preset);
      console.log(`Preset loaded: ${preset.meta.version} (${preset.meta.source})`);
      
      await initFromPreset(targetPath, preset);
      
      console.log('');
      console.log('✓ Workspace initialized from preset!');
      console.log('');
      console.log('Structure created:');
      console.log('  tokens/');
      console.log('    core.json');
      console.log('    semantic.light.json');
      if (preset.tokens.semantic.dark) {
        console.log('    semantic.dark.json');
      }
      console.log('    platform.web.json');
      console.log('    platform.rn.json');
      console.log('  contracts/');
      for (const contract of preset.contracts) {
        console.log(`    ${contract.name}.contract.json`);
      }
      console.log('  schemas/');
      console.log('  system.json');
      console.log('');
      console.log('Preset info:');
      console.log(`  Platform: ${preset.system.defaultPlatform}`);
      console.log(`  Theme: ${preset.system.defaultTheme}`);
      console.log(`  Components: ${preset.system.componentSource.value}`);
      console.log('');
      console.log('Next steps:');
      console.log('  1. cd ' + path);
      console.log('  2. designagent preview');
      console.log('  3. designagent serve-mcp');
      console.log('  4. Open /editor or /create to customize');
      return;
    } catch (err) {
      console.error('Error: Failed to fetch or process preset');
      if (err instanceof Error) {
        console.error('  ' + err.message);
      }
      process.exit(1);
    }
  }

  // Standard template initialization (original behavior)
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
