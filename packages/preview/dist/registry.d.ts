/**
 * Component registry - maps contracts to implementations.
 * Users register their components at runtime.
 */
export type ComponentImplementation = unknown;
export interface RegisteredComponent {
    name: string;
    component: ComponentImplementation;
    registeredAt: Date;
}
/**
 * Component registry for preview runtime.
 */
export declare class ComponentRegistry {
    private components;
    /**
     * Register a component implementation.
     */
    register(contractName: string, component: ComponentImplementation): void;
    /**
     * Get a registered component.
     */
    get(contractName: string): ComponentImplementation | undefined;
    /**
     * Check if a component is registered.
     */
    has(contractName: string): boolean;
    /**
     * List all registered component names.
     */
    list(): string[];
    /**
     * Get all registered components with metadata.
     */
    all(): RegisteredComponent[];
    /**
     * Unregister a component.
     */
    unregister(contractName: string): boolean;
    /**
     * Clear all registered components.
     */
    clear(): void;
}
/**
 * Create a component registry instance.
 */
export declare function createRegistry(): ComponentRegistry;
//# sourceMappingURL=registry.d.ts.map