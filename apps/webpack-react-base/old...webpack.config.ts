// .ts 配置 https://webpack.js.org/configuration/configuration-languages
import type * as webpack from 'webpack';
import HtmlWebpackPlugin  from 'html-webpack-plugin'
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';
import * as path from "path";


const config: webpack.Configuration = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true,
    port: 4001,
  },
  output: {
    // publicPath: "auto",
    publicPath: "./"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // https://www.webpackjs.com/loaders/bundle-loader/
      // {
      //   test: /bootstrap\.tsx$/,
      //   loader: "bundle-loader",
      //   options: {
      //     lazy: true,
      //   },
      // },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      publicPath: "./",
      title: 'home page. know how we work',
    }),
  ]
};

export default config;
