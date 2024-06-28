# Never export an initialized named or default store (`pinia/never-export-initialized-store`)

💼 This rule is enabled in the following configs: 🌐 `all`, ✅ `recommended`.

<!-- end auto-generated rule header -->

Here's the documentation for the `never-export-initialized-store` rule:

## Rule Details

This rule ensures that we never export an initialized store.

❌ Examples of **incorrect** code for this rule:

```js
// counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  return { count };
});

export const foo = useCounterStore();
```

```js
// counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  return { count };
});

export default useCounterStore();
```

✅ Examples of **correct** code for this rule:

```js
// counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  return { count };
});
```

```js
// app.vue
import { useCounterStore } from './counter.js';

const store = useCounterStore();
```

Exporting store will cause unexpected results when application uses server side rendering.

If multiple components import the same instance of useStore and modify the state, those changes will be reflected across all components because they share the same store instance.
