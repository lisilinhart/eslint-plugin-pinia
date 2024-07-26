import rule, { RULE_NAME } from '../../src/rules/no-duplicate-store-ids'
import { ruleTester } from '../rule-tester'

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `import { defineStore } from 'pinia'
      export const useCounterStore = defineStore()`
    },
    {
      code: `import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  return { count }
})
  export const useTodoStore = defineStore('todo', () => {
    const todo = ref(0)
    return { todo }
})`
    }
  ],
  invalid: [
    {
      code: `import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  return { count }
})

const useCounter2Store = defineStore('counter', () => {
})`,
      errors: [
        {
          messageId: 'duplicatedStoreIds'
        }
      ]
    }
  ]
})
