# Enforces the convention of naming stores with the prefix `use` followed by the store name (`pinia/prefer-use-store-naming-convention`)

⚠️ This rule _warns_ in the 🌐 `all` config.

<!-- end auto-generated rule header -->

## Options

- `checkStoreNameMismatch`: If set to true (default), it checks if the name inside use'name'Store matches the unique identifier passed to `defineStore`. If set to false, it only checks if the store name starts with `use` and ends with `Store`.
- `storeSuffix`: Can be configured to enforce the ending names of your store names. For example if it's configured to `Store`, it would warn if the store is not ending with the suffix, like `useNumberStore` would be valid, but `useNumber` would be invalid.
  
<!-- begin auto-generated rule options list -->

| Name                     | Type    | Default |
| :----------------------- | :------ | :------ |
| `checkStoreNameMismatch` | Boolean | `false` |
| `storeSuffix`            | String  | ``      |

<!-- end auto-generated rule options list -->

## Rule Details

❌ Examples of **incorrect** code for this rule:

```js
export const counterStore = defineStore('counter', () => {
  const count = ref(0)
  return { count }
})

export const numberService = defineStore('number', () => {
  const number = ref(0)
  return { number }
})

// when checkStoreNameMismatch is true
export const useCounter = defineStore('number', () => {
  const count = ref(0)
  return { count }
})
```

✅ Examples of **correct** code for this rule:

```js
export const useCounter = defineStore('counter', () => {
  const count = ref(0)
  return { count }
})

// when checkStoreNameMismatch is'false'
export const useCounter = defineStore('number', () => {
  const count = ref(0)
  return { count }
})

// when storeSuffix is 'Service'
export const useCounterService = defineStore('counter', () => {
  const count = ref(0)
  return { count }
})
```
