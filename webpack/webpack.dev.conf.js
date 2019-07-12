// 开发环境配置
const path = require('path');
const webpack = require('webpack');
const config = require('../config'); // 生产环境环境变量
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT);

const merge = require('webpack-merge'); // 用于合并公共配置和特殊配置
const webpackConfig = require('./webpack.common.js');


module.exports = merge(webpackConfig, {
  mode: config.dev.mode,
  devtool: config.dev.devtool, // 将编译打包后的代码映射回原始源代码，以便追踪程序的运行顺序；（source map 有很多[不同的选项](https://www.webpackjs.com/configuration/devtool)可用，请务必仔细阅读它们，以便可以根据需要进行配置。）
  output: {
    filename: 'app/[name].js', // 出口文件名
    path: path.resolve(__dirname, '../dist'), // 出口路径
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist',
    inline: true, // 自动刷新(开启热模块替换时也要开启)
    hot: true, // 是否开启热模块替换（改为true 配合react-hot-loader）
    historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    host: HOST || config.dev.host,
    port: PORT || config.dev.port, //如果省略，默认8080
    publicPath: config.dev.assetsPublicPath,
    open: true, // 自动开启浏览器
    proxy: {
      '/v4': {
        target: 'https://api.jinse.com', // 接口的域名
        secure: false,  // 如果是https接口，需要配置这个参数
        progress: true,
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        // logLevel: 'debug'
        // target: 'https://api.jinse.com',
        // changeOrigin: true,
        // secure: false
      }
    }
  },
  plugins:[
    // 注册环境变量(许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量：)
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
  ],
  module: {
    rules: [
      // 解析样式表
      {
        test: /\.css$/,
        use:[
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          // { loader: "postcss-loader" }
        ]
      },
    ]
  }
});
