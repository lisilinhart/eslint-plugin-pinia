# Disallows returning globally provided properties from Pinia stores (`pinia/no-return-global-properties`)

💼⚠️ This rule is enabled in the following configs: ✅ `recommended`, `recommended-flat`. This rule _warns_ in the following configs: 🌐 `all`, `all-flat`.

<!-- end auto-generated rule header -->

## Rule Details

This rule ensures that Pinia stores do not return globally provided properties like those obtained through functions like useRoute or inject. Accessing these properties directly within components is the recommended practice.

❌ Examples of **incorrect** code for this rule:

```js
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { inject } from 'vue'

const useSearchFilters = defineStore('search-filters', () => {
  const route = useRoute()
  const appProvided = inject('appProvided')
  return { route, appProvided }
})
```

✅ Examples of **correct** code for this rule:

```js
import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const route = useRoute()
  return { count }
})

const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const appProvided = inject('appProvided')
  return { isAuthenticated }
})
```
