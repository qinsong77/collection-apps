const { name } = require('./package.json');
console.log(name)

module.exports = {
  webpack: function override(config, env) {
    // config.entry = config.entry.filter(
    //   (e) => !e.includes('webpackHotDevClient')
    // );

    config.output.library = `${name}-[name]`
    config.output.libraryTarget = "umd"
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`
    config.output.globalObject = "window"
    // config.output.publicPath = "http://localhost:8014/subapp/sub-cra-latest/"
    return config;
  },
  devServer: (config) => {
    config.headers = {  // 允许跨域
      "Access-Control-Allow-Origin": "*"
    }
    return config
  },
};
