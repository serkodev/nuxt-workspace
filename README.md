# nuxt-workspace

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A Nuxt module integrating workspace paths into Nuxt config of monorepo

> [!NOTE]
> This project is in beta. Use under your own risk, but feel free to test, make pull request and improve this project.

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

After adding `nuxt-workspace` to your nuxt config modules, you can use `#workspace` as path in your `nuxt.config.ts`.

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
  }
})
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
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
