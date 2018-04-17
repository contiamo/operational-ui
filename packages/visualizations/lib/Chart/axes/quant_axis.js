"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var axis_utils_1 = require("./axis_utils");
var d3_utils_1 = require("../../utils/d3_utils");
var quant_axis_utils_1 = require("../../utils/quant_axis_utils");
var styles = require("./styles");
var stepScaleFactors = function (step) {
    return step === 1 ? [10, 5, 2, 1] : fp_1.rangeStep(0.5)(0, 10);
};
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
        this.previous = fp_1.cloneDeep(this.computed);
        var computed = this.computeInitial();
        computed.ticks = quant_axis_utils_1.computeTicks(computed.steps);
        computed.scale = quant_axis_utils_1.computeScale(computed.range, computed.ticks);
        this.computed = computed;
        this.previous = fp_1.defaults(this.computed)(this.previous);
        this.stateWriter(["computed", this.position], this.computed);
        this.stateWriter(["previous", this.position], this.previous);
    };
    QuantAxis.prototype.computeInitial = function () {
        var config = this.state.current.get("config");
        var computedChart = this.state.current.get("computed");
        var computed = {};
        computed.range = axis_utils_1.computeRange(config, computedChart, this.position);
        computed.domain = quant_axis_utils_1.computeDomain(this.data, this.start, this.end);
        computed.steps = this.computeSteps(computed);
        return computed;
    };
    // Computes nice steps (for ticks) given a domain [start, stop] and a
    // wanted number of ticks (number of ticks returned might differ
    // by a few ticks)
    QuantAxis.prototype.computeSteps = function (computed) {
        var steps = [this.start, this.end, this.interval];
        if (!this.interval) {
            var options = this.state.current.get("config")[this.position];
            var tickNumber_1 = quant_axis_utils_1.computeTickNumber(computed.range, options.tickSpacing, options.minTicks);
            var span_1 = computed.domain[1] - computed.domain[0];
            var step_1 = Math.pow(10, Math.floor(Math.log(Math.abs(span_1) / tickNumber_1) / Math.LN10)) * (span_1 < 0 ? -1 : 1);
            var scaleFactor = void 0;
            if (this.end) {
                // If a value has been explicitly set for this.end, there must be a tick at this value
                var validScaleFactors = fp_1.filter(function (val) { return (span_1 / (step_1 * val)) % 1 === 0; })(stepScaleFactors(step_1));
                // Choose scale factor which gives a number of ticks as close as possible to tickNumber
                scaleFactor = fp_1.sortBy(function (val) { return Math.abs(span_1 / (val * step_1) - tickNumber_1); })(validScaleFactors)[0];
            }
            else {
                var err = tickNumber_1 / span_1 * step_1;
                var errorMapper = [[err <= 0.15, 10], [err <= 0.35, 5], [err <= 0.75, 2], [true, 1]];
                scaleFactor = fp_1.find(0)(errorMapper)[1];
            }
            step_1 *= scaleFactor;
            steps[2] = step_1;
        }
        var computedStart = this.end % steps[2];
        computedStart = computedStart - (computedStart > computed.domain[0] ? steps[2] : 0);
        steps[0] = this.start || computedStart || Math.floor(computed.domain[0] / steps[2]) * steps[2];
        steps[1] = this.end || Math.ceil((computed.domain[1] - steps[0]) / steps[2]) * steps[2] + steps[0];
        return steps;
    };
    QuantAxis.prototype.computeAligned = function (computed) {
        this.previous = fp_1.cloneDeep(this.computed);
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
        this.el.attr("transform", "translate(" + axis_utils_1.axisPosition(this.position, this.state.current.get("computed").canvas.drawingDims).join(",") + ")");
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
            .call(d3_utils_1.setTextAttributes, fp_1.defaults(attributes)({ opacity: 1e-6 }))
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
        return fp_1.defaults(attributes)({
            x: this.isXAxis ? this.previous.scale : 0,
            y: this.isXAxis ? 0 : this.previous.scale
        });
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
    QuantAxis.prototype.close = function () {
        this.el.remove();
    };
    return QuantAxis;
}());
exports.default = QuantAxis;
//# sourceMappingURL=quant_axis.js.map