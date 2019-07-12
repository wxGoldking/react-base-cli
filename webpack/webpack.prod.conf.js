// 生产配置
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('../config'); // 生产环境环境变量
const webpackConfig = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 打包前清理之前的文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 抽离css
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // 压缩js

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 可视化打包分析工具


module.exports = merge(webpackConfig, {
  mode: config.build.mode,
  devtool: config.build.devtool, // 将编译打包后的代码映射回原始源代码，以便追踪程序的运行顺序；（source map 有很多[不同的选项](https://www.webpackjs.com/configuration/devtool)可用，请务必仔细阅读它们，以便可以根据需要进行配置。）
  output: {
    path: config.build.assetsRoot, // 出口路径
    filename: config.build.assetsSubDirectory + '/js/[name].[hash:8].js', // 出口文件名
    publicPath: config.build.assetsPublicPath // 为所有的资源引用设定根目录，方便为静态资源设置CDN，但对背景图片路径似乎无效
  },
  plugins:[
    // 注册环境变量
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),
    new MiniCssExtractPlugin({
      filename: config.build.assetsSubDirectory + '/css/[name].[hash:8].css',
      chunkFilename: config.build.assetsSubDirectory + '/css/[name].[hash:8].css',
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
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   publicPath: '/cdn/static/'
            // }
          }, // 使用该loader后不再需要style-loader,如果配置会报错
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1// 查询参数 importLoaders，用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader。
            }
           },
          { loader: "postcss-loader" }  //追加样式兼容前缀
        ]
      },
    ]
  }
});
