// 开发环境配置
const path = require('path');
const webpack = require('webpack');
const config = require('../config/dev.config'); // 生产环境环境变量

const merge = require('webpack-merge'); // 用于合并公共配置和特殊配置
const webpackConfig = require('./webpack.common.js');


module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: "cheap-module-eval-source-map", // 将编译打包后的代码映射回原始源代码，以便追踪程序的运行顺序；（source map 有很多[不同的选项](https://www.webpackjs.com/configuration/devtool)可用，请务必仔细阅读它们，以便可以根据需要进行配置。）
  output: {
    filename: 'app/[name].js', // 出口文件名
    path: path.resolve(__dirname, '../dist'), // 出口路径
    publicPath: '/'
  },
  plugins:[
    // 注册环境变量(许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量：)
    new webpack.DefinePlugin({
      'process.env': config
    }),
  ],
  module: {
    rules: [
      // 解析样式表
      {
        test: /\.css$/,
        use:[{loader: 'style-loader'}, {loader: 'css-loader'}]
      },
    ]
  }
});
