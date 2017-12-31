// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');

const appDirectory = path.resolve(__dirname);

module.exports = {
  context: __dirname,
  entry: ['babel-polyfill', './src/index'],
  output: {
    path: path.resolve(appDirectory, 'dist'),
    filename: 'performance.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { module: true, localIdentName: '[hash:base64:8]' }
          }
        ]
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(appDirectory, 'src'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //  analyzerMode: 'static',
    //  openAnalyzer: false
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true,
        screw_ie8: true,
        warnings: false
      }
    })
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  }
};