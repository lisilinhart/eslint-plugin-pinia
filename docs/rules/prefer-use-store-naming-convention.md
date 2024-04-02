# Enforces the convention of naming stores with the prefix `use` followed by the store name and suffixed with `Store` (`pinia/prefer-use-store-naming-convention`)

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧💡 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) and manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Options

* `checkStoreNameMismatch`: If set to true (default), it checks if the name inside use'name'Store matches the unique identifier passed to `defineStore`. If set to false, it only checks if the store name starts with `use` and ends with `Store`.
  
<!-- begin auto-generated rule options list -->

| Name                     | Type    | Default |
| :----------------------- | :------ | :------ |
| `checkStoreNameMismatch` | Boolean | `true`  |

<!-- end auto-generated rule options list -->

## Rule Details

❌ Examples of **incorrect** code for this rule:

```js
export const counterStore = defineStore('counter', () => {
  const count = ref(0)
  return { count }
})

export const useCounter = defineStore('counter', () => {
  const count = ref(0)
  return { count }
})

// when checkStoreNameMismatch is true
export const useCounterStore = defineStore('number', () => {
  const count = ref(0)
  return { count }
})
```

✅ Examples of **correct** code for this rule:

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  return { count }
})
```
