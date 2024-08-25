import { resolve } from 'path'
import { it } from 'vitest'
import { execa } from 'execa'

const target = resolve(__dirname, '..', 'fixtures')

it.concurrent('fixtures/no-duplicate-store-ids', { fails: true }, async () => {
  await execa('npx', ['eslint', 'no-duplicate-store-ids'], {
    cwd: target,
    stdio: 'pipe'
  })
})
