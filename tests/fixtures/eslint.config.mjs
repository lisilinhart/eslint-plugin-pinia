import pluginPinia from 'eslint-plugin-pinia'

export default [
  {
    files: ['**/*.ts'],
    plugins: {
      pinia: pluginPinia
    },
    rules: {
      'pinia/no-duplicate-store-ids': 'error'
    }
  }
]