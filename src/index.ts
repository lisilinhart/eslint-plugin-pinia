import requireSetupStoreProps, {
  RULE_NAME as requireSetupStorePropsName
} from './rules/require-setup-store-properties-export'
import preferNamingConvention, {
  RULE_NAME as preferNamingConventionName
} from './rules/prefer-use-store-naming-convention'

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
  [preferNamingConventionName]: 'warn'
}

const recommended = {
  [requireSetupStorePropsName]: 'error'
}

export default {
  rules: {
    [requireSetupStorePropsName]: requireSetupStoreProps,
    [preferNamingConventionName]: preferNamingConvention
  },
  configs: {
    all: createConfig(allRules),
    recommended: createConfig(recommended)
  }
}
