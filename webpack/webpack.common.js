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
  resolve: {
    extensions: [".js", ".jsx", '.css'], //引入文件时支持省略后缀
    // alias: {
    //   "@": resolve("src"),
    //   "@common": resolve("src/common"),
    //   "@config": resolve("src/config"),
    //   "@core": resolve("src/core"),
    //   "@redux": resolve("src/redux"),
    //   "@modules": resolve("modules"),
    //   "@view": resolve("src/view"),
    // }
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules|modules|webpack/,
        loader: "babel-loader",
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