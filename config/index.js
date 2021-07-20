'use strict'

const path = require('path');

module.exports = {
  dev: {
    env: require('./dev.env'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    mode:'development',
    host: '127.0.0.1', // can be overwritten by process.env.HOST
    port: 8000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    cssSourceMap: false,// 是否开启 cssSourceMap
    devtool: 'cheap-module-eval-source-map',
    proxyTable: {}, // 需要 proxyTable 代理的接口（可跨域）
    //导入变量
    externals:{}
  },

  build: {
    env: require('./prod.env'), // 使用 config/prod.env.js 中定义的编译环境
    index: path.resolve(__dirname, '../dist/index.html'), // 编译输入的 index.html 文件
    mode: 'production',
    assetsRoot: path.resolve(__dirname, '../dist'), // 编译输出的静态资源路径
    assetsSubDirectory: 'react-base-cli/static', // 编译输出的二级目录
    assetsPublicPath: '/react-base-cli', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名 类似http://127.0.0.1:8765/
    productionSourceMap: false, // 是否开启 cssSourceMap
    productionGzip: false, // 是否开启 gzip
    devtool: '#source-map',
    productionGzipExtensions: ['js', 'css'], // 需要使用 gzip 压缩的文件扩展名
    externals:{}
  }
}