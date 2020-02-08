const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = (env) => merge(baseConfig(env), {
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    host: "localhost",
    compress: true,
    // port: 8095,
    port: 8081
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "source-map-loader"
      },
    ]
  },
});