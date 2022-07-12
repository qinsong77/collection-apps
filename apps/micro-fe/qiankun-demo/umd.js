(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object")
    module.exports = factory();
  else if (typeof define === "function" && define.amd) define([], factory);
  else if (typeof exports === "object") exports["MyLibrary"] = factory();
  else root["MyApp"] = factory();
})(typeof self !== "undefined" ? self : this, function () {
  return _entry_return_;
});

// (function(window, self) {
//   with(window) {
//     子应用的js代码
//   }
// }).call(代理对象, 代理对象, 代理对象)
