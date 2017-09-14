var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

let webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // The other plugins are added dynamically below
  ]
});

function createHtmlWebPackPlugin(filename, template, chunks = ['app']) {
  return new HtmlWebpackPlugin({
    filename: filename,
    template: template,
    inject: true,
    chunks: chunks
  });
}

// https://github.com/ampedandwired/html-webpack-plugin
if (config.pages && config.pages.length) {
  for (let page of config.pages) {
    webpackConfig.plugins.push(createHtmlWebPackPlugin(page.name, page.path, page.chunks));
  }
}
else {
  webpackConfig.plugins.push(createHtmlWebPackPlugin('index.html', 'src/templates/index.html'));
}

webpackConfig.plugins.push(new FriendlyErrorsPlugin());

module.exports = webpackConfig;
