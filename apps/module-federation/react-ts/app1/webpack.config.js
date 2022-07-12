/* eslint @typescript-eslint/no-var-requires: "off" */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    // https://juejin.cn/post/7018819372969885710,
    // contentBase是静态资源所在的路径，比如我们的模板index.html所在的路径，默认为项目根目录。
    // contentBase: path.join(__dirname, "dist"),
    static: {
      directory: path.join(__dirname, "./dist"),
    },
    port: 3001,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
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
    new ModuleFederationPlugin({
      name: "app1",
      filename: "remoteEntryApp1.js",
      exposes: {
        "./Button": "./src/Button",
      },
      remotes: {
        app2: "app2@http://localhost:3002/remoteEntryApp2.js",
      },
      shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
