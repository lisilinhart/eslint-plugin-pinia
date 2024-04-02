import { createEslintRule } from '../utils/rule-creator'

export const RULE_NAME = 'prefer-single-store-per-file'
export type MESSAGE_IDS = 'multipleStores'
type Options = []

export default createEslintRule<Options, MESSAGE_IDS>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'Encourages defining each store in a separate file.'
    },
    schema: [],
    messages: {
      multipleStores: 'Only one store definition per file is allowed.'
    }
  },
  defaultOptions: [],
  create: (context) => {
    let storeDeclaration = null

    return {
      Program() {
        storeDeclaration = null
      },
      CallExpression(node) {
        const callee = node.callee
        if (callee.type === 'Identifier' && callee.name === 'defineStore') {
          if (!storeDeclaration) {
            storeDeclaration = node
          } else {
            context.report({
              messageId: 'multipleStores',
              node: storeDeclaration
            })
          }
        }
      }
    }
  }
})
