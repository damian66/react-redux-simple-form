const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {  
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "client/dist"),
    compress: true,
    port: 8080,
    hot: true,
    proxy: {
      "/api": "http://localhost:5000",
      changeOrigin: true
    }    
  },   
  plugins: [    
    new webpack.HotModuleReplacementPlugin()        
  ]
});