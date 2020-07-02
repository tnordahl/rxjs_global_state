const nodeExternals = require('webpack-node-externals');
const path = require('path');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  context: srcPath,
  mode: 'development',
  entry: './server/index.tsx',
  output: {
    path: distPath,
    filename: 'server.js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                name: '/assets/images/[name].[ext]',
              },
            },
          },
          {
            loader: 'image-webpack-loader',
          }],
      },
      {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    },



    ],
  },
  externals: nodeExternals(),
  devtool: 'source-map',
};
