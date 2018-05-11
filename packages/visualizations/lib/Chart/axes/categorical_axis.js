"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var axis_utils_1 = require("./axis_utils");
var d3_utils_1 = require("../../utils/d3_utils");
var d3_scale_1 = require("d3-scale");
var styles = require("./styles");
var CategoricalAxis = /** @class */ (function () {
    function CategoricalAxis(state, stateWriter, events, el, position) {
        this.sort = true;
        this.type = "categorical";
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.position = position;
        this.isXAxis = position[0] === "x";
        this.el = axis_utils_1.insertElements(el, this.type, position, this.state.current.get("computed").canvas.drawingDims);
    }
    // Categorical axis supports everything that supports ".toString()"
    CategoricalAxis.prototype.validate = function (value) {
        return !fp_1.isNil(value);
    };
    CategoricalAxis.prototype.update = function (options, data) {
        this.data = fp_1.flow(fp_1.filter(this.validate), fp_1.map(String))(options.values || data);
    };
    // Computations
    CategoricalAxis.prototype.compute = function () {
        this.previous = fp_1.cloneDeep(this.computed);
        var config = this.state.current.get("config");
        var computedChart = this.state.current.get("computed");
        var tickWidth = this.computeTickWidth();
        var range = this.computeRange(tickWidth);
        this.computed = {
            range: range,
            ticks: this.data,
            scale: d3_scale_1.scaleBand()
                .range(range)
                .domain(this.data)
                .padding(config.innerBarPaddingCategorical),
        };
        this.previous = fp_1.defaults(this.computed)(this.previous);
        this.stateWriter(["computed", this.position], this.computed);
        this.stateWriter(["previous", this.position], this.previous);
    };
    CategoricalAxis.prototype.computeTickWidth = function () {
        var barSeries = this.state.current.get("computed").series.barSeries;
        if (fp_1.isEmpty(barSeries)) {
            return 0;
        }
        var config = this.state.current.get("config");
        var drawingDims = this.state.current.get("computed").canvas.drawingDims;
        var defaultTickWidth = (this.position[0] === "x" ? drawingDims.width / this.data.length : drawingDims.height / this.data.length) *
            (1 - config.innerBarPaddingCategorical);
        var stacks = fp_1.groupBy(function (s) { return s.stackIndex || fp_1.uniqueId("stackIndex"); })(barSeries);
        var partitionedStacks = fp_1.partition(function (stack) {
            return fp_1.compact(fp_1.map(fp_1.get("barWidth"))(stack)).length > 0;
        })(stacks);
        var fixedWidthStacks = partitionedStacks[0];
        var variableWidthStacks = partitionedStacks[1];
        var requiredTickWidth = fp_1.reduce(function (sum, stack) {
            return sum + stack[0].barWidth;
        }, config.innerBarPadding * (fp_1.keys(stacks).length - 1))(fixedWidthStacks);
        var variableBarWidth = variableWidthStacks.length > 0
            ? Math.max(config.minBarWidth, (defaultTickWidth - requiredTickWidth) / variableWidthStacks.length)
            : 0;
        requiredTickWidth =
            (requiredTickWidth + variableBarWidth * variableWidthStacks.length) / (1 - config.innerBarPaddingCategorical);
        this.stateWriter("computedBars", this.computeBarPositions(variableBarWidth, requiredTickWidth));
        return Math.max(requiredTickWidth, defaultTickWidth / (1 - config.innerBarPaddingCategorical));
    };
    CategoricalAxis.prototype.computeBarPositions = function (defaultBarWidth, tickWidth) {
        var config = this.state.current.get("config");
        var computedSeries = this.state.current.get("computed").series;
        var indices = fp_1.sortBy(fp_1.identity)(fp_1.uniq(fp_1.values(computedSeries.barIndices)));
        var offset = -tickWidth / 2;
        return fp_1.reduce(function (memo, index) {
            var seriesAtIndex = fp_1.keys(fp_1.pickBy(function (d) { return d === index; })(computedSeries.barIndices));
            var width = computedSeries.barSeries[seriesAtIndex[0]].barWidth || defaultBarWidth;
            fp_1.forEach(function (series) {
                memo[series] = { width: width, offset: offset };
            })(seriesAtIndex);
            offset = offset + width + config.innerBarPadding;
            return memo;
        }, {})(indices);
    };
    CategoricalAxis.prototype.computeRange = function (tickWidth) {
        var config = this.state.current.get("config");
        var computed = this.state.current.get("computed");
        var width = tickWidth * this.data.length;
        var offset = tickWidth / 2;
        var margin = function (axis) {
            return fp_1.includes(axis)(computed.axes.requiredAxes) ? (computed.axes.margins || {})[axis] || config[axis].margin : 0;
        };
        var range = this.position[0] === "x"
            ? [0, width || computed.canvas.drawingDims.width]
            : [
                computed.canvas.drawingDims.height || width,
                margin("x2") || config[this.position].minTopOffsetTopTick,
            ];
        var adjustedRange = [range[0] + offset, range[1] + offset];
        return adjustedRange;
    };
    // Drawing
    CategoricalAxis.prototype.draw = function () {
        this.el.attr("transform", "translate(" + axis_utils_1.axisPosition(this.position, this.state.current.get("computed").canvas.drawingDims).join(",") + ")");
        this.drawTicks();
        this.drawBorder();
        axis_utils_1.positionBackgroundRect(this.el, this.state.current.get("config").duration);
    };
    CategoricalAxis.prototype.drawTicks = function () {
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
    // Padding added only to end of each step in d3 ordinal band scale
    CategoricalAxis.prototype.scaleWithOffset = function (computed) {
        var barPadding = this.state.current.get("config").innerBarPaddingCategorical;
        var stepWidth = computed.scale.step();
        return function (d) { return computed.scale(d) - stepWidth * barPadding / 2; };
    };
    CategoricalAxis.prototype.getAttributes = function () {
        var tickOffset = this.state.current.get("config")[this.position].tickOffset;
        var scaleWithOffset = this.scaleWithOffset(this.computed);
        return {
            dx: this.isXAxis ? 0 : tickOffset,
            dy: this.isXAxis ? tickOffset : "0.35em",
            text: fp_1.identity,
            x: this.isXAxis ? scaleWithOffset : 0,
            y: this.isXAxis ? 0 : scaleWithOffset,
        };
    };
    CategoricalAxis.prototype.getStartAttributes = function (attributes) {
        var scaleWithOffset = this.scaleWithOffset(this.previous);
        return fp_1.defaults({
            x: this.isXAxis ? scaleWithOffset : 0,
            y: this.isXAxis ? 0 : scaleWithOffset,
        })(attributes);
    };
    CategoricalAxis.prototype.adjustMargins = function () {
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
    CategoricalAxis.prototype.drawBorder = function () {
        var drawingDims = this.state.current.get("computed").canvas.drawingDims;
        var border = {
            x1: 0,
            x2: this.isXAxis ? drawingDims.width : 0,
            y1: this.isXAxis ? 0 : drawingDims.height,
            y2: 0,
        };
        this.el.select("line." + styles.border).call(d3_utils_1.setLineAttributes, border);
    };
    CategoricalAxis.prototype.close = function () {
        this.el.node().remove();
    };
    return CategoricalAxis;
}());
exports.default = CategoricalAxis;
//# sourceMappingURL=categorical_axis.js.map