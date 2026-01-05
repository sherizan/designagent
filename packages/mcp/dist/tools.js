import { validateUsage } from '@designagent/core';
/**
 * List all component contracts in workspace.
 */
export async function listComponents(workspace) {
    const components = await workspace.listContracts();
    return { components };
}
/**
 * Get a specific component contract by name.
 */
export async function getComponent(workspace, name) {
    const contract = await workspace.readContract(name);
    return { contract };
}
/**
 * Get compiled tokens for a platform and theme.
 */
export async function getTokens(workspace, params) {
    const tokens = await workspace.compileTokens({
        platform: params.platform,
        theme: params.theme,
    });
    return {
        tokens,
        platform: params.platform,
        theme: params.theme,
    };
}
/**
 * Validate component usage against contract.
 */
export async function validateComponentUsage(workspace, params) {
    const contract = await workspace.readContract(params.component);
    const result = validateUsage(contract, params.props);
    return {
        valid: result.valid,
        errors: result.errors.map(e => ({
            path: e.path,
            message: e.message,
            code: e.code,
        })),
    };
}
//# sourceMappingURL=tools.js.map