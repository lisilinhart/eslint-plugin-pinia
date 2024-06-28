import rule, { RULE_NAME } from '../../src/rules/never-export-initialized-store'
import { ruleTester } from '../rule-tester'

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `import { defineStore } from 'pinia';

      export const useCounterStore = defineStore('counter', () => {
        const count = ref(0);
        return { count };
      });`
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
          messageId: 'namedInitialization'
        }
      ]
    },
    {
      code: `import { defineStore } from 'pinia';
      
      export const useCounterStore = defineStore('counter', () => {
        const count = ref(0);
        return { count };
      });
      
      export default useCounterStore();
      `,
      errors: [
        {
          messageId: 'defaultInitialization'
        }
      ]
    }
  ]
})
