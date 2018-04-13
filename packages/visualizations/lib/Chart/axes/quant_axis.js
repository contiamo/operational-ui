"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var axis_utils_1 = require("./axis_utils");
var d3_utils_1 = require("../../utils/d3_utils");
var quant_axis_utils_1 = require("../../utils/quant_axis_utils");
var styles = require("./styles");
var QuantAxis = /** @class */ (function () {
    function QuantAxis(state, stateWriter, events, el, position) {
        this.type = "quant";
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.position = position;
        this.isXAxis = position[0] === "x";
        this.el = axis_utils_1.insertElements(el, position, this.state.current.get("computed").canvas.drawingDims);
        // this.el.on("mouseenter", this.onComponentHover(this))
    }
    // Quant axis only supports finite numbers
    QuantAxis.prototype.validate = function (value) {
        return fp_1.isFinite(value);
    };
    QuantAxis.prototype.updateOptions = function (options) {
        this.start = options.start;
        this.end = options.end;
        this.interval = options.interval;
    };
    QuantAxis.prototype.update = function (options, data) {
        this.updateOptions(options);
        this.data = fp_1.filter(this.validate)(data);
    };
    // Computations
    QuantAxis.prototype.compute = function () {
        this.previous = this.computed;
        var computed = this.computeInitial();
        computed.ticks = quant_axis_utils_1.computeTicks(computed.steps);
        computed.scale = quant_axis_utils_1.computeScale(computed.range, computed.ticks);
        this.computed = computed;
        this.previous = fp_1.defaults(this.previous)(this.computed);
        this.stateWriter(["computed", this.position], this.computed);
        this.stateWriter(["previous", this.position], this.previous);
    };
    QuantAxis.prototype.computeInitial = function () {
        var config = this.state.current.get("config");
        var computedChart = this.state.current.get("computed");
        var options = this.state.current.get("config")[this.position];
        var computed = {};
        computed.range = axis_utils_1.computeRange(config, computedChart, this.position);
        computed.domain = quant_axis_utils_1.computeDomain(this.data, this.start, this.end);
        computed.steps = quant_axis_utils_1.computeSteps(computed.domain, computed.range, options.tickSpacing, options.minTicks);
        return computed;
    };
    QuantAxis.prototype.computeAligned = function (computed) {
        this.previous = this.computed;
        computed.domain = computed.steps.slice(0, 2);
        computed.scale = quant_axis_utils_1.computeScale(computed.range, computed.domain);
        computed.ticks = quant_axis_utils_1.computeTicks(computed.steps);
        this.computed = computed;
        this.previous = fp_1.defaults(this.previous)(this.computed);
        this.stateWriter(["computed", this.position], this.computed);
        this.stateWriter(["previous", this.position], this.previous);
    };
    // Drawing
    QuantAxis.prototype.draw = function () {
        this.drawTicks();
        this.drawBorder();
        axis_utils_1.positionBackgroundRect(this.el, this.state.current.get("config").duration);
    };
    QuantAxis.prototype.drawTicks = function () {
        var config = this.state.current.get("config");
        var attributes = this.getAttributes();
        var startAttributes = this.getStartAttributes(attributes);
        var ticks = this.el
            .selectAll("text." + styles.tick + "." + styles[this.position])
            .data(this.computed.ticks, String);
        ticks
            .enter()
            .append("svg:text")
            .call(d3_utils_1.setTextAttributes, startAttributes)
            .merge(ticks)
            .attr("class", styles.tick + " " + styles[this.position])
            .call(d3_utils_1.setTextAttributes, attributes, config.duration);
        ticks
            .exit()
            .transition()
            .duration(config.duration)
            .call(d3_utils_1.setTextAttributes, fp_1.defaults({ opacity: 1e6 })(attributes))
            .remove();
        this.adjustMargins();
    };
    QuantAxis.prototype.adjustMargins = function () {
        var computedMargins = this.state.current.get("computed").axes.margins || {};
        var config = this.state.current.get("config")[this.position];
        var requiredMargin = axis_utils_1.computeRequiredMargin(this.el, computedMargins, config, this.position);
        // Add space for flags
        var hasFlags = fp_1.includes(this.position)(this.state.current.get("computed").series.axesWithFlags);
        requiredMargin = requiredMargin + (hasFlags ? this.state.current.get("config").axisPaddingForFlags : 0);
        if (computedMargins[this.position] === requiredMargin) {
            return;
        }
        computedMargins[this.position] = requiredMargin;
        this.stateWriter("margins", computedMargins);
        this.events.emit("margins:update", this.isXAxis);
        this.el.attr("transform", "translate(" + axis_utils_1.axisPosition(this.position, this.state.current.get("computed").canvas.drawingDims).join(",") + ")");
    };
    QuantAxis.prototype.tickFormatter = function () {
        var _this = this;
        var numberFormatter = this.state.current.get("config").numberFormatter;
        var unitTick = this.isXAxis ? this.computed.ticks[0] : fp_1.last(this.computed.ticks);
        return function (x) { return (x === unitTick && _this.unit ? _this.unit : numberFormatter(x)); };
    };
    QuantAxis.prototype.getAttributes = function () {
        var tickOffset = this.state.current.get("config")[this.position].tickOffset;
        return {
            dx: this.isXAxis ? 0 : tickOffset,
            dy: this.isXAxis ? tickOffset : "-0.4em",
            text: this.tickFormatter(),
            x: this.isXAxis ? this.computed.scale : 0,
            y: this.isXAxis ? 0 : this.computed.scale
        };
    };
    QuantAxis.prototype.getStartAttributes = function (attributes) {
        return fp_1.defaults({
            x: this.isXAxis ? this.previous.scale : 0,
            y: this.isXAxis ? 0 : this.previous.scale
        })(attributes);
    };
    QuantAxis.prototype.drawBorder = function () {
        var drawingDims = this.state.current.get("computed").canvas.drawingDims;
        var border = {
            x1: 0,
            x2: this.isXAxis ? drawingDims.width : 0,
            y1: this.isXAxis ? 0 : drawingDims.height,
            y2: 0
        };
        this.el.select("line." + styles.border).call(d3_utils_1.setLineAttributes, border);
    };
    QuantAxis.prototype.remove = function () { };
    return QuantAxis;
}());
exports.default = QuantAxis;
//# sourceMappingURL=quant_axis.js.map