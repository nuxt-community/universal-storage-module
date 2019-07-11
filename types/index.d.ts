import Vue from 'vue'
import { CookieSerializeOptions } from 'cookie'

export interface NuxtStorage {
  getUniversal(key: string): any
  setUniversal(key: string, value: any): void
  syncUniversal(key: string, value: any): void
  removeUniversal(key: string): void

  getState(key: string): any
  setState(key: string, value: any): void
  removeState(key: string): void
  watchState(key: string, fn: Function): void

  getLocalStorage(key: string): any
  setLocalStorage(key: string, value: any): void
  removeLocalStorage(key: string): void

  getCookies(): { [key: string]: string }
  getCookie(key: string): any
  setCookie(key: string, value: any, options?: CookieSerializeOptions): void
  removeCookie(key: string, options?: CookieSerializeOptions): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $storage: NuxtStorage
  }
}

declare module '@nuxt/vue-app' {
  interface Context {
    $storage: NuxtStorage
  }
  interface NuxtAppOptions {
    $storage: NuxtStorage
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $storage: NuxtStorage
  }
  interface NuxtAppOptions {
    $storage: NuxtStorage
  }
}
