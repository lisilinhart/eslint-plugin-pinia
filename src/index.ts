import requireSetupStoreProps, {
  RULE_NAME as requireSetupStorePropsName
} from './rules/require-setup-store-properties-export'

import preferNamingConvention, {
  RULE_NAME as preferNamingConventionName
} from './rules/prefer-use-store-naming-convention'

import preferSingleStore, {
  RULE_NAME as preferSingleStoreName
} from './rules/prefer-single-store-per-file'

import noReturnGlobalProperties, {
  RULE_NAME as noReturnGlobalPropertiesName
} from './rules/no-return-global-properties'

import noDuplicateStoreIds, {
  RULE_NAME as noDuplicateStoreIdsName
} from './rules/no-duplicate-store-ids'

const createConfig = (rules: Record<string, string>) => ({
  plugins: ['pinia'],
  rules: Object.keys(rules).reduce((acc, ruleName) => {
    return {
      ...acc,
      [`pinia/${ruleName}`]: rules[ruleName]
    }
  }, {})
})

const allRules = {
  [requireSetupStorePropsName]: 'warn',
  [preferNamingConventionName]: 'warn',
  [preferSingleStoreName]: 'off',
  [noReturnGlobalPropertiesName]: 'warn',
  [noDuplicateStoreIdsName]: 'warn'
}

const recommended = {
  [requireSetupStorePropsName]: 'error',
  [noReturnGlobalPropertiesName]: 'error',
  [noDuplicateStoreIdsName]: 'error'
}

export default {
  rules: {
    [requireSetupStorePropsName]: requireSetupStoreProps,
    [preferNamingConventionName]: preferNamingConvention,
    [preferSingleStoreName]: preferSingleStore,
    [noReturnGlobalPropertiesName]: noReturnGlobalProperties,
    [noDuplicateStoreIdsName]: noDuplicateStoreIds
  },
  configs: {
    all: createConfig(allRules),
    recommended: createConfig(recommended)
  }
}
