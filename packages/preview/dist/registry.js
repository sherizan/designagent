/**
 * Component registry - maps contracts to implementations.
 * Users register their components at runtime.
 */
/**
 * Component registry for preview runtime.
 */
export class ComponentRegistry {
    components = new Map();
    /**
     * Register a component implementation.
     */
    register(contractName, component) {
        this.components.set(contractName, {
            name: contractName,
            component,
            registeredAt: new Date(),
        });
    }
    /**
     * Get a registered component.
     */
    get(contractName) {
        return this.components.get(contractName)?.component;
    }
    /**
     * Check if a component is registered.
     */
    has(contractName) {
        return this.components.has(contractName);
    }
    /**
     * List all registered component names.
     */
    list() {
        return Array.from(this.components.keys());
    }
    /**
     * Get all registered components with metadata.
     */
    all() {
        return Array.from(this.components.values());
    }
    /**
     * Unregister a component.
     */
    unregister(contractName) {
        return this.components.delete(contractName);
    }
    /**
     * Clear all registered components.
     */
    clear() {
        this.components.clear();
    }
}
/**
 * Create a component registry instance.
 */
export function createRegistry() {
    return new ComponentRegistry();
}
//# sourceMappingURL=registry.js.map