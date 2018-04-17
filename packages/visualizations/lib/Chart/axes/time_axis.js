"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var axis_utils_1 = require("./axis_utils");
var d3_utils_1 = require("../../utils/d3_utils");
var Moment = require("moment");
var moment_range_1 = require("moment-range");
var moment = moment_range_1.extendMoment(Moment);
var d3_scale_1 = require("d3-scale");
var d3_time_1 = require("d3-time");
var d3_time_format_1 = require("d3-time-format");
var styles = require("./styles");
// @TODO - add in more options
// Have removed "now", and any formatting to account for change in month/year
var tickFormatter = function (interval) {
    switch (interval) {
        case "hour":
            return d3_time_format_1.timeFormat("%b %d %H:00");
        case "day":
            return d3_time_format_1.timeFormat("%b %d");
        case "week":
            return d3_time_format_1.timeFormat("W%W");
        case "month":
            return d3_time_format_1.timeFormat("%b %y");
        case "quarter":
            return function (d) { return d3_time_format_1.timeFormat("Q" + Math.floor((d.getMonth() + 3) / 3) + " %Y")(d); };
        case "year":
            return d3_time_format_1.timeFormat("%Y");
        default:
            throw new Error("Interval of length " + interval + " is not supported.");
    }
};
var TimeAxis = /** @class */ (function () {
    function TimeAxis(state, stateWriter, events, el, position) {
        this.isXAxis = true;
        this.type = "time";
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        if (position === "y1" || position === "y2") {
            throw new Error("Time axis must be horizontal");
        }
        this.position = position;
        this.el = axis_utils_1.insertElements(el, position, this.state.current.get("computed").canvas.drawingDims);
        // this.el.on("mouseenter", this.onComponentHover(this))  }
    }
    TimeAxis.prototype.validate = function (value) {
        return fp_1.isDate(value);
    };
    TimeAxis.prototype.updateOptions = function (options) {
        this.start = options.start;
        this.end = options.end;
        this.interval = options.interval;
        if (!this.start || !this.end || !this.interval) {
            throw new Error("Values for `start`, `end` and `interval` must always be configured for time axes.");
        }
    };
    TimeAxis.prototype.update = function (options, data) {
        this.updateOptions(options);
        this.data = fp_1.flow(fp_1.filter(this.validate), fp_1.sortBy(function (value) { return value.valueOf(); }))(data);
    };
    // Computations
    TimeAxis.prototype.compute = function () {
        this.previous = fp_1.cloneDeep(this.computed);
        var computed = this.computeInitial();
        computed.tickNumber = this.computeTickNumber(computed.ticksInDomain, computed.range);
        computed.scale = this.computeScale(computed.range, computed.ticksInDomain);
        computed.ticks = this.computeTicks(computed);
        this.computed = computed;
        this.previous = fp_1.defaults(this.computed)(this.previous);
        this.stateWriter(["computed", this.position], this.computed);
        this.stateWriter(["previous", this.position], this.previous);
    };
    TimeAxis.prototype.computeInitial = function () {
        var ticksInDomain = Array.from(moment.range(this.start, this.end).by(this.interval));
        var computed = {};
        computed.ticksInDomain = fp_1.map(function (d) { return d.toDate(); })(ticksInDomain);
        computed.tickWidth = this.computeTickWidth(computed.ticksInDomain);
        computed.range = this.computeRange(computed.tickWidth, computed.ticksInDomain.length);
        return computed;
    };
    TimeAxis.prototype.computeTickWidth = function (ticksInDomain) {
        var barSeries = this.state.current.get("computed").series.barSeries;
        if (fp_1.isEmpty(barSeries)) {
            return 0;
        }
        var config = this.state.current.get("config");
        var drawingDims = this.state.current.get("computed").canvas.drawingDims;
        var defaultTickWidth = drawingDims.width / ticksInDomain.length;
        var stacks = fp_1.groupBy("stackIndex")(barSeries);
        var partitionedStacks = fp_1.partition(function (stack) {
            return fp_1.compact(fp_1.map(fp_1.get("barWidth"))(stack)).length > 0;
        })(stacks);
        var fixedWidthStacks = partitionedStacks[0];
        var variableWidthStacks = partitionedStacks[1];
        var requiredTickWidth = fp_1.reduce(function (sum, stack) {
            return sum + stack[0].barWidth;
        }, config.outerBarPadding)(fixedWidthStacks);
        var variableBarWidth = variableWidthStacks.length > 0
            ? Math.max(config.minBarWidth, (defaultTickWidth - requiredTickWidth) / variableWidthStacks.length)
            : 0;
        requiredTickWidth = requiredTickWidth + variableBarWidth * variableWidthStacks.length;
        this.stateWriter("computedBars", this.computeBars(variableBarWidth, requiredTickWidth));
        return Math.max(requiredTickWidth, defaultTickWidth);
    };
    TimeAxis.prototype.computeBars = function (defaultBarWidth, tickWidth) {
        var config = this.state.current.get("config");
        var computedSeries = this.state.current.get("computed").series;
        var indices = fp_1.sortBy(fp_1.identity)(fp_1.uniq(fp_1.values(computedSeries.barIndices)));
        var offset = -tickWidth / 2 + config.outerBarPadding / 2;
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
    TimeAxis.prototype.computeRange = function (tickWidth, numberOfTicks) {
        var computedWidth = this.state.current.get("computed").canvas.drawingDims.width;
        var width = tickWidth * numberOfTicks;
        var offset = tickWidth / 2;
        return [offset, (width || computedWidth) - offset];
    };
    TimeAxis.prototype.computeTickNumber = function (ticksInDomain, range) {
        var width = Math.abs(range[1] - range[0]);
        var axisOptions = this.state.current.get("config")[this.position];
        return Math.min(ticksInDomain.length, Math.max(Math.floor(width / axisOptions.tickSpacing), axisOptions.minTicks));
    };
    TimeAxis.prototype.computeScale = function (range, ticks) {
        return d3_scale_1.scaleTime()
            .range(range)
            .domain([ticks[0], fp_1.last(ticks)]);
    };
    TimeAxis.prototype.computeTicks = function (computed) {
        if (this.interval === "week") {
            var tickInterval = Math.ceil(computed.ticksInDomain.length / computed.tickNumber || 1);
            return computed.scale.ticks(d3_time_1.timeMonday, tickInterval);
        }
        return computed.scale.ticks(computed.tickNumber || 1);
    };
    TimeAxis.prototype.computeAligned = function (computed) {
        this.previous = fp_1.cloneDeep(this.computed);
        computed.tickNumber = this.computeTickNumber(computed.ticksInDomain, computed.range);
        computed.scale = this.computeScale(computed.range, computed.ticksInDomain);
        computed.ticks = this.computeTicks(computed);
        this.computed = computed;
        this.previous = fp_1.defaults(this.computed)(this.previous);
        this.stateWriter(["computed", this.position], this.computed);
        this.stateWriter(["previous", this.position], this.previous);
    };
    // Drawing
    TimeAxis.prototype.draw = function () {
        this.el.attr("transform", "translate(" + axis_utils_1.axisPosition(this.position, this.state.current.get("computed").canvas.drawingDims).join(",") + ")");
        this.drawTicks();
        this.drawBorder();
        axis_utils_1.positionBackgroundRect(this.el, this.state.current.get("config").duration);
    };
    TimeAxis.prototype.drawTicks = function () {
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
            .call(d3_utils_1.setTextAttributes, fp_1.defaults({ opacity: 1e-6 })(attributes))
            .remove();
        this.adjustMargins();
    };
    TimeAxis.prototype.adjustMargins = function () {
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
        this.events.emit("margins:update", true);
    };
    TimeAxis.prototype.getAttributes = function () {
        var tickOffset = this.state.current.get("config")[this.position].tickOffset;
        return {
            dx: 0,
            dy: tickOffset,
            text: tickFormatter(this.interval),
            x: this.computed.scale,
            y: 0
        };
    };
    TimeAxis.prototype.getStartAttributes = function (attributes) {
        return fp_1.defaults(attributes)({
            x: this.previous.scale,
            y: 0
        });
    };
    TimeAxis.prototype.drawBorder = function () {
        var border = {
            x1: 0,
            x2: this.state.current.get("computed").canvas.drawingDims.width,
            y1: 0,
            y2: 0
        };
        this.el.select("line." + styles.border).call(d3_utils_1.setLineAttributes, border);
    };
    TimeAxis.prototype.close = function () {
        this.el.remove();
    };
    return TimeAxis;
}());
exports.default = TimeAxis;
//# sourceMappingURL=time_axis.js.map