import rule, { RULE_NAME } from '../../src/rules/prefer-single-store-per-file'
import { ruleTester } from '../rule-tester'

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `import { defineStore } from 'pinia'
      export const useCounterStore = defineStore('counter', () => {
        const count = ref(0)
        return { count }
    })`,
    `import { defineStore } from 'pinia'
      const useAuthStore = defineStore('auth', () => {
        const isAuthenticated = ref(false)
        return { isAuthenticated }
      })`
  ],
  invalid: [
    {
      code: `import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  return { count }
})

const useTodoStore = defineStore('todo', () => {
  const todos = ref([])
  return { todos }
})`,
      errors: [
        {
          messageId: 'multipleStores'
        }
      ]
    }
  ]
})
