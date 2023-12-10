import { defineNuxtModule } from '@nuxt/kit'
import { findWorkspaceDir } from 'pkg-types'

export interface ModuleOptions {
  placeholder?: string
  ignoreObjectPaths?: string[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-workspace',
    configKey: 'workspace'
  },
  defaults: {
    placeholder: '#workspace',
    ignoreObjectPaths: []
  },
  async setup(resolvedOptions, nuxt) {
    const placeholder = resolvedOptions.placeholder
    const ignoreObjectPaths = [
      ...(resolvedOptions.ignoreObjectPaths ?? []),
      'workspace'
    ]

    if (!placeholder)
      return

    let workspaceDir = nuxt.options.workspaceDir

    // special case: allow to use placeholder in workspaceDir option
    const placeholderIndex = workspaceDir.indexOf(placeholder)
    if (placeholderIndex !== -1) {
      const remainsDir = workspaceDir.slice(placeholderIndex + placeholder.length)
      workspaceDir = await findWorkspaceDir(nuxt.options.rootDir) + remainsDir
      nuxt.options.workspaceDir = workspaceDir
    }

    // extract config from _layers
    const layersConfigRegex = /^_layers\[\d+\]\.config\.(.*)/
    const extractConfig = (objPath: string) => {
      const matches = objPath.match(layersConfigRegex)
      if (matches)
        return matches[1]
      return objPath
    }

    const isObjectPathIgnore = (objPath: string | null) =>
      objPath !== null && ignoreObjectPaths.some(path => extractConfig(objPath) === path)

    const replacePathsFromObject = (val: any, objPath: string | null = null): any => {
      if (!val || isObjectPathIgnore(objPath))
        return val

      if (typeof val === 'string')
        return val.replace(placeholder, workspaceDir)

      if (Array.isArray(val))
        return val.map((v, i) => replacePathsFromObject(v, `${objPath}[${i}]`))

      if (typeof val === 'object') {
        Object.keys(val).forEach((key) => {
          val[key] = replacePathsFromObject(val[key], objPath === null ? key : `${objPath}.${key}`)
        })
      }

      return val
    }

    nuxt.options = replacePathsFromObject(nuxt.options)
  }
})
