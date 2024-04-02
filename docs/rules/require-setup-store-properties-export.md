# In setup stores all state properties must be exported (`pinia/require-setup-store-properties-export`)

💼⚠️ This rule is enabled in the ✅ `recommended` config. This rule _warns_ in the 🌐 `all` config.

<!-- end auto-generated rule header -->

## Rule Details

❌ Examples of **incorrect** code for this rule:

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { doubleCount }
})

```

✅ Examples of **correct** code for this rule:

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { cound, doubleCount, increment }
})
```
