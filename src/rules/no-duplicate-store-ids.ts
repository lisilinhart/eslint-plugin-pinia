import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createEslintRule } from '../utils/rule-creator'

export const RULE_NAME = 'no-duplicate-store-ids'
export type MESSAGE_IDS = 'duplicatedStoreIds'
type Options = []

const usingStoreIds = new Set<string>()

export default createEslintRule<Options, MESSAGE_IDS>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow duplicate store ids.'
    },
    schema: [],
    messages: {
      duplicatedStoreIds: 'No duplicated store ids allowed: {{storeId}}'
    }
  },
  defaultOptions: [],
  create: (context) => {
    return {
      CallExpression(node) {
        const callee = node.callee
        if (callee.type !== 'Identifier' || callee.name !== 'defineStore')
          return

        const storeId = node.arguments && node.arguments[0]

        if (!storeId || storeId.type !== AST_NODE_TYPES.Literal) return

        const value = storeId.value as string

        if (usingStoreIds.has(value)) {
          context.report({
            node: storeId,
            messageId: 'duplicatedStoreIds',
            data: {
              storeId: storeId.value
            }
          })
        } else {
          usingStoreIds.add(value)
        }
      }
    }
  }
})
