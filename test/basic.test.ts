import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, useTestContext, $fetch } from '@nuxt/test-utils'
import { join } from 'node:path'

describe('basic', async () => {
  const basicFixturesPath = fileURLToPath(new URL('./fixtures/basic', import.meta.url))

  await setup({
    rootDir: join(basicFixturesPath, 'packages/foo'),
    nuxtConfig: {
      workspaceDir: basicFixturesPath,
    }
  })

  it('replace workspace path', () => {
    const options = useTestContext().nuxt?.options!
    expect(options.typescript.tsConfig.include).toContain(join(basicFixturesPath, '*.d.ts'))
    expect((options.components as any).dirs[0].path).toContain(join(basicFixturesPath, 'packages/bar/components'))
  })

  it('ignore replace workspace path', () => {
    const options = useTestContext().nuxt?.options!
    expect(options.typescript.tsConfig.compilerOptions!.ignoreTest).toEqual('#workspace')
  })

  it('resolve workspace components', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('<div>Basic The Bar</div>')
    expect(html).toContain('<div>Basic The Share</div>')
  })
})
