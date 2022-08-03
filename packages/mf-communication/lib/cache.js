"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCache = exports.setCache = void 0;
var namespace = 'Module_Federation_Cache';
var setCache = function (key, value) {
    if (!window[namespace]) {
        window[namespace] = {};
    }
    window[namespace][key] = value;
};
exports.setCache = setCache;
var getCache = function (key) {
    var globalCache = window[namespace];
    return globalCache && globalCache[key] ? globalCache[key] : null;
};
exports.getCache = getCache;
