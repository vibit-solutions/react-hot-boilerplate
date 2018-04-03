const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const PORT = process.env.PORT || 8000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const HOST = 'http://localhost';
const buildPath = 'build';
const publicPath = `${HOST}:${PORT}/`;

const webpackConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    './src/styles.scss',
    './src/client',
  ],
  output: {
    filename: 'static/bundle.js',
    path: path.resolve(__dirname, buildPath),
    publicPath,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: [
      '*',
      '.js',
      '.jsx',
    ],
  },
  devServer: {
    open: true,
    hot: true,
    index: 'index.html',
    port: 8000,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js(x?)$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: 'file-loader?name=static/[hash].[ext]',
      },
      {
        test: /\.js(x?)$/,
        use: 'babel-loader',
        include: /src/,
      },
      {
        test: /\.(s?)css$/,
        use: IS_PRODUCTION
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: { minimize: true },
              },
              'postcss-loader',
              'sass-loader',
            ],
          }) : [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

if (IS_PRODUCTION) {
  webpackConfig.stats = true;
  webpackConfig.devtool = false;
  webpackConfig.entry.shift();
  webpackConfig.plugins = [
    new ProgressBarPlugin(),
    new CleanWebpackPlugin([buildPath]),
    new ExtractTextPlugin({
      filename: 'static/styles.css',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      parallel: true,
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Boilerplate',
      template: 'index.jst',
    }),
  ];
}

module.exports = webpackConfig;
