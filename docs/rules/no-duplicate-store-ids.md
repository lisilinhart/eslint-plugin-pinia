# Disallow duplicate store ids (`pinia/no-duplicate-store-ids`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Rule Details

❌ Examples of **incorrect** code for this rule:

```js
// a.js
export const useBarStore = defineStore('bar', () => {
  const bar = ref(0)

  return { bar }
})

// b.js
export const useAnotherBarStore = defineStore('bar', () => {
  const foo = ref(0)

  return { foo }
})
```

```js
export const useBarStore = defineStore('bar', () => {
  const bar = ref(0)

  return { bar }
})

export const useAnotherBarStore = defineStore('bar', () => {
  const foo = ref(0)

  return { foo }
})
```

✅ Examples of **correct** code for this rule:

```js
export const useBarStore = defineStore('bar', () => {
  const bar = ref(0)

  return { bar }
})

export const useAnotherCounterStore = defineStore('foo', () => {
  const foo = ref(0)

  return { foo }
})
```
