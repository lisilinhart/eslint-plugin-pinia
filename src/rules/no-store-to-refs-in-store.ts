import { createEslintRule } from '../utils/rule-creator'

export const RULE_NAME = 'no-store-to-refs-in-store'
export type MESSAGE_IDS = 'storeToRefs'
type Options = []

export default createEslintRule<Options, MESSAGE_IDS>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow use of storeToRefs inside defineStore'
    },
    schema: [],
    messages: {
      storeToRefs:
        'Do not use storeToRefs in other stores. Use the store as a whole directly.'
    }
  },
  defaultOptions: [],
  create: (context) => {
    return {
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 'defineStore' &&
          node.arguments.length >= 2
        ) {
          const functionBody = node.arguments[1]
          if (
            functionBody.type === 'ArrowFunctionExpression' ||
            functionBody.type === 'FunctionExpression'
          ) {
            const body = functionBody.body
            if (body.type === 'BlockStatement') {
              body.body.forEach((statement) => {
                if (
                  statement.type === 'VariableDeclaration' &&
                  statement.declarations.length > 0
                ) {
                  statement.declarations.forEach((declaration) => {
                    if (
                      declaration.init &&
                      declaration.init.type === 'CallExpression' &&
                      declaration.init.callee.type === 'Identifier' &&
                      declaration.init.callee.name === 'storeToRefs'
                    ) {
                      context.report({
                        node: declaration.init.callee,
                        messageId: 'storeToRefs'
                      })
                    }
                  })
                }
              })
            }
          }
        }
      }
    }
  }
})
