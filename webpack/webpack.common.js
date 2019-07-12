// 公共配置
const path = require('path');
const config = require('../config'); // 生产环境环境变量
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 动态生成html
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}


module.exports = function (mode) {
  return {
    entry: {
      app: [
        path.resolve(__dirname, '../src/index.js'),
      ]
    },
    resolve: {
      extensions: [".js", ".jsx", '.css'], //引入文件时支持省略后缀
      alias: {
        "@": resolve('src'),
        "@images": resolve('src/images'),
        // "@config": resolve("src/config"),
        // "@core": resolve("src/core"),
        // "@redux": resolve("src/redux"),
        // "@modules": resolve("modules"),
        // "@view": resolve("src/view"),
      }
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
          exclude: /node_modules/,
          loader: 'babel-loader', // 加载器
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|ico)$/,
          exclude: /node_modules/,
          loader: 'url-loader',
          options: {
            limit: 1024,  //是把小于500B的文件打成Base64的格式，写入JS
            name: 'static/[name]_[hash:7].[ext]',
          }
        }
      ]
    }
  }
}