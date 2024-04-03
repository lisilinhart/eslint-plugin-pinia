import { createEslintRule } from '../utils/rule-creator'

export const RULE_NAME = 'prefer-use-store-naming-convention'
export type MESSAGE_IDS =
  | 'incorrectPrefix'
  | 'incorrectSuffix'
  | 'storeNameMismatch'
type Options = [{ checkStoreNameMismatch: boolean; storeSuffix: string }]

export default createEslintRule<Options, MESSAGE_IDS>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforces the convention of naming stores with the prefix `use` followed by the store name.'
    },
    schema: [
      {
        type: 'object',
        properties: {
          checkStoreNameMismatch: {
            type: 'boolean',
            default: false
          },
          storeSuffix: {
            type: 'string',
            default: ''
          }
        }
      }
    ],
    messages: {
      incorrectPrefix:
        'Store names should start with "use" followed by the store name.',
      incorrectSuffix: 'Store names should end with "{{ suffixName }}".',
      storeNameMismatch:
        'The "{{name}}" variable naming does not match the unique identifier "{{id}}" naming for the store.'
    }
  },
  defaultOptions: [
    {
      checkStoreNameMismatch: false,
      storeSuffix: ''
    }
  ],
  create: (context, options) => {
    return {
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 'defineStore' &&
          node.arguments.length >= 2 &&
          node.arguments[0].type === 'Literal' &&
          typeof node.arguments[0].value === 'string' &&
          node.parent.id.type === 'Identifier'
        ) {
          const { checkStoreNameMismatch, storeSuffix } = options[0]
          const uniqueId = node.arguments[0].value
          const hasSuffixConfigured = storeSuffix.length > 0
          const expectedName = `use${uniqueId.charAt(0).toUpperCase()}${uniqueId.slice(1)}${storeSuffix}`
          const variableName = node.parent.id.name

          if (!variableName.startsWith('use')) {
            context.report({
              node: node.parent,
              messageId: 'incorrectPrefix'
            })
          }

          if (hasSuffixConfigured && !variableName.endsWith(storeSuffix)) {
            context.report({
              node: node.parent,
              messageId: 'incorrectSuffix',
              data: {
                suffixName: storeSuffix
              }
            })
          }

          if (checkStoreNameMismatch && variableName !== expectedName) {
            context.report({
              node: node.arguments[0],
              messageId: 'storeNameMismatch',
              data: {
                name: variableName,
                id: uniqueId
              }
            })
          }
        }
      }
    }
  }
})
