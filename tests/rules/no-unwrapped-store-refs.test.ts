import { ruleTester } from '../rule-tester'
import rule, { RULE_NAME } from '../../src/rules/no-unwrapped-store-refs'

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `
        import { storeToRefs } from 'pinia';
        import { useMyStore } from './my-store';
        const myStore = useMyStore();
        const { myRef } = storeToRefs(myStore);
        console.log(myRef.value);
      `
    }
  ],
  invalid: [
    {
      code: `
        import { storeToRefs } from 'pinia';
        import { useMyStore } from './my-store';
        const myStore = useMyStore();
        const { myRef } = storeToRefs(myStore);
        console.log(myRef);
      `,
      errors: [{ messageId: 'noUnwrappedStoreRefs' }]
    }
  ]
})
