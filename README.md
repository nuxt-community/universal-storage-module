# Nuxt Universal Storage Module

[![npm (scoped with tag)](https://img.shields.io/npm/v/nuxt-universal-storage/latest.svg?style=flat-square)](https://npmjs.com/package/nuxt-universal-storage)
[![npm](https://img.shields.io/npm/dt/nuxt-universal-storage.svg?style=flat-square)](https://npmjs.com/package/nuxt-universal-storage)
[![CircleCI](https://img.shields.io/circleci/project/github/alibaba-aero/nuxt-universal-storage.svg?style=flat-square)](https://circleci.com/gh/alibaba-aero/nuxt-universal-storage)
[![Codecov](https://img.shields.io/codecov/c/github/alibaba-aero/nuxt-universal-storage.svg?style=flat-square)](https://codecov.io/gh/alibaba-aero/nuxt-universal-storage)
[![Dependencies](https://david-dm.org/alibaba-aero/nuxt-universal-storage/status.svg?style=flat-square)](https://david-dm.org/alibaba-aero/nuxt-universal-storage)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

> Universal Storage Utilities for Nuxt.js based on [@nuxt-community/auth-module](https://github.com/nuxt-community/auth-module)

[📖 **Release Notes**](./CHANGELOG.md)


## Setup

- Add `nuxt-universal-storage` dependency using yarn or npm to your project
```sh
yarn add nuxt-universal-storage
```
OR
```sh
npm install nuxt-universal-storage --save
```

- Add `nuxt-universal-storage` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    'nuxt-universal-storage',
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

[MIT License](./LICENSE) - Alibaba Travels Co

