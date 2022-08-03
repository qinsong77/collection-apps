"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cache_1 = require("./cache");
var eventNameSpace = 'WindowsCustomEventName';
var CustomEventName = 'CustomEventName';
var EventBus = /** @class */ (function () {
    function EventBus() {
        var _this = this;
        this.eventEmitter = {};
        window.addEventListener(CustomEventName, function (e) {
            console.log(e);
            var _a = e.detail, eventName = _a.eventName, payload = __rest(_a, ["eventName"]);
            var cbs = _this.eventEmitter[eventName];
            if (Array.isArray(cbs)) {
                cbs.forEach(function (cb) { return cb(payload); });
            }
        });
    }
    EventBus.prototype.publish = function (eventName, payload) {
        window.dispatchEvent(new CustomEvent(CustomEventName, {
            detail: __assign({ eventName: eventName }, payload),
        }));
    };
    EventBus.prototype.subscribe = function (eventName, callback, once) {
        var _this = this;
        if (!this.hasTopic(eventName)) {
            this.eventEmitter[eventName] = [];
        }
        if (once) {
            // @ts-ignore
            var onlyOnce = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.unSubscribe(eventName, callback);
                callback.apply(_this, args);
            };
            onlyOnce.origin = callback;
            this.eventEmitter[eventName].push(onlyOnce);
        }
        else
            this.eventEmitter[eventName].push(callback);
        return function () { return _this.unSubscribe(eventName, callback); };
    };
    EventBus.prototype.unSubscribe = function (eventName, callback) {
        if (this.hasTopic(eventName) && callback) {
            this.eventEmitter[eventName] = this.eventEmitter[eventName].filter(
            // @ts-ignore
            function (cb) { return cb !== callback && cb.origin !== callback; });
        }
    };
    EventBus.prototype.hasTopic = function (eventName) {
        return Array.isArray(!this.eventEmitter[eventName]);
    };
    return EventBus;
}());
var eventBus = (0, cache_1.getCache)(eventNameSpace);
if (!eventBus) {
    eventBus = new EventBus();
    (0, cache_1.setCache)(eventNameSpace, eventBus);
}
exports.default = eventBus;
