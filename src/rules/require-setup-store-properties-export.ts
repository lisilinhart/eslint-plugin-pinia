import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils'
import { createEslintRule } from '../utils/rule-creator'
import { getPropertyName, isIdentifier } from '@typescript-eslint/utils/ast-utils'
import { isRefOrReactiveCall } from '../utils/ast-utils'

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
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name === 'defineStore' &&
          node.arguments.length === 2 &&
          node.arguments[1].type !== AST_NODE_TYPES.ObjectExpression
        ) {
          const arrowFunc = node.arguments[1] as TSESTree.ArrowFunctionExpression

          if (arrowFunc.body.type !== AST_NODE_TYPES.BlockStatement)
            return

          const declaredStateVariables = arrowFunc.body.body
            .filter(({ type }) => type === AST_NODE_TYPES.VariableDeclaration)
            .flatMap((declaration) => {
              return (declaration as TSESTree.VariableDeclaration).declarations
                .filter(({ init, id }) => isRefOrReactiveCall(init) && isIdentifier(id))
                .map(({ id }) => (id as TSESTree.Identifier).name)
            })

          if (declaredStateVariables.length <= 0)
            return

          const returnStatement = arrowFunc.body.body.find(({ type }) => type === AST_NODE_TYPES.ReturnStatement) as TSESTree.ReturnStatement | null

          if (!returnStatement) {
            return context.report({
              node,
              messageId: 'missingVariables',
              data: {
                variableNames: declaredStateVariables.join(', ')
              }
            })
          }

          const returnedVariables = returnStatement?.argument?.type === AST_NODE_TYPES.ObjectExpression
            ? returnStatement.argument.properties.flatMap(
                (property) => property.type === AST_NODE_TYPES.Property && property.value.type === AST_NODE_TYPES.Identifier ? [property.value.name] : []
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
