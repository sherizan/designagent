/**
 * Default platform configurations.
 */
export const PLATFORM_CONFIGS = {
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
//# sourceMappingURL=platforms.js.map