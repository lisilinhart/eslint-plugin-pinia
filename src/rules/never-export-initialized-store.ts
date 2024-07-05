import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createEslintRule } from '../utils/rule-creator'

export const RULE_NAME = 'never-export-initialized-store'
export type MESSAGE_IDS =
  | 'namedInitialization'
  | 'defaultInitialization'
type Options = []

const storeIds = new Set<string>()
export default createEslintRule<Options, MESSAGE_IDS>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        'Never export an initialized named or default store.'
    },
    schema: [],
    messages: {
      namedInitialization:
        'Never export an initialized store: {{storeName}}. Use inject/import instead where it is used.',
      defaultInitialization:
        'Never export default initialized store. Use inject/import instead where it is used.'
    }
  },
  defaultOptions: [],
  create: (context) => {
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
          const callee = node.callee
          if (callee.type !== 'Identifier' || callee.name !== 'defineStore')
            return

          const storeId = node.arguments && node.arguments[0]

          if (!storeId || storeId.type !== AST_NODE_TYPES.Literal) return

          const value = node.parent.id.name as string
          storeIds.add(value)
        }
      },
      ExportDefaultDeclaration(node) {
        if (
          storeIds.has(node.declaration?.parent?.declaration?.callee?.name)
        ) {
          context.report({
            node,
            messageId: 'defaultInitialization'
          })
        }
      },
      ExportNamedDeclaration(node) {
        if (node?.declaration?.type === 'VariableDeclaration') {
          node?.declaration?.declarations.forEach(declaration => {
            if (
              storeIds.has(declaration?.init?.callee?.name)
            ) {
              context.report({
                node,
                messageId: 'namedInitialization',
                data: {
                  storeName: declaration?.init?.callee?.name
                }
              })
            }
          })
        }
      }
    }
  }
})
