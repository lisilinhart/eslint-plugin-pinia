import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

export function isRefOrReactiveCall(node: TSESTree.Expression | null): node is TSESTree.CallExpression {
  return (
    !!node &&
    node.type === AST_NODE_TYPES.CallExpression &&
    node.callee.type === 'Identifier' &&
    (node.callee.name === 'ref' || node.callee.name === 'reactive')
  )
}