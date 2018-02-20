const webpack = require('webpack');

const PORT = process.env.PORT || 8000;
const publicPath = `http://localhost:${PORT}/build/`;

const webpackConfig = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    './src/styles.scss',
    './src/client',
  ],
  output: {
    filename: 'bundle.js',
    path: '/build',
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
    hot: true,
    index: 'index.html',
    port: 8000,
    publicPath,
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
        use: 'file-loader',
      },
      {
        test: /\.js(x?)$/,
        use: 'babel-loader',
      },
      {
        test: /\.(s?)css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = webpackConfig;
