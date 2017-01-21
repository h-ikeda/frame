/*eslint-env node */

var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
  context: __dirname + '/src',
  entry: "./entry.js",
  output: {
    path: __dirname + '/dist',
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      title:"Frame | 1stop-st.org",
      favicon:"favicon.ico",
      minify:{
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true
      }
    }),
    new HtmlWebpackExternalsPlugin([
      {
        name: 'jquery',
        var: 'jQuery',
        url: 'https://cdn.jsdelivr.net/jquery/3.1.1/jquery.min.js'
      },
      {
        name: 'three',
        var: 'THREE',
        url: 'https://cdn.jsdelivr.net/threejs/0.0.0-r74/three.min.js'
      },
      {
        name: 'w2ui',
        var: 'w2ui',
        url: 'https://cdn.jsdelivr.net/w2ui/1.4.3/w2ui.min.js'
      },
      {
        name: 'firebase',
        var: 'firebase',
        url: 'https://www.gstatic.com/firebasejs/3.3.0/firebase.js'
      },
      {
        name: 'w2ui.css',
        url: 'https://cdn.jsdelivr.net/w2ui/1.4.3/w2ui.min.css'
      }
    ])
  ]
};