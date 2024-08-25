import { resolve } from 'path'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createEslintRule } from '../utils/rule-creator'

export const RULE_NAME = 'no-duplicate-store-ids'
export type MESSAGE_IDS = 'duplicatedStoreIds'
type Options = []

const storeIdsCache: Map<string, Set<string>> = new Map()

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
    const filepath = resolve(context.physicalFilename ?? context.filename)

    let crtStoreIds = storeIdsCache.get(filepath)
    if (!crtStoreIds) {
      crtStoreIds = new Set()
      storeIdsCache.set(filepath, crtStoreIds)
    } else {
      crtStoreIds.clear()
    }

    return {
      CallExpression(node) {
        const callee = node.callee
        const storeId = node.arguments?.[0]

        if (callee.type !== AST_NODE_TYPES.Identifier || callee.name !== 'defineStore')
          return
        if (!storeId || storeId.type !== AST_NODE_TYPES.Literal)
          return

        const value = storeId.value as string

        // check in current file first
        if (crtStoreIds.has(value)) {
          reportError()
          return
        } else {
          crtStoreIds.add(value)
        }

        for (const [key, ids] of storeIdsCache) {
          if (key !== filepath && ids.has(value)) {
            reportError()
            return
          }
        }

        function reportError() {
          context.report({
            node: storeId,
            messageId: 'duplicatedStoreIds',
            data: {
              storeId: value
            }
          })
        }
      }
    }
  }
})
