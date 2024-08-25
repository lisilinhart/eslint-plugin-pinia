# In setup stores all state properties must be exported (`pinia/require-setup-store-properties-export`)

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

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
})

```

✅ Examples of **correct** code for this rule:

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const obj = reactive({ count })
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, obj }
})
```
