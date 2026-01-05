/**
 * Error codes for structured error handling.
 */
export type ErrorCode = 'WORKSPACE_NOT_FOUND' | 'WORKSPACE_INVALID_STRUCTURE' | 'CONTRACT_NOT_FOUND' | 'CONTRACT_INVALID' | 'TOKEN_FILE_NOT_FOUND' | 'TOKEN_FILE_INVALID' | 'TOKEN_REF_NOT_FOUND' | 'SYSTEM_MANIFEST_NOT_FOUND' | 'SYSTEM_MANIFEST_INVALID' | 'VALIDATION_FAILED' | 'COMPILE_ERROR';
/**
 * Structured error for workspace operations.
 */
export declare class WorkspaceError extends Error {
    readonly code: ErrorCode;
    readonly path?: string | undefined;
    readonly details?: Record<string, unknown> | undefined;
    constructor(code: ErrorCode, message: string, path?: string | undefined, details?: Record<string, unknown> | undefined);
    toJSON(): Record<string, unknown>;
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
export declare function validResult(): ValidationResult;
/**
 * Create a failed validation result.
 */
export declare function invalidResult(errors: ValidationError[]): ValidationResult;
/**
 * Merge multiple validation results.
 */
export declare function mergeValidationResults(...results: ValidationResult[]): ValidationResult;
//# sourceMappingURL=errors.d.ts.map