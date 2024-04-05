import rule, { RULE_NAME } from '../../src/rules/no-return-global-properties'
import { ruleTester } from '../rule-tester'

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `export const useCounterStore = defineStore('counter', () => {
    })`,
    {
      code: `import { defineStore } from 'pinia';
      const useCounterStore = defineStore('counter', () => {
        const count = ref(0);
        return { count };
      })`
    },
    {
      code: `import { defineStore } from 'pinia';
      const useAuthStore = defineStore('auth', () => {
        const isAuthenticated = ref(false);
        return { isAuthenticated };
      })`
    },
    {
      code: `import { defineStore } from 'pinia';
      const useAuthStore = defineStore('auth', () => {
        const isAuthenticated = ref(false);
        const appProvided = inject('appProvided');
        const route = useRoute();
        return { isAuthenticated };
      })`
    }
  ],
  invalid: [
    {
      code: `import { defineStore } from 'pinia';
      
      const useSearchFilters = defineStore('search-filters', () => {
        const route = useRoute();
        const appProvided = inject('appProvided');
        return { route, appProvided };
      })`,
      errors: [
        {
          messageId: 'returnGlobalProperties',
          data: {
            property: 'route'
          }
        },
        {
          messageId: 'returnGlobalProperties',
          data: {
            property: 'appProvided'
          }
        }
      ]
    }
  ]
})
