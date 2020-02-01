# Nuxt Universal Storage Module

[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/universal-storage/latest.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/universal-storage)
[![npm](https://img.shields.io/npm/dt/@nuxtjs/universal-storage.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/universal-storage)
[![CircleCI](https://img.shields.io/circleci/project/github/nuxt-community/universal-storage-module.svg?style=flat-square)](https://circleci.com/gh/nuxt-community/universal-storage-module)
[![Codecov](https://img.shields.io/codecov/c/github/nuxt-community/universal-storage-module.svg?style=flat-square)](https://codecov.io/gh/nuxt-community/universal-storage-module)
[![Dependencies](https://david-dm.org/nuxt-community/universal-storage-module/status.svg?style=flat-square)](https://david-dm.org/nuxt-community/universal-storage-module)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

> Universal Storage Utilities for Nuxt.js based on [@nuxt-community/auth-module](https://github.com/nuxt-community/auth-module)

[📖 **Release Notes**](./CHANGELOG.md)


## Setup

- Add `@nuxtjs/universal-storage` dependency using yarn or npm to your project
```sh
yarn add @nuxtjs/universal-storage
```
OR
```sh
npm install @nuxtjs/universal-storage --save
```

- Add `@nuxtjs/universal-storage` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    '@nuxtjs/universal-storage',
  ],

  storage: {

  }
}
```

## Usage

### Options

Options are defined as following:
```js
 storage: {
  vuex, // boolean or {namespace}
  localStorage, // boolean or {prefix }
  cookie, // boolean or {prefix, options }
  initialState,  // Object {}
  ignoreExceptions //
 }
```
and default to
```js
 {
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
  ignoreExceptions: false,
}
```

### Full synchronise on start with initialState as default

Since version 0.4.0 this module allows full state synchronisation with cookies, localstorage and initialstate as a default value. That allows for a very neat usage pattern:
For example, if I have an initialState like the following in Nuxt config:

```
  storage: {
    initialState: { testParam: false }
  }
```
then in my component I can simply declare (with decorators)
```
  @State(s => s.storage.testParam)
  testParam
```  
or  (with mapState)
```
  computed: mapState({
    testParam: s => s.storage.testParam
    })
```    
then I get computed property `testParam` with whatever value it had on my last session and on change I just fire `this.$storage.setUniversal("testParam", newVal)` to get value saved.


### Hidden settings (private state)
 
>   Private state is suitable to keep information not being exposed to Vuex store
>   This helps prevent stealing token from SSR response HTML
   
If key name starts with `_` then that  setting is kept in separate in memory storage and not exposed to Vuex store like the rest.
For example:
```js
   $storage.setState("_password","alpha1")`
```

### Api 
  
* `$storage.getUniversal(key)`
* `$storage.setUniversal(key, value)`
* `$storage.syncUniversal(key, defaultValue)`
* `$storage.removeUniversal(key)`
* `$storage.getState(key)`
* `$storage.setState(key, value)`
* `$storage.removeState(key)`
* `$storage.watchState(key, fn)`
* `$storage.getLocalStorage(key)`
* `$storage.setLocalStorage(key, value)`
* `$storage.removeLocalStorage(key)`
* `$storage.getCookies()`
* `$storage.getCookie(key)`
* `$storage.setCookie(key, value)`
* `$storage.removeCookie(key)`

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `yarn run dev` or `npm run dev`
- Point your browser to `http://localhost:3000`

## Roadmap

- Add Encryption
- Complete Documents
- Universal Session Handling

## License

[MIT License](./LICENSE)

