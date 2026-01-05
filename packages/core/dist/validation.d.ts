import type { ComponentContract } from './types/contracts.js';
import { type ValidationResult } from './errors.js';
/**
 * JSON Schema for ComponentContract.
 */
export declare const componentContractSchema: {
    $schema: string;
    type: string;
    required: string[];
    properties: {
        $schema: {
            type: string;
        };
        $version: {
            type: string;
        };
        name: {
            type: string;
            pattern: string;
        };
        description: {
            type: string;
        };
        platformTargets: {
            type: string;
            items: {
                type: string;
                enum: string[];
            };
            minItems: number;
        };
        props: {
            type: string;
            additionalProperties: {
                type: string;
                required: string[];
                properties: {
                    type: {
                        type: string;
                        enum: string[];
                    };
                    values: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                    default: {};
                    required: {
                        type: string;
                    };
                    description: {
                        type: string;
                    };
                };
            };
        };
        variants: {
            type: string;
            items: {
                type: string;
                required: string[];
                properties: {
                    name: {
                        type: string;
                    };
                    description: {
                        type: string;
                    };
                    props: {
                        type: string;
                    };
                };
            };
        };
        states: {
            type: string;
            items: {
                type: string;
                required: string[];
                properties: {
                    name: {
                        type: string;
                    };
                    description: {
                        type: string;
                    };
                };
            };
        };
        code: {
            type: string;
            required: string[];
            properties: {
                importPath: {
                    type: string;
                };
                exportName: {
                    type: string;
                };
            };
        };
        examples: {
            type: string;
            items: {
                type: string;
                required: string[];
                properties: {
                    name: {
                        type: string;
                    };
                    description: {
                        type: string;
                    };
                    props: {
                        type: string;
                    };
                };
            };
        };
    };
    additionalProperties: boolean;
};
/**
 * JSON Schema for CoreTokens.
 */
export declare const coreTokensSchema: {
    $schema: string;
    type: string;
    required: string[];
    properties: {
        $schema: {
            type: string;
        };
        $version: {
            type: string;
        };
        tokens: {
            type: string;
            additionalProperties: {
                type: string;
                required: string[];
                properties: {
                    value: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    description: {
                        type: string;
                    };
                    category: {
                        type: string;
                        enum: string[];
                    };
                };
            };
        };
    };
    additionalProperties: boolean;
};
/**
 * JSON Schema for SemanticTokens.
 */
export declare const semanticTokensSchema: {
    $schema: string;
    type: string;
    required: string[];
    properties: {
        $schema: {
            type: string;
        };
        $version: {
            type: string;
        };
        $theme: {
            type: string;
            enum: string[];
        };
        tokens: {
            type: string;
            additionalProperties: {
                type: string;
                required: string[];
                properties: {
                    ref: {
                        type: string;
                    };
                    description: {
                        type: string;
                    };
                };
            };
        };
    };
    additionalProperties: boolean;
};
/**
 * JSON Schema for PlatformRules.
 */
export declare const platformRulesSchema: {
    $schema: string;
    type: string;
    required: string[];
    properties: {
        $schema: {
            type: string;
        };
        $version: {
            type: string;
        };
        $platform: {
            type: string;
            enum: string[];
        };
        rules: {
            type: string;
            items: {
                type: string;
                required: string[];
                properties: {
                    category: {
                        type: string;
                    };
                    transform: {
                        type: string;
                        enum: string[];
                    };
                    remBase: {
                        type: string;
                    };
                };
            };
        };
    };
    additionalProperties: boolean;
};
/**
 * Validate a ComponentContract.
 */
export declare function validateContract(data: unknown): ValidationResult;
/**
 * Validate CoreTokens.
 */
export declare function validateCoreTokens(data: unknown): ValidationResult;
/**
 * Validate SemanticTokens.
 */
export declare function validateSemanticTokens(data: unknown): ValidationResult;
/**
 * Validate PlatformRules.
 */
export declare function validatePlatformRules(data: unknown): ValidationResult;
/**
 * Validate component usage (props against contract).
 */
export declare function validateUsage(contract: ComponentContract, props: Record<string, unknown>): ValidationResult;
//# sourceMappingURL=validation.d.ts.map