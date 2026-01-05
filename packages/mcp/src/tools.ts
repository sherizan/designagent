import type { SystemWorkspace, Platform, Theme, ComponentContract } from '@designagent/core';
import { validateUsage } from '@designagent/core';

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
export async function listComponents(workspace: SystemWorkspace): Promise<ListComponentsResult> {
  const components = await workspace.listContracts();
  return { components };
}

/**
 * Get a specific component contract by name.
 */
export async function getComponent(
  workspace: SystemWorkspace,
  name: string
): Promise<GetComponentResult> {
  const contract = await workspace.readContract(name);
  return { contract };
}

/**
 * Get compiled tokens for a platform and theme.
 */
export async function getTokens(
  workspace: SystemWorkspace,
  params: GetTokensParams
): Promise<GetTokensResult> {
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
export async function validateComponentUsage(
  workspace: SystemWorkspace,
  params: ValidateUsageParams
): Promise<ValidateUsageResult> {
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
