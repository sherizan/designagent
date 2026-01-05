import type { Platform } from './platforms.js';
/**
 * Prop type definitions for component contracts.
 */
export type PropType = 'string' | 'number' | 'boolean' | 'enum';
/**
 * Component prop definition.
 */
export interface PropDefinition {
    type: PropType;
    /** Required for enum type */
    values?: string[];
    default?: string | number | boolean;
    required?: boolean;
    description?: string;
}
/**
 * Component variant definition.
 */
export interface VariantDefinition {
    name: string;
    description?: string;
    props: Record<string, string | number | boolean>;
}
/**
 * Component state definition.
 */
export interface StateDefinition {
    name: string;
    description?: string;
}
/**
 * Code location for component implementation.
 */
export interface CodeReference {
    importPath: string;
    exportName?: string;
}
/**
 * Example usage of a component.
 */
export interface ComponentExample {
    name?: string;
    description?: string;
    props: Record<string, string | number | boolean>;
}
/**
 * Component contract - the canonical definition of a UI component.
 */
export interface ComponentContract {
    $schema?: string;
    $version?: string;
    /** Component name (PascalCase) */
    name: string;
    /** Human-readable description */
    description?: string;
    /** Supported platforms */
    platformTargets: Platform[];
    /** Prop definitions */
    props: Record<string, PropDefinition>;
    /** Named variants */
    variants?: VariantDefinition[];
    /** Interactive states */
    states?: StateDefinition[];
    /** Code implementation reference */
    code?: CodeReference;
    /** Usage examples */
    examples?: ComponentExample[];
}
/**
 * Component source configuration.
 */
export interface ComponentSource {
    type: 'npm' | 'path';
    value: string;
}
/**
 * System manifest - workspace metadata.
 */
export interface SystemManifest {
    $schema?: string;
    name: string;
    version: string;
    description?: string;
    componentSource?: ComponentSource;
    defaultPlatform?: Platform;
    defaultTheme?: 'light' | 'dark';
}
//# sourceMappingURL=contracts.d.ts.map