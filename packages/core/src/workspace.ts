import { readFile, writeFile, readdir, stat, mkdir } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { glob } from 'glob';
import type { Platform, Theme } from './types/platforms.js';
import type {
  CoreTokens,
  SemanticTokens,
  PlatformRules,
  CompiledTokens,
  TokenFileManifest,
  TokenCompileOptions,
} from './types/tokens.js';
import type { ComponentContract, SystemManifest } from './types/contracts.js';
import {
  WorkspaceError,
  type ValidationResult,
  mergeValidationResults,
  validResult,
  invalidResult,
} from './errors.js';
import {
  validateContract,
  validateCoreTokens,
  validateSemanticTokens,
  validatePlatformRules,
} from './validation.js';

/**
 * SystemWorkspace - the core engine for all workspace operations.
 * All file access goes through this abstraction.
 */
export class SystemWorkspace {
  private readonly tokensDir: string;
  private readonly contractsDir: string;
  private readonly systemPath: string;

  constructor(public readonly rootPath: string) {
    this.tokensDir = join(rootPath, 'tokens');
    this.contractsDir = join(rootPath, 'contracts');
    this.systemPath = join(rootPath, 'system.json');
  }

  /**
   * Check if workspace exists and has valid structure.
   */
  async exists(): Promise<boolean> {
    try {
      const stats = await stat(this.rootPath);
      return stats.isDirectory();
    } catch {
      return false;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // System manifest
  // ─────────────────────────────────────────────────────────────

  /**
   * Read system manifest.
   */
  async readSystem(): Promise<SystemManifest> {
    try {
      const content = await readFile(this.systemPath, 'utf-8');
      return JSON.parse(content) as SystemManifest;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new WorkspaceError(
          'SYSTEM_MANIFEST_NOT_FOUND',
          'system.json not found in workspace',
          this.systemPath
        );
      }
      throw new WorkspaceError(
        'SYSTEM_MANIFEST_INVALID',
        `Failed to parse system.json: ${(err as Error).message}`,
        this.systemPath
      );
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Contracts
  // ─────────────────────────────────────────────────────────────

  /**
   * List all contract names.
   */
  async listContracts(): Promise<string[]> {
    try {
      const files = await glob('*.contract.json', { cwd: this.contractsDir });
      return files.map(f => basename(f, '.contract.json'));
    } catch {
      return [];
    }
  }

  /**
   * Read a contract by name.
   */
  async readContract(name: string): Promise<ComponentContract> {
    const filePath = join(this.contractsDir, `${name}.contract.json`);
    try {
      const content = await readFile(filePath, 'utf-8');
      const data = JSON.parse(content) as ComponentContract;
      
      // Validate on read
      const result = validateContract(data);
      if (!result.valid) {
        throw new WorkspaceError(
          'CONTRACT_INVALID',
          `Contract validation failed: ${result.errors.map(e => e.message).join(', ')}`,
          filePath,
          { errors: result.errors }
        );
      }
      
      return data;
    } catch (err) {
      if (err instanceof WorkspaceError) throw err;
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new WorkspaceError(
          'CONTRACT_NOT_FOUND',
          `Contract not found: ${name}`,
          filePath
        );
      }
      throw new WorkspaceError(
        'CONTRACT_INVALID',
        `Failed to parse contract: ${(err as Error).message}`,
        filePath
      );
    }
  }

  /**
   * Write a contract (for editor).
   */
  async writeContract(name: string, data: ComponentContract): Promise<void> {
    // Validate before write
    const result = validateContract(data);
    if (!result.valid) {
      throw new WorkspaceError(
        'CONTRACT_INVALID',
        `Contract validation failed: ${result.errors.map(e => e.message).join(', ')}`,
        undefined,
        { errors: result.errors }
      );
    }

    const filePath = join(this.contractsDir, `${name}.contract.json`);
    await mkdir(this.contractsDir, { recursive: true });
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  // ─────────────────────────────────────────────────────────────
  // Tokens
  // ─────────────────────────────────────────────────────────────

  /**
   * List all token files.
   */
  async listTokenFiles(): Promise<TokenFileManifest> {
    const manifest: TokenFileManifest = {
      core: [],
      semantic: [],
      platform: [],
    };

    try {
      const files = await readdir(this.tokensDir);

      for (const file of files) {
        if (!file.endsWith('.json')) continue;

        if (file === 'core.json') {
          manifest.core.push(file);
        } else if (file.startsWith('semantic.')) {
          const theme = file.replace('semantic.', '').replace('.json', '') as Theme;
          if (theme === 'light' || theme === 'dark') {
            manifest.semantic.push({ file, theme });
          }
        } else if (file.startsWith('platform.')) {
          const platform = file.replace('platform.', '').replace('.json', '') as Platform;
          if (platform === 'web' || platform === 'rn') {
            manifest.platform.push({ file, platform });
          }
        }
      }
    } catch {
      // Token directory doesn't exist
    }

    return manifest;
  }

  /**
   * Read core tokens.
   */
  async readCoreTokens(): Promise<CoreTokens> {
    const filePath = join(this.tokensDir, 'core.json');
    try {
      const content = await readFile(filePath, 'utf-8');
      const data = JSON.parse(content) as CoreTokens;

      const result = validateCoreTokens(data);
      if (!result.valid) {
        throw new WorkspaceError(
          'TOKEN_FILE_INVALID',
          `Core tokens validation failed`,
          filePath,
          { errors: result.errors }
        );
      }

      return data;
    } catch (err) {
      if (err instanceof WorkspaceError) throw err;
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new WorkspaceError(
          'TOKEN_FILE_NOT_FOUND',
          'core.json not found',
          filePath
        );
      }
      throw new WorkspaceError(
        'TOKEN_FILE_INVALID',
        `Failed to parse core.json: ${(err as Error).message}`,
        filePath
      );
    }
  }

  /**
   * Read semantic tokens for a theme.
   */
  async readSemanticTokens(theme: Theme): Promise<SemanticTokens> {
    const filePath = join(this.tokensDir, `semantic.${theme}.json`);
    try {
      const content = await readFile(filePath, 'utf-8');
      const data = JSON.parse(content) as SemanticTokens;

      const result = validateSemanticTokens(data);
      if (!result.valid) {
        throw new WorkspaceError(
          'TOKEN_FILE_INVALID',
          `Semantic tokens validation failed`,
          filePath,
          { errors: result.errors }
        );
      }

      return data;
    } catch (err) {
      if (err instanceof WorkspaceError) throw err;
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new WorkspaceError(
          'TOKEN_FILE_NOT_FOUND',
          `semantic.${theme}.json not found`,
          filePath
        );
      }
      throw new WorkspaceError(
        'TOKEN_FILE_INVALID',
        `Failed to parse semantic.${theme}.json: ${(err as Error).message}`,
        filePath
      );
    }
  }

  /**
   * Read platform rules.
   */
  async readPlatformRules(platform: Platform): Promise<PlatformRules> {
    const filePath = join(this.tokensDir, `platform.${platform}.json`);
    try {
      const content = await readFile(filePath, 'utf-8');
      const data = JSON.parse(content) as PlatformRules;

      const result = validatePlatformRules(data);
      if (!result.valid) {
        throw new WorkspaceError(
          'TOKEN_FILE_INVALID',
          `Platform rules validation failed`,
          filePath,
          { errors: result.errors }
        );
      }

      return data;
    } catch (err) {
      if (err instanceof WorkspaceError) throw err;
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new WorkspaceError(
          'TOKEN_FILE_NOT_FOUND',
          `platform.${platform}.json not found`,
          filePath
        );
      }
      throw new WorkspaceError(
        'TOKEN_FILE_INVALID',
        `Failed to parse platform.${platform}.json: ${(err as Error).message}`,
        filePath
      );
    }
  }

  /**
   * Compile tokens for a platform and theme.
   */
  async compileTokens(options: TokenCompileOptions): Promise<CompiledTokens> {
    const { platform, theme } = options;

    // Load all token files
    const coreTokens = await this.readCoreTokens();
    const semanticTokens = await this.readSemanticTokens(theme);
    const platformRules = await this.readPlatformRules(platform);

    // Build category map from platform rules
    const categoryTransforms = new Map<string, string>();
    for (const rule of platformRules.rules) {
      categoryTransforms.set(rule.category, rule.transform);
    }

    // Resolve semantic tokens to core values
    const compiled: CompiledTokens = {};

    for (const [tokenName, semanticToken] of Object.entries(semanticTokens.tokens)) {
      const coreToken = coreTokens.tokens[semanticToken.ref];
      if (!coreToken) {
        throw new WorkspaceError(
          'TOKEN_REF_NOT_FOUND',
          `Semantic token "${tokenName}" references unknown core token "${semanticToken.ref}"`,
          undefined,
          { tokenName, ref: semanticToken.ref }
        );
      }

      const value = coreToken.value;
      const category = coreToken.category;
      const transform = category ? categoryTransforms.get(category) : undefined;

      // Apply platform transform
      if (typeof value === 'number' && transform) {
        switch (transform) {
          case 'px':
            compiled[tokenName] = `${value}px`;
            break;
          case 'rem':
            compiled[tokenName] = `${value / 16}rem`;
            break;
          case 'number':
            compiled[tokenName] = value;
            break;
          default:
            compiled[tokenName] = value;
        }
      } else {
        compiled[tokenName] = value;
      }
    }

    return compiled;
  }

  // ─────────────────────────────────────────────────────────────
  // Validation
  // ─────────────────────────────────────────────────────────────

  /**
   * Validate entire workspace.
   */
  async validate(): Promise<ValidationResult> {
    const results: ValidationResult[] = [];

    // Validate system manifest
    try {
      await this.readSystem();
    } catch (err) {
      if (err instanceof WorkspaceError) {
        results.push(invalidResult([{
          path: 'system.json',
          message: err.message,
          code: err.code,
        }]));
      }
    }

    // Validate all contracts
    const contractNames = await this.listContracts();
    for (const name of contractNames) {
      try {
        await this.readContract(name);
      } catch (err) {
        if (err instanceof WorkspaceError) {
          results.push(invalidResult([{
            path: `contracts/${name}.contract.json`,
            message: err.message,
            code: err.code,
          }]));
        }
      }
    }

    // Validate token files
    try {
      await this.readCoreTokens();
    } catch (err) {
      if (err instanceof WorkspaceError) {
        results.push(invalidResult([{
          path: 'tokens/core.json',
          message: err.message,
          code: err.code,
        }]));
      }
    }

    for (const theme of ['light', 'dark'] as Theme[]) {
      try {
        await this.readSemanticTokens(theme);
      } catch (err) {
        if (err instanceof WorkspaceError && err.code !== 'TOKEN_FILE_NOT_FOUND') {
          results.push(invalidResult([{
            path: `tokens/semantic.${theme}.json`,
            message: err.message,
            code: err.code,
          }]));
        }
      }
    }

    for (const platform of ['web', 'rn'] as Platform[]) {
      try {
        await this.readPlatformRules(platform);
      } catch (err) {
        if (err instanceof WorkspaceError && err.code !== 'TOKEN_FILE_NOT_FOUND') {
          results.push(invalidResult([{
            path: `tokens/platform.${platform}.json`,
            message: err.message,
            code: err.code,
          }]));
        }
      }
    }

    return results.length > 0 ? mergeValidationResults(...results) : validResult();
  }
}
