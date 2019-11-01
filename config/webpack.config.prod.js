const glob = require('glob'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  PurifyCSSPlugin = require('purifycss-webpack'),
  FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
  webpackConfig = require('./webpack.config.base'),
  helpers = require('./helpers'),
  DefinePlugin = require('webpack/lib/DefinePlugin');

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});

const purifyCss = new PurifyCSSPlugin({
  paths: glob.sync(path.join(__dirname, '../src/**/*.html')),
  purifyOptions: {
    info: true,
    whitelist: []
  }
});

webpackConfig.mode = 'production';

webpackConfig.module.rules = [
  ...webpackConfig.module.rules
];

// ensure ts lint fails the build
webpackConfig.module.rules[0].options = {
  failOnHint: true
};

module.exports = (env) => {
  console.log(`=================== -SYSTEM START DEPLOY WITH ENV ${env} =================`);
  let environment = require(`../environment/${env}.env`);
  webpackConfig.plugins = [
    ...webpackConfig.plugins,
    extractSass,
    purifyCss,
    new HtmlWebpackPlugin({
      inject: true,
      template: helpers.root('/src/index.html'),
      favicon: helpers.root('/src/favicon.ico'),
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true
      // }
    }),
    new DefinePlugin({
      'process.env': environment
    }),
  ];
  return webpackConfig;
}
