import rule, {
  RULE_NAME
} from '../../src/rules/prefer-use-store-naming-convention'
import { ruleTester } from '../rule-tester'

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `export const useCounterStore = defineStore('counter', () => {
      const count = ref(0)
      return { count }
    })`,
    `export const useCounterStore = defineStore('Counter', () => {
      const count = ref(0)
      return { count }
    })`
  ],
  invalid: [
    {
      code: `export const aCounter = defineStore('counter', () => {
        const count = ref(0)
        return { count }
      })`,
      errors: [
        {
          messageId: 'incorrectStoreNamingConvention'
        },
        {
          messageId: 'storeNameMismatch'
        }
      ]
    },
    {
      code: `export const someThing = defineStore('counter', () => {
        const count = ref(0)
        return { count }
      })`,
      errors: [
        {
          messageId: 'incorrectStoreNamingConvention'
        },
        {
          messageId: 'storeNameMismatch'
        }
      ]
    },
    {
      code: `export const useCounterStore = defineStore('number', () => {
        const count = ref(0)
        return { count }
      })`,
      errors: [
        {
          messageId: 'storeNameMismatch'
        }
      ]
    }
  ]
})

ruleTester.run(
  RULE_NAME + ' with "checkStoreNameMismatch" option set to false',
  rule,
  {
    valid: [
      {
        code: `export const useCounterStore = defineStore('number', () => {
          const count = ref(0)
          return { count }
        })`,
        options: [{ checkStoreNameMismatch: false }]
      }
    ],
    invalid: [
      {
        code: `export const CounterStore = defineStore('number', () => {
          const count = ref(0)
          return { count }
        })`,
        options: [{ checkStoreNameMismatch: false }],
        errors: [
          {
            messageId: 'incorrectStoreNamingConvention'
          }
        ]
      },
      {
        code: `export const Counter = defineStore('counter', () => {
          const count = ref(0)
          return { count }
        })`,
        options: [{ checkStoreNameMismatch: false }],
        errors: [
          {
            messageId: 'incorrectStoreNamingConvention'
          }
        ]
      }
    ]
  }
)
