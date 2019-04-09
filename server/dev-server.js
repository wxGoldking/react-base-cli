'use strict'
// 一般只在开发环境配置，提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)，只需配置webpack设置，并为其添加运行脚本

const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.dev.conf.js');
const config = require('../config');
const webpack = require('webpack');

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT);

const options = {  
  contentBase: './dist',  
  inline: false, // 自动刷新
  hot: false, // 是否开启热模块替换（若要开启，只改为true是不够的）
  historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
  host: HOST || config.dev.host,
  port: PORT || config.dev.port, //如果省略，默认8080
  publicPath: config.dev.assetsPublicPath,
  open: config.dev.autoOpenBrowser, // 自动开启浏览器
};

WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);

const compiler = webpack(webpackConfig);
webpackConfig.entry.app.unshift(`webpack-dev-server/client?http://${options.host}:${options.port}`);

const server = new WebpackDevServer(compiler, options);

server.listen(options.port, 'localhost', () => {  console.log('dev server listening on port ', options.port);});