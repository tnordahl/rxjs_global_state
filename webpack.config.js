const webpack = require("webpack");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', "./src/client/index.js"],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    },
    ]
  },

  // resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    // publicPath: "/dist/",
    filename: "bundle.js",
     chunkFilename: '[name].bundle.js',
  },

  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: isDevelopment, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    },
    mangleWasmImports: true,
    concatenateModules: true,
    usedExports: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  //   new HtmlWebpackPlugin({
  //   title: 'Custom template',
  //   // Load a custom template (lodash by default)
  //   template: 'src/markup/index.html'
  // }),
    // new MiniCssExtractPlugin({
    //   filename: isDevelopment ? '[name].css' : '[name].[hash].css',
    //   chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    // }),
    // new BundleAnalyzerPlugin()
  ]
};
