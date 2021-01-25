import type { Module } from '@nuxt/types'
import defu from 'defu'
export type { NuxtStorage } from './types'

const defaults = {
  vuex: {
    namespace: 'storage'
  },
  cookie: {
    prefix: '',
    options: {
      path: '/'
    }
  },
  localStorage: {
    prefix: ''
  },
  ignoreExceptions: false
}

type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]>; }
export type Options = typeof defaults
export type Config = DeepPartial<Options>

declare module '@nuxt/types' {
  interface Configuration {
    storage?: Config
  }
}

export default <Module<Config>> function module (moduleOptions) {
  const { nuxt } = this

  const options: Options = defu({
    ...moduleOptions,
    ...this.options.storage
  }, defaults)

  this.addPlugin({
    src: require.resolve('./runtime/plugin'),
    fileName: 'storage.js',
    options
  })

  nuxt.options.alias['~storage'] = require.resolve('./runtime/storage')
  nuxt.options.build.transpile.push(__dirname, '@nuxtjs/universal-storage')
}
