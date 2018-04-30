"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var fp_1 = require("lodash/fp");
var State = /** @class */ (function () {
    function State(obj) {
        var _this = this;
        this.get = function (path) {
            return _this.getPath([].concat(path));
        };
        this.state = lodash_1.cloneDeep(obj);
    }
    State.prototype.set = function (path, value) {
        return this.setPath([].concat(path), value);
    };
    State.prototype.merge = function (path, value) {
        if (value === void 0) { value = {}; }
        return this.mergePath([].concat(path), value);
    };
    State.prototype.readOnly = function () {
        return { get: this.get };
    };
    State.prototype.clone = function () {
        // State object will be deep-cloned in constructor
        return new State(this.state);
    };
    State.prototype.getPath = function (path) {
        return path.reduce(function (currentStateChunk, currentPath) {
            if (currentStateChunk !== null && typeof currentStateChunk === "object") {
                return currentStateChunk[currentPath];
            }
            throw new Error("Path [" + path.join(", ") + "] not found in object");
        }, this.state);
    };
    State.prototype.setPath = function (path, value) {
        path.reduce(function (currentStateChunk, currentPath, index) {
            if (currentStateChunk !== null && typeof currentStateChunk === "object") {
                if (index === path.length - 1) {
                    currentStateChunk[currentPath] = value;
                }
                return currentStateChunk[currentPath];
            }
            throw new Error("Path [" + path.join(", ") + "] not found in object");
        }, this.state);
    };
    State.prototype.mergePath = function (path, value) {
        return path.reduce(function (currentStateChunk, currentPath, index) {
            if (currentStateChunk !== null && typeof currentStateChunk === "object") {
                if (index === path.length - 1) {
                    currentStateChunk[currentPath] = fp_1.defaults(currentStateChunk[currentPath])(value);
                }
                return currentStateChunk[currentPath];
            }
            throw new Error("Path [" + path.join(", ") + "] not found in object");
        }, this.state);
    };
    return State;
}());
exports.default = State;
//# sourceMappingURL=state.js.map