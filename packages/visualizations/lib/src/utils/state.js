"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var getPath = function (obj, path) {
    return path.reduce(function (current, property) {
        if (current !== null && typeof current === "object") {
            return current[property];
        }
        else {
            throw new Error("Path [" + path.join(", ") + "] not found in object");
        }
    }, obj);
};
var setPath = function (obj, path, value) {
    path.reduce(function (current, property, index) {
        if (current !== null && typeof current === "object") {
            if (index === path.length - 1) {
                current[property] = value;
            }
            return current[property];
        }
        else {
            throw new Error("Path [" + path.join(", ") + "] not found in object");
        }
    }, obj);
};
var mergePath = function (obj, path, value) {
    return path.reduce(function (current, property, index) {
        if (current !== null && typeof current === "object") {
            if (index === path.length - 1) {
                current[property] = __assign({}, current[property], value);
            }
            return current[property];
        }
        else {
            throw new Error("Path [" + path.join(", ") + "] not found in object");
        }
    }, obj);
};
var State = /** @class */ (function () {
    function State(obj) {
        if (obj === void 0) { obj = {}; }
        this.state = lodash_1.cloneDeep(obj);
    }
    State.prototype.get = function (path) {
        return getPath(this.state, [].concat(path));
    };
    State.prototype.set = function (path, value) {
        return setPath(this.state, [].concat(path), value);
    };
    State.prototype.merge = function (path, value) {
        if (value === void 0) { value = {}; }
        return mergePath(this.state, [].concat(path), value);
    };
    State.prototype.clone = function () {
        return new State(this.state);
    };
    return State;
}());
exports.default = State;
//# sourceMappingURL=state.js.map