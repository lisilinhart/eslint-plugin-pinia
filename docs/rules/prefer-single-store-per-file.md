# Encourages defining each store in a separate file (`pinia/prefer-single-store-per-file`)

🚫 This rule is _disabled_ in the following configs: 🌐 `all`, `all-flat`.

<!-- end auto-generated rule header -->

Here's the documentation for the `prefer-single-store-per-file` rule:

## Rule Details

This rule encourages defining each store in a separate file. Mixing multiple store definitions in a single file can lead to confusion and make the code harder to maintain.

❌ Examples of **incorrect** code for this rule:

```js
// stores.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  return { count }
})

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])
  return { todos }
})
```

✅ Examples of **correct** code for this rule:

```js
// counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  return { count }
})
```

```js
// todo.js
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])
  return { todos }
})
```

Separating each store into its own file enhances code organization and readability, making it easier to understand and maintain.