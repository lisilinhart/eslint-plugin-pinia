# Disallow duplicate store ids (`pinia/no-duplicate-store-ids`)

💼⚠️ This rule is enabled in the following configs: ✅ `recommended`, `recommended-flat`. This rule _warns_ in the following configs: 🌐 `all`, `all-flat`.

<!-- end auto-generated rule header -->

> [!IMPORTANT]
>
> Since ESLint is based on a single file check and the store IDs are not associated with each other.
>
> This rule may not prompt an error under the VSCode plugin, but it works fine in the CLI.

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
