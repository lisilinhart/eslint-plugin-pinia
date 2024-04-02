import {
    ESLintUtils
} from '@typescript-eslint/utils'

export const createEslintRule = ESLintUtils.RuleCreator(
    (name) =>
      `https://github.com/lisilinhart/eslint-plugin-pinia/blob/main/docs/rules/${name}.md`
)
