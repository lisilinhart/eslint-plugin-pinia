import rule, {
  RULE_NAME
} from '../../src/rules/prefer-use-store-naming-convention'
import { ruleTester } from '../rule-tester'

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `export const useCounter = defineStore('counter', () => {
      const count = ref(0)
      return { count }
    })`,
    `export const useCounter = defineStore('Counter', () => {
      const count = ref(0)
      return { count }
    })`,
    `export const useCounterStore = defineStore('someCounter', () => {
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
          messageId: 'incorrectPrefix'
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
          messageId: 'incorrectPrefix'
        }
      ]
    }
  ]
})

ruleTester.run(
  RULE_NAME + ' with "checkStoreNameMismatch" option set to true',
  rule,
  {
    valid: [
      {
        code: `export const useCounter = defineStore('counter', () => {
          const count = ref(0)
          return { count }
        })`,
        options: [{ checkStoreNameMismatch: true }]
      }
    ],
    invalid: [
      {
        code: `export const CounterStore = defineStore('number', () => {
          const count = ref(0)
          return { count }
        })`,
        options: [{ checkStoreNameMismatch: true }],
        errors: [
          {
            messageId: 'incorrectPrefix'
          },
          {
            messageId: 'storeNameMismatch'
          }
        ]
      },
      {
        code: `export const useSomething = defineStore('counter', () => {
          const count = ref(0)
          return { count }
        })`,
        options: [{ checkStoreNameMismatch: true }],
        errors: [
          {
            messageId: 'storeNameMismatch'
          }
        ]
      }
    ]
  }
)

ruleTester.run(RULE_NAME + ' with "storeSuffix" option', rule, {
  valid: [
    {
      code: `export const useCounterStore = defineStore('number', () => {
          const count = ref(0)
          return { count }
        })`,
      options: [{ storeSuffix: 'Store' }]
    },
    {
      code: `export const useNumberService = defineStore('number', () => {
          const count = ref(0)
          return { count }
        })`,
      options: [{ storeSuffix: 'Service' }]
    },
    {
      code: `export const useNumber = defineStore('number', () => {
          const count = ref(0)
          return { count }
        })`,
      options: [{ storeSuffix: '' }]
    }
  ],
  invalid: [
    {
      code: `export const CounterStore = defineStore('number', () => {
          const count = ref(0)
          return { count }
        })`,
      options: [{ storeSuffix: 'Service' }],
      errors: [
        {
          messageId: 'incorrectPrefix'
        },
        {
          messageId: 'incorrectSuffix'
        }
      ]
    },
    {
      code: `export const useCounterService = defineStore('counter', () => {
          const count = ref(0)
          return { count }
        })`,
      options: [{ storeSuffix: 'Store' }],
      errors: [
        {
          messageId: 'incorrectSuffix'
        }
      ]
    }
  ]
})
