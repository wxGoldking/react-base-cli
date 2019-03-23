// 公共配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 动态生成html

module.exports = {
  output: {
    filename: 'app/[name].js', // 出口文件名
    path: path.resolve(__dirname, '../dist') // 出口路径
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename: 'index.html', 
      template: 'index.html', //本地自定义模板
      inject: true
    }),
  ],
  module: {
    rules: [
     
    ]
  }
}