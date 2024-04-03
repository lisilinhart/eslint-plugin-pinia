import { createEslintRule } from '../utils/rule-creator'

export const RULE_NAME = 'prefer-use-store-naming-convention'
export type MESSAGE_IDS = 'incorrectStoreNamingConvention' | 'storeNameMismatch'
type Options = [{ checkStoreNameMismatch: boolean }]

export default createEslintRule<Options, MESSAGE_IDS>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforces the convention of naming stores with the prefix `use` followed by the store name and suffixed with `Store`.'
    },
    schema: [
      {
        type: 'object',
        properties: {
          checkStoreNameMismatch: {
            type: 'boolean',
            default: true
          }
        }
      }
    ],
    messages: {
      incorrectStoreNamingConvention:
        'Store names should start with "use" followed by the store name and suffixed with "Store".',
      storeNameMismatch:
        'The "{{name}}" variable naming does not match the unique identifier "{{id}}" naming for the store.'
    }
  },
  defaultOptions: [
    {
      checkStoreNameMismatch: true
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
          const { checkStoreNameMismatch } = options[0]
          const uniqueId = node.arguments[0].value
          const expectedName = `use${uniqueId.charAt(0).toUpperCase()}${uniqueId.slice(1)}Store`
          const variableName = node.parent.id.name

          if (
            !variableName.startsWith('use') ||
            !variableName.endsWith('Store')
          ) {
            context.report({
              node: node.parent,
              messageId: 'incorrectStoreNamingConvention'
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
