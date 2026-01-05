/**
 * Error codes for structured error handling.
 */
export type ErrorCode =
  | 'WORKSPACE_NOT_FOUND'
  | 'WORKSPACE_INVALID_STRUCTURE'
  | 'CONTRACT_NOT_FOUND'
  | 'CONTRACT_INVALID'
  | 'TOKEN_FILE_NOT_FOUND'
  | 'TOKEN_FILE_INVALID'
  | 'TOKEN_REF_NOT_FOUND'
  | 'SYSTEM_MANIFEST_NOT_FOUND'
  | 'SYSTEM_MANIFEST_INVALID'
  | 'VALIDATION_FAILED'
  | 'COMPILE_ERROR';

/**
 * Structured error for workspace operations.
 */
export class WorkspaceError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly path?: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'WorkspaceError';
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      path: this.path,
      details: this.details,
    };
  }
}

/**
 * Validation error detail.
 */
export interface ValidationError {
  path: string;
  message: string;
  code: string;
  value?: unknown;
}

/**
 * Validation result - machine-readable.
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Create a successful validation result.
 */
export function validResult(): ValidationResult {
  return { valid: true, errors: [] };
}

/**
 * Create a failed validation result.
 */
export function invalidResult(errors: ValidationError[]): ValidationResult {
  return { valid: false, errors };
}

/**
 * Merge multiple validation results.
 */
export function mergeValidationResults(...results: ValidationResult[]): ValidationResult {
  const errors = results.flatMap(r => r.errors);
  return {
    valid: errors.length === 0,
    errors,
  };
}
