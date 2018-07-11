const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  buildDir: resolve(__dirname, '.nuxt'),
  dev: false,
  render: {
    resourceHints: false
  },
  modules: ['@@']
}
