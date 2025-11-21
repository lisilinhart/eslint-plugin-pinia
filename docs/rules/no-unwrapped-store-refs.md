# Disallow using refs from a store without unwrapping them (`pinia/no-unwrapped-store-refs`)

💼⚠️ This rule is enabled in the following configs: ✅ `recommended`, ✅ `recommended-flat`. This rule _warns_ in the following configs: 🌐 `all`, 🌐 `all-flat`.

<!-- end auto-generated rule header -->

Refs are objects that wrap a value. To access the value, you need to use the `.value` property. When using `storeToRefs` from Pinia, you get refs for the state properties of a store. This rule ensures that you always access the value of the ref and not the ref object itself.

## Rule Details

This rule aims to prevent accidental usage of ref objects instead of their values.

Examples of **incorrect** code for this rule:

```js
import { storeToRefs } from 'pinia'
import { useMyStore } from './my-store'

const myStore = useMyStore()
const { myRef } = storeToRefs(myStore)

console.log(myRef)
```

Examples of **correct** code for this rule:

```js
import { storeToRefs } from 'pinia'
import { useMyStore } from './my-store'

const myStore = useMyStore()
const { myRef } = storeToRefs(myStore)

console.log(myRef.value)
```
