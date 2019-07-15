const { resolve } = require('path')

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

module.exports = async function module (moduleOptions) {
  const options = Object.assign(defaults, this.options.storage, moduleOptions)

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'storage/plugin.js',
    options
  })

  this.addTemplate({
    src: resolve(__dirname, 'storage.js'),
    fileName: 'storage/storage.js',
    options
  })
}
