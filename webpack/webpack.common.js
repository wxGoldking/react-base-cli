// 公共配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 动态生成html

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, '../src/index.js'),
    ]
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
      {
        test:/(\.jsx|\.js)$/,
        loader: 'babel-loader', // 加载器
        exclude: /node_modules/,
      },
    ]
  }
}