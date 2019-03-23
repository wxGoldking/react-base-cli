// 生产配置
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('../config/prod.config'); // 生产环境环境变量
const webpackConfig = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 打包前清理之前的文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 抽离css
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // 压缩js

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 可视化打包分析工具


module.exports = merge(webpackConfig, {
  mode: 'production',
  devtool: "#source-map", // 将编译打包后的代码映射回原始源代码，以便追踪程序的运行顺序；（source map 有很多[不同的选项](https://www.webpackjs.com/configuration/devtool)可用，请务必仔细阅读它们，以便可以根据需要进行配置。）
  output: {
    filename: 'app/[name].[hash:8].js', // 出口文件名
    path: path.resolve(__dirname, '../dist') // 出口路径
  },
  plugins:[
    // 注册环境变量
    new webpack.DefinePlugin({
      'process.env': config
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css",
      chunkFilename: "css/[name].[hash:8].css"
    }),
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin()
  ],
   // 抽离公共模块
  optimization: {
    minimizer: [
      //代码压缩插件(可有许多配置项待了解)
      new UglifyJSPlugin({
        sourceMap: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        // 默认抽离commons(一般自己配置)
        commons: {
          name: "commons", // 模块名
          chunks: "initial", // 通过chunks选项可以选择块，有3个值："initial"、"async"和"all"。分别用于选择初始块、按需加载的块和所有块
          minChunks: 2 //  最小重复次数
        },
        // 抽离react的例子
        // b: {
        //   test: /[\\/]src[\\/]/,
        //   name: 'b',
        //   chunks: 'all',
        //   enforce: true
        // },
        // 抽离react的例子
        // react: {
        //   test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        //   name: 'react',
        //   chunks: 'all',
        //   enforce: true
        // },
        default: false
      }
    }
  },
  module: {
    rules: [
      // 解析样式表
      {
        test: /\.css$/,
        use:[
          { loader: MiniCssExtractPlugin.loader }, // 使用该loader后不再需要style-loader,如果配置会报错
          { loader: 'css-loader' }
        ]
      },
    ]
  }
});
