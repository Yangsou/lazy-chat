const helpers = require('./helpers'),
  webpackConfig = require('./webpack.config.base'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  DefinePlugin = require('webpack/lib/DefinePlugin'),
  env = require('../environment/dev.env');

webpackConfig.mode = 'development';
webpackConfig.module.rules = [
  ...webpackConfig.module.rules,
];

webpackConfig.plugins = [
  ...webpackConfig.plugins,
  new HtmlWebpackPlugin({
    inject: true,
    template: helpers.root('/src/index.html'),
    favicon: helpers.root('/src/favicon.ico')
  }),
  new DefinePlugin({
    'process.env': env
  })
];

webpackConfig.devServer = {
  port: 7777,
  host: 'localhost',
  publicPath: 'http://localhost:7777',
  historyApiFallback: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  contentBase: './src',
  open: true,
  disableHostCheck: true
};

module.exports = webpackConfig;
