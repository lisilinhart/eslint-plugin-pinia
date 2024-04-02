import requireSetupStoreProps, {
  RULE_NAME as requireSetupStorePropsName
} from './rules/require-setup-store-properties-export'

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
  [requireSetupStorePropsName]: 'warn'
}

const recommended = {
  [requireSetupStorePropsName]: 'error'
}

export default {
  rules: {
    [requireSetupStorePropsName]: requireSetupStoreProps
  },
  configs: {
    all: createConfig(allRules),
    recommended: createConfig(recommended)
  }
}
