/**
 * Component registry - maps contracts to implementations.
 * Users register their components at runtime.
 */

export type ComponentImplementation = unknown; // React.ComponentType or similar

export interface RegisteredComponent {
  name: string;
  component: ComponentImplementation;
  registeredAt: Date;
}

/**
 * Component registry for preview runtime.
 */
export class ComponentRegistry {
  private components = new Map<string, RegisteredComponent>();

  /**
   * Register a component implementation.
   */
  register(contractName: string, component: ComponentImplementation): void {
    this.components.set(contractName, {
      name: contractName,
      component,
      registeredAt: new Date(),
    });
  }

  /**
   * Get a registered component.
   */
  get(contractName: string): ComponentImplementation | undefined {
    return this.components.get(contractName)?.component;
  }

  /**
   * Check if a component is registered.
   */
  has(contractName: string): boolean {
    return this.components.has(contractName);
  }

  /**
   * List all registered component names.
   */
  list(): string[] {
    return Array.from(this.components.keys());
  }

  /**
   * Get all registered components with metadata.
   */
  all(): RegisteredComponent[] {
    return Array.from(this.components.values());
  }

  /**
   * Unregister a component.
   */
  unregister(contractName: string): boolean {
    return this.components.delete(contractName);
  }

  /**
   * Clear all registered components.
   */
  clear(): void {
    this.components.clear();
  }
}

/**
 * Create a component registry instance.
 */
export function createRegistry(): ComponentRegistry {
  return new ComponentRegistry();
}
