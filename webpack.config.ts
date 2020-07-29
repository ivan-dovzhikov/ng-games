import * as path from 'path';
import * as webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import dartSass from 'dart-sass';

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const fileName = isDev ? '[name].[hash]' : '[name].[contenthash]';

const optimization = () => {
  const config: webpack.Configuration['optimization'] = {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const webpackConfig: webpack.Configuration = {
  mode: isDev ? 'development' : 'production',
  bail: isProd,
  context: path.resolve(__dirname, 'src'),
  entry: 'main.ts',

  output: {
    filename: fileName + '.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  devtool: isDev ? 'source-map' : undefined,

  optimization: optimization(),

  devServer: {
    contentBase: 'dist',
    inline: true,
    port: 3000,
    hot: isDev,
    historyApiFallback: true,
    clientLogLevel: 'silent',
  },

  resolve: {
    extensions: ['.js', '.ts', '.json'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src'),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: isProd
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : undefined,
    }),
    new MiniCssExtractPlugin({ filename: fileName + '.css' }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'static', to: 'static' }],
    }),
    new CleanWebpackPlugin(),
  ].concat(isDev ? [new webpack.HotModuleReplacementPlugin()] : []),

  // TODO: ngtemplate-loader

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(css|scss|sass)$/,
        exclude: /node_modules/,
        use: [
          { loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'sass-loader',
            options: {
              implementation: dartSass,
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'src')],
              },
            },
          },
        ],
      },
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: ['file-loader'],
      },
    ],
  },
};

export default webpackConfig;
