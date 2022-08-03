"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cache_1 = require("./cache");
var PubSubNameSpace = 'PubSubNameSpace';
var PubSub = /** @class */ (function () {
    function PubSub() {
        this.observer = {};
    }
    PubSub.prototype.publish = function (channel, topic, payload) {
        var _a, _b;
        var cbs = (_b = (_a = this.observer) === null || _a === void 0 ? void 0 : _a[channel]) === null || _b === void 0 ? void 0 : _b[topic];
        if (Array.isArray(cbs)) {
            cbs.forEach(function (cb) { return cb(payload); });
        }
    };
    PubSub.prototype.subscribe = function (channel, topic, callback, once) {
        var _this = this;
        if (!this.hasTopic(channel, topic)) {
            if (!this.observer[channel])
                this.observer[channel] = {};
            this.observer[channel][topic] = [];
        }
        if (once) {
            // @ts-ignore
            var onlyOnce = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.unSubscribe(channel, topic, callback);
                callback.apply(_this, args);
            };
            onlyOnce.origin = callback;
            this.observer[channel][topic].push(onlyOnce);
        }
        else {
            this.observer[channel][topic].push(callback);
        }
        return function () { return _this.unSubscribe(channel, topic, callback); };
    };
    PubSub.prototype.unSubscribe = function (channel, topic, callback) {
        if (this.hasTopic(channel, topic) && callback) {
            this.observer[channel][topic] = this.observer[channel][topic].filter(
            // @ts-ignore
            function (cb) { return cb !== callback && cb.origin !== callback; });
        }
    };
    PubSub.prototype.hasTopic = function (channel, topic) {
        var _a, _b;
        return Array.isArray((_b = (_a = this.observer) === null || _a === void 0 ? void 0 : _a[channel]) === null || _b === void 0 ? void 0 : _b[topic]);
    };
    return PubSub;
}());
var pubSub = (0, cache_1.getCache)(PubSubNameSpace);
if (!pubSub) {
    pubSub = new PubSub();
    (0, cache_1.setCache)(PubSubNameSpace, pubSub);
}
exports.default = pubSub;
