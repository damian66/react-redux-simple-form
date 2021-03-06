const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './client/src/app.js'
  ],
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js'
  },  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env', 'babel-preset-react', 'babel-preset-stage-2'],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        //loader: 'style-loader!css-loader'
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?localIdentName=""'
      }),
      },
      {
        test: /\.module\.css$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]"'
        }),
      },      
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),    
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: "./client/src/index.template.ejs",
      hash: true     
    })
  ]
};