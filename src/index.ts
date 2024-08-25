import { RULE_NAME as requireSetupStorePropsName } from './rules/require-setup-store-properties-export'
import { RULE_NAME as neverExportInitializedStoreName } from './rules/never-export-initialized-store'
import { RULE_NAME as preferNamingConventionName } from './rules/prefer-use-store-naming-convention'
import { RULE_NAME as preferSingleStoreName } from './rules/prefer-single-store-per-file'
import { RULE_NAME as noReturnGlobalPropertiesName } from './rules/no-return-global-properties'
import { RULE_NAME as noDuplicateStoreIdsName } from './rules/no-duplicate-store-ids'
import { RULE_NAME as noStoreToRefs } from './rules/no-store-to-refs-in-store'
import rules from './rules/index'

const plugin = {
  rules
}

const allRules = {
  [neverExportInitializedStoreName]: 'warn',
  [noDuplicateStoreIdsName]: 'warn',
  [noReturnGlobalPropertiesName]: 'warn',
  [noStoreToRefs]: 'warn',
  [preferNamingConventionName]: 'warn',
  [preferSingleStoreName]: 'off',
  [requireSetupStorePropsName]: 'warn'
}

const recommended = {
  [neverExportInitializedStoreName]: 'error',
  [noDuplicateStoreIdsName]: 'error',
  [noReturnGlobalPropertiesName]: 'error',
  [noStoreToRefs]: 'error',
  [preferNamingConventionName]: 'warn',
  [requireSetupStorePropsName]: 'error'
}

function createConfig<T extends Record<string, unknown>>(
  _rules: T,
  flat = false
) {
  const name = 'pinia'
  const constructedRules: Record<`pinia/${string}`, string> = Object.keys(
    _rules
  ).reduce((acc, ruleName) => {
    return {
      ...acc,
      [`${name}/${ruleName}`]: rules[ruleName]
    }
  }, {})
  if (flat) {
    return {
      plugins: {
        [name]: plugin
      },
      rules: constructedRules
    }
  } else {
    return {
      plugins: [name],
      rules: constructedRules
    }
  }
}

const configs = {
  all: createConfig(allRules),
  recommended: createConfig(recommended),
  'all-flat': createConfig(allRules, true),
  'recommended-flat': createConfig(recommended, true)
}

export default {
  ...plugin,
  configs
}
