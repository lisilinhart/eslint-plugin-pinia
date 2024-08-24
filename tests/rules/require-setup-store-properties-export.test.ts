import rule, {
  RULE_NAME
} from '../../src/rules/require-setup-store-properties-export'
import { ruleTester } from '../rule-tester'

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `export const useCounterStore = defineStore('counter', () => {
    })`,
    `export const useCounterStore = defineStore('counter', () => {
      const count = ref(0)
      const something = 'Something'
      const obj = reactive({ count })
      const doubleCount = computed(() => count.value * 2)
      function increment() {
        count.value++
      }
    
      return { count, something, obj }
    })`,
    `export const useCounterStore = defineStore('counter', {
      state: () => ({ count: 0, name: 'Eduardo' }),
      getters: {
        doubleCount: (state) => state.count * 2,
      },
      actions: {
        increment() {
          this.count++
        },
      },
    })`,
    `export const useCounterStore = defineStore('counter', () => {
      const count = ref(0)
      const something = 'Something'
      const obj = reactive({ count })
      const doubleCount = computed(() => count.value * 2)
      function increment() {
        count.value++
      }
    
      return { count, something, obj, doubleCount, increment }
    })`,
    // https://github.com/lisilinhart/eslint-plugin-pinia/issues/52
    `export const useRouteScrollBehaviorStore = defineStore('routeScrollBehavior', () => {
      const scrollBehavior = ref<RouterScrollBehavior>();
      const set = (callback: RouterScrollBehavior) => {
        scrollBehavior.value = callback;
        onUnmounted(() => { scrollBehavior.value = undefined });
      };

      return { get: scrollBehavior, set };
    });`
  ],
  invalid: [
    {
      code: `export const useCounterStore = defineStore('counter', () => {
        const count = ref(0)
        const something = 'Something'
        const obj = reactive({ count })
        const doubleCount = computed(() => count.value * 2)
        function increment() {
          count.value++
        }
      
        return { increment }
      })`,
      errors: [
        {
          messageId: 'missingVariables',
          data: { variableNames: 'count, obj' }
        }
      ]
    },
    {
      code: `export const useCounterStore = defineStore('counter', () => {
        const count = ref(0)
        const name = ref('Eduardo')
        const doubleCount = computed(() => count.value * 2)
        function increment() {
          count.value++
        }
      })`,
      errors: [
        {
          messageId: 'missingVariables',
          data: { variableNames: 'count, name' }
        }
      ]
    }
  ]
})
