"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("./state");
var fp_1 = require("lodash/fp");
var StateHandler = /** @class */ (function () {
    function StateHandler(obj) {
        if (obj === void 0) { obj = {}; }
        var initial = new state_1.default(obj);
        this.state = { current: initial, previous: initial.clone() };
    }
    StateHandler.prototype.captureState = function () {
        this.state.previous = this.state.current.clone();
    };
    StateHandler.prototype.data = function (data) {
        if (!arguments.length)
            return this.state.current.get("data");
        return this.state.current.set("data", data);
    };
    StateHandler.prototype.config = function (config) {
        if (!arguments.length)
            return this.state.current.get("config");
        return this.state.current.merge("config", config);
    };
    StateHandler.prototype.accessors = function (type, accessors) {
        if (!accessors)
            return this.state.current.get(["accessors", type]);
        return this.state.current.merge(["accessors", type], accessors);
    };
    StateHandler.prototype.computed = function (path) {
        return this.state.current.get(["computed"].concat(path));
    };
    StateHandler.prototype.hasData = function () {
        return fp_1.isEmpty(this.data());
    };
    StateHandler.prototype.readOnly = function () {
        return {
            current: this.state.current.state,
            previous: this.state.previous.state,
        };
    };
    StateHandler.prototype.setComputed = function (path, value) {
        return this.state.current.set(["computed"].concat(path), value);
    };
    StateHandler.prototype.writer = function (path) {
        var _this = this;
        return function (propertyPath, value) {
            var fullPath = path.concat(propertyPath);
            _this.setComputed(fullPath, value);
        };
    };
    return StateHandler;
}());
exports.default = StateHandler;
//# sourceMappingURL=state_handler.js.map