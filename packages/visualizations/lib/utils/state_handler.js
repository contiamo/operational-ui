"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("./state");
var fp_1 = require("lodash/fp");
var StateHandler = /** @class */ (function () {
    function StateHandler(obj) {
        var initial = new state_1.default(obj);
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
        var invalidOptions = fp_1.reduce.convert({ cap: false })(function (memo, value, key) {
            if (!value && value !== false) {
                memo.push(key);
            }
            return memo;
        }, [])(config);
        fp_1.forEach(function (option) {
            console.warn("Warning: invalid config option '" + option + ": reverting to default.");
        })(invalidOptions);
        return this.state.current.merge("config", config);
    };
    // Accessors
    StateHandler.prototype.accessors = function (type, accessors) {
        if (!accessors)
            return this.state.current.get(["accessors", type]);
        var accessorFuncs = fp_1.reduce.convert({ cap: false })(function (memo, accessor, key) {
            memo[key] = typeof accessor === "function" ? accessor : function () { return accessor; };
            return memo;
        }, {})(accessors);
        return this.state.current.merge(["accessors", type], accessorFuncs);
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