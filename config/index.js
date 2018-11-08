'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
// 检测环境，node,webpack,es的版本，保证环境不出错

const path = require('path')

module.exports = {
  dev: {
    env: require('./dev.env'),
    // Various Dev Server settings
    host: 'localhost',
    port: 8888, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/': {
        target: 'http://192.168.0.104:8888/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    cssSourceMap: false
  },

  build: {
    env: require('./prod.env'),
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    // Paths
    port: 9000,
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
