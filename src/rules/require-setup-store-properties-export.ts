import { createEslintRule } from '../utils/rule-creator'

export const RULE_NAME = 'require-setup-store-properties-export'
export type MESSAGE_IDS = 'missingVariables'
type Options = []

export default createEslintRule<Options, MESSAGE_IDS>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'In setup stores all state properties must be exported.'
    },
    schema: [],
    messages: {
      missingVariables:
        'Missing state variable exports in return statement: {{variableNames}}'
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
          function isRefOrReactiveCall(node) {
            return (
              node.type === 'CallExpression' &&
              node.callee.type === 'Identifier' &&
              (node.callee.name === 'ref' || node.callee.name === 'reactive')
            )
          }

          const returnStatement = node.arguments[1].body.body.find(
            (statement) => statement.type === 'ReturnStatement'
          )

          const declaredStateVariables = node.arguments[1].body.body
            .filter((statement) => statement.type === 'VariableDeclaration')
            .map((declaration) =>
              declaration.declarations
                .filter((declarator) => isRefOrReactiveCall(declarator.init))
                .map((declarator) => declarator.id.name)
            )
            .flat()

          if (!returnStatement && declaredStateVariables.length > 0) {
            context.report({
              node,
              messageId: 'missingVariables',
              data: {
                variableNames: declaredStateVariables.join(', ')
              }
            })
            return
          }

          const returnedVariables = returnStatement
            ? returnStatement.argument.properties.map(
                (property) => property.value.name
              )
            : []

          const missingVariables = declaredStateVariables.filter(
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
