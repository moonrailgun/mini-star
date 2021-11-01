/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './capital/src/index.ts',
  devtool: 'cheap-module-source-map', // for debug
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // For css
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx', // Or 'ts' if you don't need tsx
          target: 'es2015',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Plugin Template',
      inject: true,
      hash: true,
    }),
  ],
};
