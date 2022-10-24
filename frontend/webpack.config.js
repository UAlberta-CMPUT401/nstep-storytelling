const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        // Preprocess your css files
        // you can add additional loaders here (e.g. sass/less etc.)
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/@google-cloud/),
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html'),
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
