import pluginQuery from "@tanstack/eslint-plugin-query";
import js from "@eslint/js";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import nestedArrowFunctionsPlugin from "eslint-plugin-nested-arrow-functions";
import modulesNewlinePlugin from "eslint-plugin-modules-newlines";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import stylisticPlugin from "@stylistic/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import { fixupPluginRules } from "@eslint/compat";
import nextPlugin from "@next/eslint-plugin-next";

/** @type { import("eslint").Linter.Config } */
const JavascriptConfig = {
    name: "base",
    files: [
        "**/*.ts",
        "**/*.tsx",
        "**/*.mjs",
        "**/*.js"
    ],
    rules: {
        "no-redeclare": [ "off" ],
        "no-console": [ "off" ],
        "no-unused-vars": [ "off" ],
        "no-undef": [ "off" ],
        "semi": [ "error" ],
        "prefer-const": [ "error" ],
        "arrow-parens": [
            "error",
            "always"
        ],
        "one-var": [ "off" ],
        "id-length": [ "off" ],
        "no-empty-pattern": [ "off" ]
    }
};

const TypescriptConfig = tseslint.config({
    name: "typescript",
    files: [
        "**/*.ts",
        "**/*.tsx"
    ],
    plugins: {
        "@typescript-eslint": tseslint.plugin
    },
    rules: {
        "@typescript-eslint/no-unused-expressions": [ "off" ],
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_"
            }
        ]
    }
});

/** @type { import("eslint").Linter.Config } */
const StylisticConfig = {
    name: "stylistic",
    files: [
        "**/*.ts",
        "**/*.tsx",
        "**/*.mjs",
        "**/*.js"
    ],
    plugins: {
        stylistic: stylisticPlugin
    },
    rules: {
        "stylistic/array-bracket-newline": [
            "error",
            {
                minItems: 2,
                multiline: true
            }
        ],
        "stylistic/array-bracket-spacing": [
            "error",
            "always",
            {
                arraysInArrays: false,
                objectsInArrays: false
            }
        ],
        "stylistic/array-element-newline": [
            "error",
            "always"
        ],
        "stylistic/arrow-parens": [
            "error",
            "always"
        ],
        "stylistic/arrow-spacing": [
            "error",
            {
                before: true,
                after: true
            }
        ],
        "stylistic/block-spacing": [
            "error",
            "always"
        ],
        "stylistic/brace-style": [
            "error",
            "1tbs",
            {
                allowSingleLine: true
            }
        ],
        "stylistic/comma-dangle": [
            "error",
            "never"
        ],
        "stylistic/comma-spacing": [
            "error",
            {
                before: false,
                after: true
            }
        ],
        "stylistic/comma-style": [
            "error",
            "last"
        ],
        "stylistic/computed-property-spacing": [
            "error",
            "never"
        ],
        "stylistic/dot-location": [
            "error",
            "property"
        ],
        "stylistic/eol-last": [
            "error",
            "always"
        ],
        "stylistic/function-call-argument-newline": [
            "error",
            "always"
        ],
        "stylistic/function-call-spacing": [
            "error",
            "never"
        ],
        "stylistic/function-paren-newline": [
            "error",
            "multiline-arguments"
        ],
        "stylistic/generator-star-spacing": [
            "error",
            {
                before: true,
                after: false
            }
        ],
        "stylistic/implicit-arrow-linebreak": [ "off" ],
        "stylistic/indent": [
            "error",
            4,
            {
                ignoredNodes: [ "ArrowFunctionExpression" ],
                SwitchCase: 4,
                VariableDeclarator: "first",
                MemberExpression: 1,
                ObjectExpression: "first",
                ImportDeclaration: 1,
                offsetTernaryExpressions: false
            }
        ],
        "stylistic/indent-binary-ops": [
            "error",
            2
        ],
        "stylistic/key-spacing": [
            "error",
            {
                beforeColon: false,
                afterColon: true,
                mode: "strict"
            }
        ],
        "stylistic/keyword-spacing": [
            "error",
            {
                before: true,
                after: true,
                overrides: {
                    if: {
                        after: false
                    },
                    while: {
                        after: true
                    },
                    for: {
                        after: true
                    }
                }
            }
        ],
        "stylistic/line-comment-position": [
            "error",
            {
                position: "above"
            }
        ],
        "stylistic/linebreak-style": [
            "error",
            "unix"
        ],
        "stylistic/lines-around-comment": [ "off" ],
        "stylistic/lines-between-class-members": [
            "error",
            "always"
        ],
        "stylistic/max-len": [
            "error",
            {
                code: 100,
                tabWidth: 4,
                ignoreComments: true,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true
            }
        ],
        "stylistic/max-statements-per-line": [
            "error",
            {
                max: 1
            }
        ],
        "stylistic/member-delimiter-style": [
            "error",
            {
                multiline: {
                    delimiter: "semi",
                    requireLast: true
                },
                singleline: {
                    delimiter: "semi",
                    requireLast: true
                }
            }
        ],
        "stylistic/multiline-comment-style": [
            "error",
            "separate-lines",
            {
                checkJSDoc: false
            }
        ],
        "stylistic/multiline-ternary": [
            "error",
            "always"
        ],
        "stylistic/new-parens": [
            "error",
            "always"
        ],
        "stylistic/newline-per-chained-call": [
            "error",
            {
                ignoreChainWithDepth: 1
            }
        ],
        "stylistic/no-confusing-arrow": [ "off" ],
        "stylistic/no-extra-parens": [
            "error",
            "functions"
        ],
        "stylistic/no-extra-semi": [ "error" ],
        "stylistic/no-floating-decimal": [ "error" ],
        "stylistic/no-mixed-operators": [ "error" ],
        "stylistic/no-mixed-spaces-and-tabs": [ "error" ],
        "stylistic/no-multi-spaces": [ "error" ],
        "stylistic/no-multiple-empty-lines": [
            "error",
            {
                max: 1,
                maxBOF: 1
            }
        ],
        "stylistic/no-tabs": [ "error" ],
        "stylistic/no-trailing-spaces": [ "error" ],
        "stylistic/no-whitespace-before-property": [ "error" ],
        "stylistic/nonblock-statement-body-position": [
            "error",
            "beside"
        ],
        "stylistic/object-curly-newline": [
            "error",
            {
                ObjectExpression: {
                    minProperties: 1
                },
                ObjectPattern: {
                    multiline: true
                },
                ImportDeclaration: {
                    minProperties: 2
                },
                ExportDeclaration: {
                    minProperties: 2
                }
            }
        ],
        "stylistic/object-curly-spacing": [
            "error",
            "always"
        ],
        "stylistic/object-property-newline": [ "error" ],
        "stylistic/one-var-declaration-per-line": [
            "error",
            "always"
        ],
        "stylistic/operator-linebreak": [
            "error",
            "before",
            {
                overrides: {
                    "+=": "after",
                    "-=": "after",
                    "*=": "after",
                    "/=": "after",
                    "=": "after"
                }
            }
        ],
        "stylistic/padded-blocks": [
            "error",
            {
                blocks: "never",
                classes: "always",
                switches: "never"
            },
            {
                allowSingleLineBlocks: false
            }
        ],
        "stylistic/padding-line-between-statements": [
            "error",
            {
                blankLine: "always",
                prev: "*",
                next: "return"
            }
        ],
        "stylistic/quote-props": [
            "error",
            "consistent-as-needed"
        ],
        "stylistic/quotes": [
            "error",
            "double"
        ],
        "stylistic/rest-spread-spacing": [
            "error",
            "never"
        ],
        "stylistic/semi": [
            "error",
            "always"
        ],
        "stylistic/semi-spacing": [ "error" ],
        "stylistic/semi-style": [
            "error",
            "last"
        ],
        "stylistic/space-before-blocks": [ "error" ],
        "stylistic/space-before-function-paren": [
            "error",
            {
                anonymous: "always",
                asyncArrow: "always",
                named: "never"
            }
        ],
        "stylistic/space-in-parens": [
            "error",
            "never"
        ],
        "stylistic/space-infix-ops": [ "error" ],
        "stylistic/space-unary-ops": [ "error" ],
        "stylistic/spaced-comment": [
            "error",
            "always"
        ],
        "stylistic/switch-colon-spacing": [ "error" ],
        "stylistic/template-curly-spacing": [
            "error",
            "never"
        ],
        "stylistic/template-tag-spacing": [
            "error",
            "never"
        ],
        "stylistic/type-annotation-spacing": [ "error" ],
        "stylistic/type-generic-spacing": [ "error" ],
        "stylistic/type-named-tuple-spacing": [ "error" ],
        "stylistic/wrap-iife": [
            "error",
            "outside"
        ],
        "stylistic/wrap-regex": [ "error" ],
        "stylistic/yield-star-spacing": [
            "error",
            "before"
        ],
        "stylistic/jsx-child-element-spacing": [ "error" ],
        "stylistic/jsx-closing-bracket-location": [ "error" ],
        "stylistic/jsx-closing-tag-location": [ "error" ],
        "stylistic/jsx-curly-brace-presence": [
            "error",
            "always"
        ],
        "stylistic/jsx-curly-newline": [
            "error",
            "consistent"
        ],
        "stylistic/jsx-curly-spacing": [
            "error",
            {
                when: "never"
            }
        ],
        "stylistic/jsx-equals-spacing": [
            "error",
            "never"
        ],
        "stylistic/jsx-first-prop-new-line": [
            "error",
            "multiline-multiprop"
        ],
        "stylistic/jsx-function-call-newline": [
            "error",
            "multiline"
        ],
        "stylistic/jsx-indent": [
            "error",
            4,
            {
                checkAttributes: true,
                indentLogicalExpressions: true
            }
        ],
        "stylistic/jsx-indent-props": [
            "error",
            4
        ],
        "stylistic/jsx-max-props-per-line": [
            "error",
            {
                maximum: 1
            }
        ],
        "stylistic/jsx-newline": [ "off" ],
        "stylistic/jsx-one-expression-per-line": [ "error" ],
        "stylistic/jsx-pascal-case": [ "error" ],
        "stylistic/jsx-props-no-multi-spaces": [ "error" ],
        "stylistic/jsx-quotes": [
            "error",
            "prefer-double"
        ],
        "stylistic/jsx-self-closing-comp": [ "error" ],
        "stylistic/jsx-sort-props": [
            "error",
            {
                callbacksLast: true,
                multiline: "first"
            }
        ],
        "stylistic/jsx-tag-spacing": [
            "error",
            {
                beforeSelfClosing: "always",
                closingSlash: "never",
                afterOpening: "never",
                beforeClosing: "never"
            }
        ],
        "stylistic/jsx-wrap-multilines": [
            "error",
            {
                declaration: "parens",
                assignment: "parens",
                return: "parens",
                arrow: "parens",
                condition: "parens",
                logical: "parens",
                prop: "parens",
                propertyValue: "parens"
            }
        ]
    }
};

/** @type { import("eslint").Linter.Config } */
const PerfectionistConfig = {
    name: "perfectionist",
    plugins: {
        perfectionist: perfectionistPlugin
    },
    files: [
        "**/*.ts",
        "**/*.tsx"
    ],
    rules: {
        "perfectionist/sort-array-includes": [
            "error",
            {
                "type": "alphabetical",
                "order": "asc",
                "spread-last": true
            }
        ],
        "perfectionist/sort-classes": [
            "error",
            {
                type: "natural",
                order: "asc",
                groups: [
                    "index-signature",
                    "static-property",
                    "private-property",
                    "property",
                    "constructor",
                    "static-method",
                    [
                        "get-method",
                        "set-method"
                    ],
                    "method",
                    "static-private-method",
                    "private-method",
                    "unknown"
                ]
            }
        ],
        "perfectionist/sort-enums": [
            "error",
            {
                type: "natural",
                order: "asc"
            }
        ],
        "perfectionist/sort-exports": [
            "error",
            {
                type: "alphabetical",
                order: "asc"
            }
        ],
        "perfectionist/sort-imports": [
            "error",
            {
                "type": "alphabetical",
                "order": "asc",
                "newlines-between": "always",
                "groups": [
                    "unknown",
                    "builtin-type",
                    "external-type",
                    "type",
                    "internal-type",
                    "parent-type",
                    "sibling-type",
                    "index-type",
                    "builtin",
                    "external",
                    "index",
                    "internal",
                    "object",
                    "parent",
                    "sibling",
                    "style"
                ],
                "internal-pattern": [ "@/**" ]
            }
        ],
        "perfectionist/sort-jsx-props": [ "off" ],
        "perfectionist/sort-maps": [
            "error",
            {
                type: "alphabetical",
                order: "asc"
            }
        ],
        "perfectionist/sort-named-exports": [
            "error",
            {
                "type": "alphabetical",
                "order": "asc",
                "group-kind": "types-first"
            }
        ],
        "perfectionist/sort-named-imports": [
            "error",
            {
                "type": "alphabetical",
                "order": "asc",
                "group-kind": "types-first",
                "ignore-alias": false
            }
        ],
        "perfectionist/sort-object-types": [ "off" ],
        "perfectionist/sort-objects": [ "off" ],
        "perfectionist/sort-intersection-types": [
            "error",
            {
                type: "alphabetical",
                order: "asc"
            }
        ],
        "perfectionist/sort-union-types": [
            "error",
            {
                "type": "alphabetical",
                "order": "asc",
                "nullable-last": true
            }
        ]
    }
};

/** @type { import("eslint").Linter.Config } */
const NestedArrowFunctionsConfig = {
    name: "nested-arrow-functions",
    files: [
        "**/*.ts",
        "**/*.tsx"
    ],
    plugins: {
        "nested-arrow-functions": nestedArrowFunctionsPlugin
    },
    rules: {
        "nested-arrow-functions/nested-arrow-functions": [ "error" ],
        "nested-arrow-functions/nested-arrow-function-declarations": [ "error" ]
    }
};

/** @type { import("eslint").Linter.Config } */
const ModulesNewlineConfig = {
    name: "modules-newline",
    plugins: {
        "modules-newline": modulesNewlinePlugin
    },
    rules: {
        "modules-newline/import-declaration-newline": [ "error" ],
        "modules-newline/export-declaration-newline": [ "error" ]
    }
};

/** @type { import("eslint").Linter.Config } */
const ReactConfig = {
    name: "react",
    files: [
        "**/*.ts",
        "**/*.tsx"
    ],
    plugins: {
        "react": reactPlugin,
        "react-hooks": fixupPluginRules(hooksPlugin)
    },
    settings: {
        react: {
            version: "detect"
        }
    },
    rules: {
        ...reactPlugin.configs["all"].rules,
        ...hooksPlugin.configs["recommended"].rules,
        "react/destructuring-assignment": [ "off" ],
        "react/button-has-type": [ "off" ],
        "react/jsx-no-constructed-context-values": [ "off" ],
        "react/jsx-filename-extension": [
            "error",
            {
                extensions: [ ".tsx" ]
            }
        ],
        "react/jsx-max-depth": [
            "error",
            {
                max: 20
            }
        ],
        "react/boolean-prop-naming": [ "off" ],
        "react/function-component-definition": [
            "error",
            {
                namedComponents: "arrow-function",
                unnamedComponents: "arrow-function"
            }
        ],
        "react/hook-use-state": [
            "error",
            {
                allowDestructuredState: true
            }
        ],
        "react/jsx-boolean-value": [
            "error",
            "always"
        ],
        "react/jsx-closing-bracket-location": [
            "error",
            "tag-aligned"
        ],
        "react/jsx-closing-tag-location": [ "error" ],
        "react/jsx-curly-brace-presence": [
            "error",
            "always"
        ],
        "react/jsx-curly-newline": [
            "error",
            {
                multiline: "consistent",
                singleline: "consistent"
            }
        ],
        "react/jsx-curly-spacing": [
            "error",
            "never"
        ],
        "react/jsx-equals-spacing": [
            "error",
            "never"
        ],
        "react/jsx-fragments": [
            "error",
            "syntax"
        ],
        "react/jsx-handler-names": [
            "error",
            {
                eventHandlerPrefix: "(handle|create)",
                eventHandlerPropPrefix: "on",
                checkLocalVariables: true,
                checkInlineFunction: true
            }
        ],
        "react/jsx-indent-props": [
            "error",
            4
        ],
        "react/jsx-key": [
            "warn",
            {
                checkFragmentShorthand: true,
                checkKeyMustBeforeSpread: true,
                warnOnDuplicates: true
            }
        ],
        "react/jsx-max-props-per-line": [
            "error",
            {
                maximum: 1,
                when: "always"
            }
        ],
        "react/jsx-newline": [ "off" ],
        "react/jsx-no-bind": [ "off" ],
        "react/jsx-no-comment-textnodes": [ "off" ],
        "react/jsx-no-duplicate-props": [
            "error",
            {
                ignoreCase: true
            }
        ],
        "react/jsx-no-leaked-render": [
            "error",
            {
                validStrategies: [ "coerce" ]
            }
        ],
        "react/jsx-no-literals": [ "off" ],
        "react/jsx-no-undef": [
            "error",
            {
                allowGlobals: true
            }
        ],
        "react/jsx-no-useless-fragment": [
            "error",
            {
                allowExpressions: true
            }
        ],
        "react/jsx-one-expression-per-line": [
            "error",
            {
                allow: "literal"
            }
        ],
        "react/jsx-pascal-case": [
            "error",
            {
                allowAllCaps: false,
                allowNamespace: true,
                allowLeadingUnderscore: true
            }
        ],
        "react/jsx-props-no-multi-spaces": [ "error" ],
        "react/jsx-props-no-spreading": [ "off" ],
        "react/jsx-sort-default-props": [ "off" ],
        "react/jsx-sort-props": [ "off" ],
        "react/jsx-tag-spacing": [ "off" ],
        "react/jsx-uses-react": [ "off" ],
        "react/jsx-uses-vars": [ "error" ],
        "react/forbid-component-props": [ "off" ],
        "react/jsx-wrap-multilines": [
            "error",
            {
                declaration: "parens-new-line",
                assignment: "parens-new-line",
                return: "parens-new-line",
                arrow: "parens-new-line",
                condition: "ignore",
                logical: "ignore",
                prop: "ignore"
            }
        ],
        "react/no-access-state-in-setstate": [ "error" ],
        "react/no-adjacent-inline-elements": [ "off" ],
        "react/no-array-index-key": [ "off" ],
        "react/no-arrow-function-lifecycle": [ "off" ],
        "react/no-children-prop": [ "off" ],
        "react/no-danger-with-children": [ "error" ],
        "react/no-danger": [ "off" ],
        "react/no-deprecated": [ "error" ],
        "react/no-did-mount-set-state": [ "error" ],
        "react/no-did-update-set-state": [ "error" ],
        "react/no-direct-mutation-state": [ "error" ],
        "react/no-find-dom-node": [ "error" ],
        "react/no-invalid-html-attribute": [ "error" ],
        "react/no-is-mounted": [ "error" ],
        "react/no-multi-comp": [
            "error",
            {
                ignoreStateless: true
            }
        ],
        "react/no-namespace": [ "off" ],
        "react/no-object-type-as-default-prop": [ "error" ],
        "react/no-redundant-should-component-update": [ "error" ],
        "react/no-render-return-value": [ "error" ],
        "react/no-set-state": [ "off" ],
        "react/no-string-refs": [ "error" ],
        "react/no-this-in-sfc": [ "error" ],
        "react/no-typos": [ "warn" ],
        "react/no-unescaped-entities": [ "warn" ],
        "react/no-unknown-property": [ "error" ],
        "react/no-unsafe": [ "error" ],
        "react/no-unstable-nested-components": [ "error" ],
        "react/no-unused-class-component-methods": [ "warn" ],
        "react/no-unused-prop-types": [ "off" ],
        "react/no-unused-state": [ "error" ],
        "react/no-will-update-set-state": [ "error" ],
        "react/prefer-es6-class": [
            "error",
            "always"
        ],
        "react/prefer-exact-props": [ "off" ],
        "react/prefer-read-only-props": [ "off" ],
        "react/prefer-stateless-function": [
            "error",
            {
                ignorePureComponents: false
            }
        ],
        "react/prop-types": [ "off" ],
        "react/react-in-jsx-scope": [ "off" ],
        "react/require-default-props": [ "off" ],
        "react/require-optimization": [ "error" ],
        "react/require-render-return": [ "error" ],
        "react/self-closing-comp": [ "error" ],
        "react/sort-comp": [ "off" ],
        "react/sort-default-props": [ "off" ],
        "react/sort-prop-types": [ "off" ],
        "react/state-in-constructor": [ "off" ],
        "react/static-property-placement": [ "off" ],
        "react/style-prop-object": [ "error" ],
        "react/void-dom-elements-no-children": [ "error" ],
        "react-hooks/exhaustive-deps": [ "error" ],
        "react-hooks/rules-of-hooks": [ "error" ]
    }
};

/** @type { import("eslint").Linter.Config } */
const NextConfig = {
    name: "next",
    files: [
        "**/*.ts",
        "**/*.tsx"
    ],
    plugins: {
        "@next/next": nextPlugin
    },
    rules: {
        ...nextPlugin.configs["recommended"].rules,
        ...nextPlugin.configs["core-web-vitals"].rules,
        "@next/next/no-duplicate-head": [ "off" ],
        "@next/next/no-img-element": [ "off" ]
    }
};

/** @type { import("eslint").Linter.Config[] } */
export default [
    js.configs.recommended,
    JavascriptConfig,
    ...TypescriptConfig,
    StylisticConfig,
    PerfectionistConfig,
    NestedArrowFunctionsConfig,
    ModulesNewlineConfig,
    ReactConfig,
    ...pluginQuery.configs["flat/recommended"],
    NextConfig,
    {
        name: "root",
        ignores: [
            "node_modules/**",
            "eslint.config.mjs",
            "dist/**"
        ],
        languageOptions: {
            parser: tsParser,
            globals: {
                ...globals.node
            },
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                },
                tsconfigRootDir: "."
            }
        }
    }
];
