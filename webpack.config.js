const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './capital/src/index.ts',
  devtool: 'cheap-module-source-map', // for debug
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    port: 5566,
    contentBase: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Plugin Template',
      inject: true,
      hash: true,
    }),
  ],
};
