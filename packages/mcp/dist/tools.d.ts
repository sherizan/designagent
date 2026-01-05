import type { SystemWorkspace, Platform, Theme, ComponentContract } from '@designagent/core';
/**
 * Tool definitions for MCP server.
 * All tools are read-only and deterministic.
 */
export interface ListComponentsResult {
    components: string[];
}
export interface GetComponentResult {
    contract: ComponentContract;
}
export interface GetTokensParams {
    platform: Platform;
    theme: Theme;
}
export interface GetTokensResult {
    tokens: Record<string, string | number>;
    platform: Platform;
    theme: Theme;
}
export interface ValidateUsageParams {
    component: string;
    props: Record<string, unknown>;
}
export interface ValidateUsageResult {
    valid: boolean;
    errors: Array<{
        path: string;
        message: string;
        code: string;
    }>;
}
/**
 * List all component contracts in workspace.
 */
export declare function listComponents(workspace: SystemWorkspace): Promise<ListComponentsResult>;
/**
 * Get a specific component contract by name.
 */
export declare function getComponent(workspace: SystemWorkspace, name: string): Promise<GetComponentResult>;
/**
 * Get compiled tokens for a platform and theme.
 */
export declare function getTokens(workspace: SystemWorkspace, params: GetTokensParams): Promise<GetTokensResult>;
/**
 * Validate component usage against contract.
 */
export declare function validateComponentUsage(workspace: SystemWorkspace, params: ValidateUsageParams): Promise<ValidateUsageResult>;
//# sourceMappingURL=tools.d.ts.map