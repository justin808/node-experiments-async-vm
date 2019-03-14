const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  mode: 'development',
  entry: './src/fetchHnTopStories',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  target: 'async-node'
};
