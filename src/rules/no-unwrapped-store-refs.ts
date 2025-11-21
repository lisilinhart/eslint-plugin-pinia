import { TSESTree, TSESLint } from '@typescript-eslint/utils'
import { createEslintRule } from '../utils/rule-creator'

export const RULE_NAME = 'no-unwrapped-store-refs'
export type MESSAGE_IDS = 'noUnwrappedStoreRefs'
type Options = []

export default createEslintRule<Options, MESSAGE_IDS>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow using refs from a store without unwrapping them.'
    },
    messages: {
      noUnwrappedStoreRefs: 'Refs from a store must be unwrapped to be used.'
    },
    schema: []
  },
  defaultOptions: [],

  create(context) {
    const storeToRefsVariables: TSESLint.Scope.Variable[] = []

    return {
      VariableDeclarator(node: TSESTree.VariableDeclarator) {
        if (
          node.init?.type === 'CallExpression' &&
          node.init.callee.type === 'Identifier' &&
          node.init.callee.name === 'storeToRefs' &&
          node.id.type === 'ObjectPattern'
        ) {
          const scope = context.sourceCode.getScope(node)
          for (const prop of node.id.properties) {
            if (prop.type === 'Property') {
              const propValue = prop.value
              if (propValue.type === 'Identifier') {
                const variable = scope.variables.find(
                  (v) => v.name === propValue.name
                )
                if (variable) {
                  storeToRefsVariables.push(variable)
                }
              }
            }
          }
        }
      },

      'Program:exit'() {
        for (const variable of storeToRefsVariables) {
          for (const reference of variable.references) {
            if (reference.init) {
              continue
            }

            const idNode = reference.identifier

            if (
              idNode.parent.type !== 'MemberExpression' ||
              idNode.parent.object !== idNode
            ) {
              context.report({
                node: idNode,
                messageId: 'noUnwrappedStoreRefs'
              })
            }
          }
        }
      }
    }
  }
})
