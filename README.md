# Nuxt Workspace

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A Nuxt module integrating workspace paths into Nuxt config of monorepo

> [!NOTE]
> This project is in beta. Use under your own risk, but feel free to test, make pull request and improve this project.

## Features

- Seamless integration of `#workspace` in any path of the Nuxt config
- Customizable placeholder option to suit your needs
- Ability to selectively exclude specific configurations from being replaced

## Why

Nuxt originally provides a [`typescript.includeWorkspace`](https://nuxt.com/docs/api/nuxt-config#includeworkspace) config, but it only includes all workspace files. This can cause interference between different packages in a monorepo, preventing the completion of [`typecheck`](https://nuxt.com/docs/api/commands/typecheck).

After using this `nuxt-workspace` module, you can use `#workspace/*.d.ts` in the `typescript.tsConfig.include` configuration to customize the workspace pattern you want to include and also you can also use it in all other Nuxt configuration areas.

## Setup

```bash
# Using pnpm
pnpm add -D nuxt-workspace

# Using yarn
yarn add --dev nuxt-workspace

# Using npm
npm install --save-dev nuxt-workspace
```

## Usage

After adding `nuxt-workspace` to your nuxt config modules, you can use `#workspace` as path in your `nuxt.config.ts`. It will auto replace the placeholder with the [`workspaceDir`](https://nuxt.com/docs/api/nuxt-config#workspacedir).

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-workspace'
  ],
  typescript: {
    tsConfig: {
      include: [
        '#workspace/*.d.ts'
      ],
    },
  },
  components: [
    { path: '#workspace/packages/foo/components' }
  ]
})
```

## Configuration

You can configure Nuxt Workspace with the `workspace` property in your nuxt.config file.

### `placeholder`

- Type: `string`
- Default: `#workspace`

Allows you to customize the placeholder used for workspace path substitution.

```ts
export default defineNuxtConfig({
  workspace: {
    placeholder: '@my-workspace'
  },
  // Now you can use to `@my-workspace` in your config
  typescript: {
    tsConfig: {
      include: [
        '@my-workspace/*.d.ts'
      ]
    }
  }
})
```

### `ignoreObjectPaths`

- Type: `string[]`
- Default: `[]`

Allows you to selectively exclude specific configurations from being replaced.

```ts
export default defineNuxtConfig({
  workspace: {
    ignoreObjectPaths: [
      'app.head.title'
    ]
  },
  app: {
    head: {
      title: '#workspace' // this config will not been replaced
    }
  }
})
```

Ignore object paths with Object or Array

```ts
export default defineNuxtConfig({
  workspace: {
    ignoreObjectPaths: [
      'foo.someArray[1]',
      'foo.someObject',
    ]
  },
  foo: {
    someArray: [
      '#workspace/foo',
      '#workspace/bar', // ignore replacement
    ],

    // ignore replacement for all configs in this object
    someObject: {
      'foo': '#workspace',
      'bar': '#workspace',
    }
  },
})
```

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint

# Run Vitest
pnpm run test
pnpm run test:watch

# Release new version
pnpm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-workspace/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-workspace

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-workspace.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-workspace

[license-src]: https://img.shields.io/npm/l/nuxt-workspace.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-workspace

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
