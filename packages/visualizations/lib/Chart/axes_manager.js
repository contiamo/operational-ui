"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axis_1 = require("./axes/axis");
var rules_1 = require("../Chart/axes/rules");
var fp_1 = require("lodash/fp");
var axis_utils_1 = require("./axes/axis_utils");
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
        var _this = this;
        var config = this.state.current.get("config");
        var computedMargins = this.state.current.get("computed").axes.onMarginsUpdated;
        if (!computedMargins) {
            this.stateWriter("margins", {});
        }
        computedMargins = computedMargins || {};
        fp_1.forEach(function (axis) {
            if (!computedMargins[axis]) {
                _this.stateWriter(["margins", axis], config[axis].margin + config.axisPaddingForFlags);
            }
        })(this.state.current.get("computed").series.axesWithFlags);
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
    };
    AxesManager.prototype.createOrUpdate = function (options, position) {
        var data = this.state.current.get("computed").series.dataForAxes[position];
        var existing = this.axes[position];
        existing ? this.update(position, options) : this.create(position, options);
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
    AxesManager.prototype.drawAxes = function (orientation) {
        var axes = fp_1.pickBy(function (axis) {
            return orientation === "x" ? axis.isXAxis : !axis.isXAxis;
        })(this.axes);
        fp_1.keys(axes).length === 2 ? axis_utils_1.alignAxes(axes) : fp_1.forEach(fp_1.invoke("compute"))(axes);
        fp_1.forEach(fp_1.invoke("draw"))(axes);
        // Update rules
        var hasRules = fp_1.includes("quant")(fp_1.map(function (axis) { return axis.type; })(axes));
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