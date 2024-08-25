# Disallows returning globally provided properties from Pinia stores (`pinia/no-store-to-refs-in-store`)

💼⚠️ This rule is enabled in the ✅ `recommended` config. This rule _warns_ in the 🌐 `all` config.

<!-- end auto-generated rule header -->

## Rule Details

When stores are cross used, whichever store gets its use... called first will exists as a placeholder in the other store until its own setup function returns. That's why storeToRefs() do not work there and should be avoided altogether with cross used stores.

❌ Examples of **incorrect** code for this rule:

```js
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', () => {
  const { user } = storeToRefs(useUserStore())
  const list = ref([])

  const summary = computed(() => {
    return `Hi ${user.name}, you have ${list.value.length} items in your cart. It costs ${price.value}.`
  })

  function purchase() {
    return apiPurchase(user.id, this.list)
  }

  return { summary, purchase }
})
```

✅ Examples of **correct** code for this rule:

```js
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', () => {
  const { user } = useUserStore()
  const list = ref([])

  const summary = computed(() => {
    return `Hi ${user.name}, you have ${list.value.length} items in your cart. It costs ${price.value}.`
  })

  function purchase() {
    return apiPurchase(user.id, this.list)
  }

  return { summary, purchase }
})

```
