// .ts 配置 https://webpack.js.org/configuration/configuration-languages
import type * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// in case you run into any typescript error when configuring `devServer`
import * as path from 'path';
import { IS_DEV } from './config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const config: webpack.Configuration = {
  entry: path.resolve(__dirname, '../src/index'),
  mode: 'production',
  output: {
    clean: true,
    // publicPath: 'auto',
    path: path.resolve(__dirname, '../dist'),
    filename: IS_DEV
      ? 'js/[name].bundle.js'
      : 'js/[name].[contenthash:8].bundle.js',
    chunkFilename: IS_DEV
      ? 'js/[name].chunk.js'
      : 'js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      // assets模块是webpack5自带,不用下载
      {
        test: /\.(png|jpe?g|svg|gif|webp)$/,
        // https://webpack.docschina.org/guides/asset-modules#general-asset-type
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.css$/i,
        use: [
          // 生产模式使用 mini-css-extract-plugin 插件分离 JS/CSS 文件实现并行加载，而开发环境选择 style-loader 它可以使用多个标签将 CSS 插入到 DOM 中，并且反应会更快。
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(ts|tsx|js|mjs|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        exclude: [/node_modules/, /public/, /(.|_)min\.js$/],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'webpack react app',
      description: 'webpack react app',
      publicPath: '',
      minify: {
        removeComments: true, // 删除注释
        collapseWhitespace: true,
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true, // 压缩 HTML 中出现的 JS 代码
      },
    }),
    new friendlyErrorsWebpackPlugin(),
  ],
};

export default config;
