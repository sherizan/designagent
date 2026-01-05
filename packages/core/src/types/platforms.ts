/**
 * Supported target platforms for token compilation and component contracts.
 */
export type Platform = 'web' | 'rn';

/**
 * Supported themes for semantic token resolution.
 */
export type Theme = 'light' | 'dark';

/**
 * Platform-specific unit transforms.
 */
export type TokenTransform = 
  | { type: 'px' }           // Web: number → "Npx"
  | { type: 'rem'; base: number }  // Web: number → "Nrem"
  | { type: 'number' }       // RN: keep as number
  | { type: 'passthrough' }; // No transform

/**
 * Platform configuration for token compilation.
 */
export interface PlatformConfig {
  platform: Platform;
  transforms: {
    spacing: TokenTransform;
    fontSize: TokenTransform;
    lineHeight: TokenTransform;
    borderRadius: TokenTransform;
    borderWidth: TokenTransform;
  };
}

/**
 * Default platform configurations.
 */
export const PLATFORM_CONFIGS: Record<Platform, PlatformConfig> = {
  web: {
    platform: 'web',
    transforms: {
      spacing: { type: 'px' },
      fontSize: { type: 'px' },
      lineHeight: { type: 'px' },
      borderRadius: { type: 'px' },
      borderWidth: { type: 'px' },
    },
  },
  rn: {
    platform: 'rn',
    transforms: {
      spacing: { type: 'number' },
      fontSize: { type: 'number' },
      lineHeight: { type: 'number' },
      borderRadius: { type: 'number' },
      borderWidth: { type: 'number' },
    },
  },
};
