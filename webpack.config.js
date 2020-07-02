const webpack = require("webpack");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const path = require('path');

const isDevelopment = process.env.NODE_ENV === 'development'
const mode = 'development'; // isDevelopment ? 'development' : 'production';

module.exports = {
  entry: isDevelopment
  ? ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', "./src/client/index.tsx"]
  : ["./src/client/index.tsx"],
  mode,
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.js",
    chunkFilename: '[name].bundle.js',
    publicPath: '',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              // only enable hot in development
                hmr: isDevelopment,
                // if hmr does not work, this is a forceful method.
                reloadAll: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },

          'postcss-loader',
          'sass-loader',
        ],
      },
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss'],
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
    // splitChunks: {
    //   cacheGroups: {
    //     styles: {
    //       name: 'styles',
    //       test: /\.(sa|sc|c)ss$/,
    //       chunks: 'all',
    //       enforce: true,
    //     },
    //   },
    // },
    // runtimeChunk: {
    //   name: entrypoint => `runtime~${entrypoint.name}`
    // },
    mangleWasmImports: true,
    concatenateModules: true,
    usedExports: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isDevelopment ? 'main.css' : 'main.css',
    }),
    // new BundleAnalyzerPlugin()
  ]
};
