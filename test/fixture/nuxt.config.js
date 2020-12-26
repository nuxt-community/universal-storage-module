const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  buildDir: resolve(__dirname, '.nuxt'),
  dev: false,
  render: {
    resourceHints: false
  },
  plugins: [
    '~/plugins/init.js'
  ],
  modules: [
    { handler: require('../../') }
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
