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
export type TokenTransform = {
    type: 'px';
} | {
    type: 'rem';
    base: number;
} | {
    type: 'number';
} | {
    type: 'passthrough';
};
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
export declare const PLATFORM_CONFIGS: Record<Platform, PlatformConfig>;
//# sourceMappingURL=platforms.d.ts.map