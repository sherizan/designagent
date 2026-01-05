import type { Platform, Theme } from './platforms.js';
/**
 * Core token - raw primitive value.
 * Platform-neutral, no references.
 */
export interface CoreToken {
    value: string | number;
    description?: string;
    category?: 'color' | 'spacing' | 'fontSize' | 'lineHeight' | 'borderRadius' | 'borderWidth' | 'fontFamily' | 'fontWeight';
}
/**
 * Core tokens file structure.
 */
export interface CoreTokens {
    $schema?: string;
    $version?: string;
    tokens: Record<string, CoreToken>;
}
/**
 * Semantic token - intent-based, references core tokens.
 * Theme-specific (light/dark).
 */
export interface SemanticToken {
    /** Reference to a core token key, e.g., "colors.blue.500" */
    ref: string;
    description?: string;
}
/**
 * Semantic tokens file structure (per theme).
 */
export interface SemanticTokens {
    $schema?: string;
    $version?: string;
    $theme: Theme;
    tokens: Record<string, SemanticToken>;
}
/**
 * Platform rule - defines how to transform tokens for a platform.
 */
export interface PlatformRule {
    /** Token category this rule applies to */
    category: string;
    /** Transform to apply */
    transform: 'px' | 'rem' | 'number' | 'passthrough';
    /** Base value for rem transforms */
    remBase?: number;
}
/**
 * Platform rules file structure.
 */
export interface PlatformRules {
    $schema?: string;
    $version?: string;
    $platform: Platform;
    rules: PlatformRule[];
}
/**
 * Compiled tokens - flat map ready for codegen.
 */
export type CompiledTokens = Record<string, string | number>;
/**
 * Token file manifest - lists all token files in workspace.
 */
export interface TokenFileManifest {
    core: string[];
    semantic: {
        file: string;
        theme: Theme;
    }[];
    platform: {
        file: string;
        platform: Platform;
    }[];
}
/**
 * Token compilation options.
 */
export interface TokenCompileOptions {
    platform: Platform;
    theme: Theme;
}
//# sourceMappingURL=tokens.d.ts.map