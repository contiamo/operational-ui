"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.subscribers = {};
    }
    EventEmitter.prototype.on = function (eventName, callback) {
        this.subscribers[eventName] = this.subscribers[eventName] || [];
        this.subscribers[eventName].push(callback);
    };
    EventEmitter.prototype.removeListener = function (eventName, callback) {
        if (!this.subscribers[eventName]) {
            return;
        }
        this.subscribers[eventName] = this.subscribers[eventName].filter(function (cb) { return cb !== callback; });
    };
    EventEmitter.prototype.removeAllListeners = function (eventName) {
        this.subscribers[eventName] = [];
    };
    EventEmitter.prototype.emit = function (eventName, eventData) {
        if (eventData === void 0) { eventData = {}; }
        if (!this.subscribers[eventName]) {
            return;
        }
        this.subscribers[eventName].forEach(function (subscriber) {
            subscriber(eventData);
        });
    };
    EventEmitter.prototype.removeAll = function () {
        this.subscribers = {};
    };
    return EventEmitter;
}());
exports.default = EventEmitter;
//# sourceMappingURL=event_bus.js.map