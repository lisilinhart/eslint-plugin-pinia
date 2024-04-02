import { createEslintRule } from '../utils/rule-creator'

export const RULE_NAME = 'require-setup-store-properties-export'
export type MESSAGE_IDS = 'missingVariables' | 'noReturns'
type Options = []

export default createEslintRule<Options, MESSAGE_IDS>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'In setup stores all state properties must be exported.'
    },
    fixable: 'code',
    hasSuggestions: true,
    schema: [],
    messages: {
      noReturns:
        'All variables declared inside defineStore must be returned in the return statement.',
      missingVariables: `Missing exports in return statement: {{variableNames}}`
    }
  },
  defaultOptions: [],
  create: (context) => {
    return {
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 'defineStore' &&
          node.arguments.length === 2 &&
          node.arguments[1].type !== 'ObjectExpression'
        ) {
          const returnStatement = node.arguments[1].body.body.find(
            (statement) => statement.type === 'ReturnStatement'
          )

          const declaredVariables = node.arguments[1].body.body
            .filter((statement) => statement.type === 'VariableDeclaration')
            .map((declaration) =>
              declaration.declarations.map((declarator) => declarator.id.name)
            )
            .flat()

          if (!returnStatement && declaredVariables.length > 0) {
            context.report({
              node: node,
              messageId: 'noReturns'
            })
            return
          }

          const returnedVariables = returnStatement.argument.properties.map(
            (property) => property.key.name
          )

          const missingVariables = declaredVariables.filter(
            (variable) => !returnedVariables.includes(variable)
          )

          if (missingVariables.length > 0) {
            context.report({
              node: returnStatement,
              messageId: 'missingVariables',
              data: {
                variableNames: missingVariables.join(', ')
              }
            })
          }
        }
      }
    }
  }
})
