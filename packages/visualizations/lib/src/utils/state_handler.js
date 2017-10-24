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
var state_1 = require("./state");
var fp_1 = require("lodash/fp");
var defaultChartStateObj = {
    data: [],
    config: {},
    accessors: {},
    computed: {},
};
var StateHandler = /** @class */ (function () {
    function StateHandler(obj) {
        if (obj === void 0) { obj = {}; }
        var initial = new state_1.State(__assign({}, defaultChartStateObj, obj));
        this.state = { current: initial, previous: initial.clone() };
    }
    StateHandler.prototype.captureState = function () {
        this.state.previous.set(["computed"], this.state.current.clone().get("computed"));
    };
    StateHandler.prototype.readOnly = function () {
        return {
            current: this.state.current.readOnly(),
            previous: this.state.previous.readOnly(),
        };
    };
    // Data
    StateHandler.prototype.data = function (data) {
        if (!arguments.length)
            return this.state.current.get("data");
        return this.state.current.set("data", data);
    };
    StateHandler.prototype.hasData = function () {
        return fp_1.isEmpty(this.data());
    };
    // Config
    StateHandler.prototype.config = function (config) {
        if (!arguments.length)
            return this.state.current.get("config");
        return this.state.current.merge("config", config);
    };
    // Accessors
    StateHandler.prototype.accessors = function (type, accessors) {
        if (!accessors)
            return this.state.current.get(["accessors", type]);
        return this.state.current.merge(["accessors", type], accessors);
    };
    // Computed
    StateHandler.prototype.computedWriter = function (namespace) {
        var _this = this;
        return function (path, value) {
            _this.state.current.set(["computed"].concat(namespace).concat(path), value);
        };
    };
    return StateHandler;
}());
exports.default = StateHandler;
//# sourceMappingURL=state_handler.js.map