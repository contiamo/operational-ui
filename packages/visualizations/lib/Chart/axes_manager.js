"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axis_1 = require("./axes/axis");
var rules_1 = require("../Chart/axes/rules");
var fp_1 = require("lodash/fp");
var axis_utils_1 = require("./axes/axis_utils");
var xAxisConfig = {
    margin: 14,
    minTicks: 2,
    tickSpacing: 65,
    outerPadding: 3,
};
var yAxisConfig = {
    margin: 34,
    minTicks: 4,
    minTopOffsetTopTick: 21,
    tickSpacing: 40,
    outerPadding: 3,
};
var axisConfig = {
    x1: fp_1.assign({ tickOffset: 12 })(xAxisConfig),
    x2: fp_1.assign({ tickOffset: -4 })(xAxisConfig),
    y1: fp_1.assign({ tickOffset: -4 })(yAxisConfig),
    y2: fp_1.assign({ tickOffset: 4 })(yAxisConfig),
};
var AxesManager = /** @class */ (function () {
    function AxesManager(state, stateWriter, events, els) {
        this.axes = {};
        this.oldAxes = {};
        this.rules = {};
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.els = els;
        this.events.on("margins:updated", this.onMarginsUpdated.bind(this));
    }
    AxesManager.prototype.draw = function () {
        this.updateAxes();
        fp_1.forEach(fp_1.invoke("close"))(this.oldAxes);
        fp_1.forEach(this.drawAxes.bind(this))(["y", "x"]);
    };
    AxesManager.prototype.updateMargins = function () {
        var defaultMargins = {
            x1: xAxisConfig.margin,
            x2: xAxisConfig.margin,
            y1: yAxisConfig.margin,
            y2: yAxisConfig.margin,
        };
        var computedMargins = fp_1.defaults(defaultMargins)(this.state.current.get("computed").axes.margins || {});
        this.stateWriter("margins", computedMargins);
    };
    AxesManager.prototype.updateAxes = function () {
        this.stateWriter("previous", {});
        this.stateWriter("computed", {});
        this.axesDrawn = [];
        var axesOptions = this.state.current.get("accessors").data.axes(this.state.current.get("data"));
        // Remove axes that are no longer needed, or whose type has changed
        var axesToRemove = fp_1.omitBy(function (axis, key) {
            return !axesOptions[key] || axesOptions[key].type === axis.type;
        })(this.axes);
        fp_1.forEach.convert({ cap: false })(this.removeAxis.bind(this))(axesToRemove);
        // Create or update currently required axes
        fp_1.forEach.convert({ cap: false })(this.createOrUpdate.bind(this))(axesOptions);
        this.setBaselines();
        this.stateWriter("requiredAxes", fp_1.keys(this.axes));
        this.stateWriter("priorityTimeAxis", this.priorityTimeAxis());
    };
    AxesManager.prototype.createOrUpdate = function (options, position) {
        var fullOptions = fp_1.defaults(axisConfig[position])(options);
        var data = this.state.current.get("computed").series.dataForAxes[position];
        var existing = this.axes[position];
        existing ? this.update(position, fullOptions) : this.create(position, fullOptions);
    };
    AxesManager.prototype.create = function (position, options) {
        var el = this.els[position[0] + "Axes"];
        var axis = new axis_1.default(this.state, this.stateWriter, this.events, el, options.type, position);
        this.axes[position] = axis;
        this.update(position, options);
    };
    AxesManager.prototype.update = function (position, options) {
        var data = this.state.current.get("computed").series.dataForAxes[position];
        this.axes[position].update(options, data);
    };
    AxesManager.prototype.setBaselines = function () {
        var xType = (this.axes.x1 || this.axes.x2).type;
        var yType = (this.axes.y1 || this.axes.y2).type;
        var baseline = xType === "quant" && yType !== "quant" ? "y" : "x";
        this.stateWriter("baseline", baseline);
    };
    AxesManager.prototype.priorityTimeAxis = function () {
        var _this = this;
        return fp_1.find(function (axis) { return _this.axes[axis] && _this.axes[axis].type === "time"; })(this.state.current.get("config").timeAxisPriority);
    };
    AxesManager.prototype.drawAxes = function (orientation) {
        var axes = fp_1.pickBy(function (axis) {
            return orientation === "x" ? axis.isXAxis : !axis.isXAxis;
        })(this.axes);
        fp_1.keys(axes).length === 2 ? axis_utils_1.alignAxes(axes) : fp_1.forEach(fp_1.invoke("compute"))(axes);
        fp_1.forEach(fp_1.invoke("draw"))(axes);
        // Update rules
        var hasRules = fp_1.any(function (axis) { return axis.showRules; })(axes);
        hasRules ? this.updateRules(orientation) : this.removeRules(orientation);
        this.axesDrawn.push(orientation);
    };
    AxesManager.prototype.onMarginsUpdated = function (isXAxis) {
        var axesToUpdate = isXAxis ? "y" : "x";
        if (fp_1.includes(axesToUpdate)(this.axesDrawn)) {
            this.drawAxes(axesToUpdate);
        }
    };
    AxesManager.prototype.updateRules = function (orientation) {
        var rules = this.rules[orientation] || new rules_1.default(this.state, this.els[orientation + "Rules"], orientation);
        this.rules[orientation] = rules;
        rules.draw();
    };
    AxesManager.prototype.removeRules = function (orientation) {
        var rules = this.rules[orientation];
        if (!rules) {
            return;
        }
        rules.close();
        delete this.rules[orientation];
    };
    AxesManager.prototype.removeAxis = function (axis, position) {
        this.oldAxes[position] = axis;
        this.axes[position] = null;
    };
    return AxesManager;
}());
exports.default = AxesManager;
//# sourceMappingURL=axes_manager.js.map