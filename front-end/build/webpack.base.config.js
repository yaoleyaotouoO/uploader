const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  const currentPath = path.join(__dirname, "../");
  const basePath = currentPath + '.env';
  const envPath = basePath + '.' + env.ENVIRONMENT;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    context: path.join(__dirname, "../src"),
    resolve: {
      modules: [path.join(__dirname, "../src"), "node_modules"],
      alias: {
        "@business": path.join(__dirname, "../src/business"),
        "@common": path.join(__dirname, "../src/common"),
        "@containers": path.join(__dirname, "../src/containers"),
        "@store": path.join(__dirname, "../src/store"),
        '@components': path.join(__dirname, '../src/components'),
        "@http": path.join(__dirname, "../src/common/utils/http.ts")
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".less"]
    },
    entry: {
      index: 'index.tsx'
    },
    externals: [
      {
        moment: 'moment'
      }
    ],
    output: {
      filename: "[name].js",
      chunkFilename: 'chunks/[name].[chunkhash].js',
    },
    module: {
      rules: [
        {
          test: /(\.js)|(\.jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["react", "es2015", "stage-0", "mobx"],
            plugins: ["transform-runtime"]
          }
        },
        {
          test: /(\.ts)|(\.tsx)$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"]
        },
        {
          test: /\.less$/,
          use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
        },
        {
          test: /\.(png|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
          loader: "url-loader",
          options: {
            limit: 50000,
            name: "react/sources/images/[name].[ext]"
          }
        }
      ]
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new ForkTsCheckerWebpackPlugin({
        tsconfig: path.join(__dirname, '../tsconfig.json')
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require("../dist/dll/vendor-manifest.json")
      }),
      new HtmlWebpackPlugin({
        hash: true,
        inject: true,
        chunks: ['index'],
        template: 'index.html',
        filename: 'index.html'
      }),
      new webpack.DefinePlugin(envKeys)
    ]
  }
}