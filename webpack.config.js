const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: path.join(__dirname, './assets'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    publicPath: '/assets/',
    proxy: {
      '/': 'http://localhost:3999',
    },
  },
  module: {
    rules: [
      {
        test: /\.js.*/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
<<<<<<< HEAD
                  "targets": {
                    "node": "10"
                  }
                }
              ],
              '@babel/preset-react'
=======
                  targets: {
                    node: '10',
                  },
                },
              ],
              '@babel/preset-react',
>>>>>>> a5c2ce67321fab5c637d0d87f148eb71f86a49ae
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
        resolve: {
          extensions: ['.js', '.jsx', '.json'],
        },
      },
      {
        test: /\.(s*)css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
    ],
  },
};
