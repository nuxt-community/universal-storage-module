import type { NuxtConfig } from '@nuxt/types'
import storageModule from '../../src/module'

export default <NuxtConfig> {
  buildModules: ['@nuxt/typescript-build'],
  plugins: [
    '~/plugins/init.js'
  ],
  modules: [
    storageModule
  ],
  storage: {
    cookie: {
      prefix: '',
      options: {
        path: '/',
        expires: new Date()
      }
    }
  }
}
