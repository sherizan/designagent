import { WorkspaceError } from '@designagent/core';
/**
 * Token compiler - transforms tokens for specific platforms.
 */
export class TokenCompiler {
    /**
     * Compile tokens for a specific platform.
     * Resolves semantic → core references and applies platform transforms.
     */
    compile(options) {
        const { coreTokens, semanticTokens, platformRules } = options;
        // Build category → transform map
        const categoryTransforms = new Map();
        for (const rule of platformRules.rules) {
            categoryTransforms.set(rule.category, rule.transform);
        }
        const compiled = {};
        // Process each semantic token
        for (const [tokenName, semanticToken] of Object.entries(semanticTokens.tokens)) {
            const coreToken = coreTokens.tokens[semanticToken.ref];
            if (!coreToken) {
                throw new WorkspaceError('TOKEN_REF_NOT_FOUND', `Semantic token "${tokenName}" references unknown core token "${semanticToken.ref}"`, undefined, { tokenName, ref: semanticToken.ref });
            }
            compiled[tokenName] = this.transformValue(coreToken.value, coreToken.category, categoryTransforms);
        }
        return compiled;
    }
    /**
     * Transform a token value based on its category and platform rules.
     */
    transformValue(value, category, categoryTransforms) {
        // Colors pass through as-is
        if (typeof value === 'string') {
            return value;
        }
        // Numbers get transformed based on category
        if (typeof value === 'number' && category) {
            const transform = categoryTransforms.get(category);
            switch (transform) {
                case 'px':
                    return `${value}px`;
                case 'rem':
                    return `${value / 16}rem`;
                case 'number':
                    return value;
                case 'passthrough':
                default:
                    return value;
            }
        }
        return value;
    }
}
/**
 * Create a token compiler instance.
 */
export function createTokenCompiler() {
    return new TokenCompiler();
}
/**
 * Convenience function to compile tokens.
 */
export function compileTokens(options) {
    const compiler = new TokenCompiler();
    return compiler.compile(options);
}
//# sourceMappingURL=tokenCompiler.js.map