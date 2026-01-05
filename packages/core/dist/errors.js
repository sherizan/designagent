/**
 * Structured error for workspace operations.
 */
export class WorkspaceError extends Error {
    code;
    path;
    details;
    constructor(code, message, path, details) {
        super(message);
        this.code = code;
        this.path = path;
        this.details = details;
        this.name = 'WorkspaceError';
    }
    toJSON() {
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
 * Create a successful validation result.
 */
export function validResult() {
    return { valid: true, errors: [] };
}
/**
 * Create a failed validation result.
 */
export function invalidResult(errors) {
    return { valid: false, errors };
}
/**
 * Merge multiple validation results.
 */
export function mergeValidationResults(...results) {
    const errors = results.flatMap(r => r.errors);
    return {
        valid: errors.length === 0,
        errors,
    };
}
//# sourceMappingURL=errors.js.map