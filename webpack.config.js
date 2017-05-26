const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['latest']
          }
        }
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]?[hash].[ext]',
            outputPath: 'asset/img/'
          }
        }
      }
    ]
  },
  entry: {
    main: './src/asset/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'asset/js/[name][chunkhash].js'
  },
  plugins: [
    new webpack.BannerPlugin('Copyright © 2017 - Pengfei Qian'),
    new ExtractTextPlugin('asset/css/[name][chunkhash].css'),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      favicon: './src/asset/img/icon.jpg',
      chunks: ['main']
    })
  ]
}
