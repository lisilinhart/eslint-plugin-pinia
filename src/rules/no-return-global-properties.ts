import {} from 'typescript'
import { createEslintRule } from '../utils/rule-creator'

export const RULE_NAME = 'no-return-global-properties'
export type MESSAGE_IDS = 'returnGlobalProperties'
type Options = []

export default createEslintRule<Options, MESSAGE_IDS>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallows returning globally provided properties from Pinia stores.'
    },
    schema: [],
    messages: {
      returnGlobalProperties:
        'Do not return properties like {{property}} as they are globally available and should not be returned from stores.'
    }
  },
  defaultOptions: [],
  create: (context) => {
    const variablesUsingGlobalCallee = new Set<string>()

    return {
      VariableDeclaration(node) {
        node.declarations.forEach((declaration) => {
          if (declaration.init && declaration.init.type === 'CallExpression') {
            const calleeName = declaration.init.callee.name
            if (calleeName === 'useRoute' || calleeName === 'inject') {
              variablesUsingGlobalCallee.add(declaration.id.name)
            }
          }
        })
      },
      ReturnStatement(node) {
        const { argument } = node
        if (argument && argument.type === 'ObjectExpression') {
          const { properties } = argument

          if (!properties) return

          properties.forEach((property) => {
            if (variablesUsingGlobalCallee.has(property?.value?.name)) {
              context.report({
                messageId: 'returnGlobalProperties',
                node: property,
                data: {
                  property: property?.value?.name
                }
              })
            }
          })
        }
      }
    }
  }
})
