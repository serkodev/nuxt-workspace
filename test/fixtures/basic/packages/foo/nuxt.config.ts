import MyModule from '../../../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule
  ],
  components: [
    { path: '#workspace/packages/bar/components' },
    { path: '#workspace/share/components' }
  ],
  typescript: {
    tsConfig: {
      include: [
        '#workspace/*.d.ts',
      ],
      compilerOptions: {
        ignoreTest: '#workspace'
      }
    }
  },
  app: {
    head: {
      title: '#workspace' // test ignore replace
    }
  },
  workspace: {
    ignoreObjectPaths: [
      'typescript.tsConfig.compilerOptions',
      'app.head.title'
    ]
  },
})
