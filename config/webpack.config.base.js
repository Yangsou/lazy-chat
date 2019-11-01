const helpers = require('./helpers'),
  CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

let config = {
  entry: {
    'main': helpers.root('/src/main.ts')
  },
  output: {
    path: helpers.root('/dist2'),
    publicPath: '/',
    filename: 'js/[name].[hash].js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.html'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      root: helpers.root('/src'),
    }
  },
  module: {
    rules: [

      {
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },

      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [
          path.resolve(__dirname, '../src/index.html')
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(scss|css|sass)$/,
        use: [
          'style-loader',
          
          'css-loader',
          'sass-loader?sourceMap',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: helpers.root('/src/assets/scss/index.scss')
            }
          },
          // 'postcss-loader'
        ]
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: './assets'
    },]),
    new CopyWebpackPlugin([{
      from: 'src/manifest.json',
      to: './'
    },])
  ]
};

module.exports = config;
