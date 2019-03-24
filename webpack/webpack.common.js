// 公共配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 动态生成html
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    // 拷贝静态资源
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ],
  module: {
    rules: [
      {
        test:/(\.jsx|\.js)$/,
        loader: 'babel-loader', // 加载器
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|ico)$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        // options: {
        //   limit: 100
        // }
      }
    ]
  }
}