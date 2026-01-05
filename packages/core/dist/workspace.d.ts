import type { Platform, Theme } from './types/platforms.js';
import type { CoreTokens, SemanticTokens, PlatformRules, CompiledTokens, TokenFileManifest, TokenCompileOptions } from './types/tokens.js';
import type { ComponentContract, SystemManifest } from './types/contracts.js';
import { type ValidationResult } from './errors.js';
/**
 * SystemWorkspace - the core engine for all workspace operations.
 * All file access goes through this abstraction.
 */
export declare class SystemWorkspace {
    readonly rootPath: string;
    private readonly tokensDir;
    private readonly contractsDir;
    private readonly systemPath;
    constructor(rootPath: string);
    /**
     * Check if workspace exists and has valid structure.
     */
    exists(): Promise<boolean>;
    /**
     * Read system manifest.
     */
    readSystem(): Promise<SystemManifest>;
    /**
     * List all contract names.
     */
    listContracts(): Promise<string[]>;
    /**
     * Read a contract by name.
     */
    readContract(name: string): Promise<ComponentContract>;
    /**
     * Write a contract (for editor).
     */
    writeContract(name: string, data: ComponentContract): Promise<void>;
    /**
     * List all token files.
     */
    listTokenFiles(): Promise<TokenFileManifest>;
    /**
     * Read core tokens.
     */
    readCoreTokens(): Promise<CoreTokens>;
    /**
     * Read semantic tokens for a theme.
     */
    readSemanticTokens(theme: Theme): Promise<SemanticTokens>;
    /**
     * Read platform rules.
     */
    readPlatformRules(platform: Platform): Promise<PlatformRules>;
    /**
     * Compile tokens for a platform and theme.
     */
    compileTokens(options: TokenCompileOptions): Promise<CompiledTokens>;
    /**
     * Validate entire workspace.
     */
    validate(): Promise<ValidationResult>;
}
//# sourceMappingURL=workspace.d.ts.map