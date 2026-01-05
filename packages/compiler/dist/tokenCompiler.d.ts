import type { Platform, CoreTokens, SemanticTokens, PlatformRules, CompiledTokens } from '@designagent/core';
/**
 * Token compilation options.
 */
export interface CompileOptions {
    coreTokens: CoreTokens;
    semanticTokens: SemanticTokens;
    platformRules: PlatformRules;
    platform: Platform;
}
/**
 * Token compiler - transforms tokens for specific platforms.
 */
export declare class TokenCompiler {
    /**
     * Compile tokens for a specific platform.
     * Resolves semantic → core references and applies platform transforms.
     */
    compile(options: CompileOptions): CompiledTokens;
    /**
     * Transform a token value based on its category and platform rules.
     */
    private transformValue;
}
/**
 * Create a token compiler instance.
 */
export declare function createTokenCompiler(): TokenCompiler;
/**
 * Convenience function to compile tokens.
 */
export declare function compileTokens(options: CompileOptions): CompiledTokens;
//# sourceMappingURL=tokenCompiler.d.ts.map