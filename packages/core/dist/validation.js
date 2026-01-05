import Ajv from 'ajv';
import { validResult, invalidResult, } from './errors.js';
const ajv = new Ajv.default({ allErrors: true, strict: false });
/**
 * JSON Schema for ComponentContract.
 */
export const componentContractSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    required: ['name', 'platformTargets', 'props'],
    properties: {
        $schema: { type: 'string' },
        $version: { type: 'string' },
        name: { type: 'string', pattern: '^[A-Z][a-zA-Z0-9]*$' },
        description: { type: 'string' },
        platformTargets: {
            type: 'array',
            items: { type: 'string', enum: ['web', 'rn'] },
            minItems: 1,
        },
        props: {
            type: 'object',
            additionalProperties: {
                type: 'object',
                required: ['type'],
                properties: {
                    type: { type: 'string', enum: ['string', 'number', 'boolean', 'enum'] },
                    values: { type: 'array', items: { type: 'string' } },
                    default: {},
                    required: { type: 'boolean' },
                    description: { type: 'string' },
                },
            },
        },
        variants: {
            type: 'array',
            items: {
                type: 'object',
                required: ['name', 'props'],
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    props: { type: 'object' },
                },
            },
        },
        states: {
            type: 'array',
            items: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                },
            },
        },
        code: {
            type: 'object',
            required: ['importPath'],
            properties: {
                importPath: { type: 'string' },
                exportName: { type: 'string' },
            },
        },
        examples: {
            type: 'array',
            items: {
                type: 'object',
                required: ['props'],
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    props: { type: 'object' },
                },
            },
        },
    },
    additionalProperties: false,
};
/**
 * JSON Schema for CoreTokens.
 */
export const coreTokensSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    required: ['tokens'],
    properties: {
        $schema: { type: 'string' },
        $version: { type: 'string' },
        tokens: {
            type: 'object',
            additionalProperties: {
                type: 'object',
                required: ['value'],
                properties: {
                    value: { oneOf: [{ type: 'string' }, { type: 'number' }] },
                    description: { type: 'string' },
                    category: {
                        type: 'string',
                        enum: ['color', 'spacing', 'fontSize', 'lineHeight', 'borderRadius', 'borderWidth', 'fontFamily', 'fontWeight'],
                    },
                },
            },
        },
    },
    additionalProperties: false,
};
/**
 * JSON Schema for SemanticTokens.
 */
export const semanticTokensSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    required: ['$theme', 'tokens'],
    properties: {
        $schema: { type: 'string' },
        $version: { type: 'string' },
        $theme: { type: 'string', enum: ['light', 'dark'] },
        tokens: {
            type: 'object',
            additionalProperties: {
                type: 'object',
                required: ['ref'],
                properties: {
                    ref: { type: 'string' },
                    description: { type: 'string' },
                },
            },
        },
    },
    additionalProperties: false,
};
/**
 * JSON Schema for PlatformRules.
 */
export const platformRulesSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    required: ['$platform', 'rules'],
    properties: {
        $schema: { type: 'string' },
        $version: { type: 'string' },
        $platform: { type: 'string', enum: ['web', 'rn'] },
        rules: {
            type: 'array',
            items: {
                type: 'object',
                required: ['category', 'transform'],
                properties: {
                    category: { type: 'string' },
                    transform: { type: 'string', enum: ['px', 'rem', 'number', 'passthrough'] },
                    remBase: { type: 'number' },
                },
            },
        },
    },
    additionalProperties: false,
};
// Compile validators
const validateContractSchema = ajv.compile(componentContractSchema);
const validateCoreTokensSchema = ajv.compile(coreTokensSchema);
const validateSemanticTokensSchema = ajv.compile(semanticTokensSchema);
const validatePlatformRulesSchema = ajv.compile(platformRulesSchema);
/**
 * Convert AJV errors to ValidationError array.
 */
function ajvErrorsToValidationErrors(errors) {
    if (!errors)
        return [];
    return errors.map(err => ({
        path: err.instancePath || '/',
        message: err.message || 'Unknown validation error',
        code: err.keyword || 'unknown',
        value: err.data,
    }));
}
/**
 * Validate a ComponentContract.
 */
export function validateContract(data) {
    const valid = validateContractSchema(data);
    if (valid) {
        // Additional semantic validation
        const contract = data;
        const errors = [];
        // Check enum props have values
        for (const [propName, prop] of Object.entries(contract.props)) {
            if (prop.type === 'enum' && (!prop.values || prop.values.length === 0)) {
                errors.push({
                    path: `/props/${propName}`,
                    message: 'Enum props must have values array',
                    code: 'enum_missing_values',
                });
            }
        }
        // Check example props exist in contract
        if (contract.examples) {
            for (let i = 0; i < contract.examples.length; i++) {
                const example = contract.examples[i];
                if (example) {
                    for (const propName of Object.keys(example.props)) {
                        if (!(propName in contract.props)) {
                            errors.push({
                                path: `/examples/${i}/props/${propName}`,
                                message: `Example uses unknown prop: ${propName}`,
                                code: 'unknown_prop',
                            });
                        }
                    }
                }
            }
        }
        return errors.length > 0 ? invalidResult(errors) : validResult();
    }
    return invalidResult(ajvErrorsToValidationErrors(validateContractSchema.errors));
}
/**
 * Validate CoreTokens.
 */
export function validateCoreTokens(data) {
    const valid = validateCoreTokensSchema(data);
    if (valid)
        return validResult();
    return invalidResult(ajvErrorsToValidationErrors(validateCoreTokensSchema.errors));
}
/**
 * Validate SemanticTokens.
 */
export function validateSemanticTokens(data) {
    const valid = validateSemanticTokensSchema(data);
    if (valid)
        return validResult();
    return invalidResult(ajvErrorsToValidationErrors(validateSemanticTokensSchema.errors));
}
/**
 * Validate PlatformRules.
 */
export function validatePlatformRules(data) {
    const valid = validatePlatformRulesSchema(data);
    if (valid)
        return validResult();
    return invalidResult(ajvErrorsToValidationErrors(validatePlatformRulesSchema.errors));
}
/**
 * Validate component usage (props against contract).
 */
export function validateUsage(contract, props) {
    const errors = [];
    // Check required props
    for (const [propName, propDef] of Object.entries(contract.props)) {
        if (propDef.required && !(propName in props)) {
            errors.push({
                path: `/${propName}`,
                message: `Required prop missing: ${propName}`,
                code: 'required_prop_missing',
            });
        }
    }
    // Check prop types
    for (const [propName, value] of Object.entries(props)) {
        const propDef = contract.props[propName];
        if (!propDef) {
            errors.push({
                path: `/${propName}`,
                message: `Unknown prop: ${propName}`,
                code: 'unknown_prop',
            });
            continue;
        }
        // Type checking
        switch (propDef.type) {
            case 'string':
                if (typeof value !== 'string') {
                    errors.push({
                        path: `/${propName}`,
                        message: `Expected string, got ${typeof value}`,
                        code: 'type_mismatch',
                        value,
                    });
                }
                break;
            case 'number':
                if (typeof value !== 'number') {
                    errors.push({
                        path: `/${propName}`,
                        message: `Expected number, got ${typeof value}`,
                        code: 'type_mismatch',
                        value,
                    });
                }
                break;
            case 'boolean':
                if (typeof value !== 'boolean') {
                    errors.push({
                        path: `/${propName}`,
                        message: `Expected boolean, got ${typeof value}`,
                        code: 'type_mismatch',
                        value,
                    });
                }
                break;
            case 'enum':
                if (typeof value !== 'string' || !propDef.values?.includes(value)) {
                    errors.push({
                        path: `/${propName}`,
                        message: `Invalid enum value. Expected one of: ${propDef.values?.join(', ')}`,
                        code: 'invalid_enum_value',
                        value,
                    });
                }
                break;
        }
    }
    return errors.length > 0 ? invalidResult(errors) : validResult();
}
//# sourceMappingURL=validation.js.map