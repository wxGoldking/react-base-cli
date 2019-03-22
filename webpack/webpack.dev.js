// 开发环境配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 动态生成html
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 打包前清理之前的文件

module.exports = {
  mode: 'development',
  entry: {
    app: [
      `webpack-dev-server/client?http://127.0.0.1:${8888}`,
      path.resolve(__dirname, '../src/index.js'),
    ]
  },
  output: {
    filename: 'bundle.js', // 出口文件名
    path: path.resolve(__dirname, '../dist') // 出口路径
  },
  devtool: 'inline-source-map', // 将编译打包后的代码映射回原始源代码，以便追踪程序的运行顺序；（source map 有很多[不同的选项](https://www.webpackjs.com/configuration/devtool)可用，请务必仔细阅读它们，以便可以根据需要进行配置。）
  plugins:[
    new HtmlWebpackPlugin({
      filename: 'index.html', 
      template: 'index.html', //本地自定义模板
      inject: true
    }),
    new CleanWebpackPlugin()
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
}