// 公共配置

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 动态生成html
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 打包前清理之前的文件

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js', // 出口文件名
    path: path.resolve(__dirname, 'dist') // 出口路径
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'react-base-cli'
    }),
    new CleanWebpackPlugin(['dist'])
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