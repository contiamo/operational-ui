"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var d3_shape_1 = require("d3-shape");
var styles = require("./styles");
var defaultAccessors = {
    x: function (series, d) { return d.x; },
    y: function (series, d) { return d.y; },
    color: function (series, d) { return series.legendColor(); },
    dashed: function (series, d) { return false; },
    interpolate: function (series, d) { return "linear"; },
    closeGaps: function (series, d) { return true; }
};
var interpolator = {
    cardinal: d3_shape_1.curveCardinal,
    linear: d3_shape_1.curveLinear,
    monotoneX: d3_shape_1.curveMonotoneX,
    monotoneY: d3_shape_1.curveMonotoneY,
    step: d3_shape_1.curveStep,
    stepAfter: d3_shape_1.curveStepAfter,
    stepBefore: d3_shape_1.curveStepBefore
};
var Line = /** @class */ (function () {
    function Line(state, events, el, data, options, series) {
        this.type = "line";
        this.state = state;
        this.events = events;
        this.series = series;
        this.el = this.appendSeriesGroup(el);
        this.update(data, options);
    }
    // Public methods
    Line.prototype.update = function (data, options) {
        this.options = options;
        this.assignAccessors(options.accessors);
        this.data = data;
    };
    Line.prototype.draw = function () {
        var _this = this;
        this.setAxisScales();
        this.addMissingData();
        var data = fp_1.sortBy(function (d) { return (_this.quantIsY ? _this.x(d) : _this.y(d)); })(this.data);
        var duration = this.state.current.get("config").duration;
        var line = this.el.selectAll("path").data([data]);
        line
            .enter()
            .append("svg:path")
            .attr("d", this.startPath.bind(this))
            .merge(line)
            .attr("class", this.dashed() ? "dashed" : "")
            .style("stroke", this.color.bind(this))
            .transition()
            .duration(duration)
            .attr("d", this.path.bind(this));
        line
            .exit()
            .transition()
            .duration(duration)
            .attr("d", this.startPath.bind(this))
            .remove();
    };
    Line.prototype.close = function () {
        this.el.remove();
    };
    Line.prototype.dataForAxis = function (axis) {
        var data = fp_1.map(this[axis])(this.data)
            .concat(fp_1.map(fp_1.get(axis + "0"))(this.data))
            .concat(fp_1.map(fp_1.get(axis + "1"))(this.data));
        return fp_1.compact(data);
    };
    // Private methods
    Line.prototype.appendSeriesGroup = function (el) {
        return el.append("g").attr("class", "series:" + this.series.key() + " " + styles.line);
    };
    Line.prototype.assignAccessors = function (customAccessors) {
        var _this = this;
        var accessors = fp_1.defaults(defaultAccessors)(customAccessors);
        this.x = function (d) { return accessors.x(_this.series, d) || d.injectedX; };
        this.y = function (d) { return accessors.y(_this.series, d) || d.injectedY; };
        this.color = function (d) { return accessors.color(_this.series, d); };
        this.dashed = function (d) { return accessors.dashed(_this.series, d); };
        this.interpolate = function (d) { return interpolator[accessors.interpolate(_this.series, d)]; };
        this.closeGaps = function (d) { return accessors.closeGaps(_this.series, d); };
    };
    Line.prototype.setAxisScales = function () {
        var _this = this;
        var axisData = this.state.current.get("accessors").data.axes(this.state.current.get("data"));
        var axisTypes = fp_1.map(function (axis) { return axisData[axis].type; })([
            this.series.xAxis(),
            this.series.yAxis()
        ]);
        if (fp_1.difference(axisTypes)(["time", "quant"]).length > 0) {
            throw new Error("The line renderer is incompatible with a " + axisTypes[0] + " and a " + axisTypes[1] + " axis.");
        }
        this.xScale = this.state.current.get("computed").axes.computed[this.series.xAxis()].scale;
        this.yScale = this.state.current.get("computed").axes.computed[this.series.yAxis()].scale;
        this.quantIsY = axisTypes[1] === "quant";
        this.adjustedX = function (d) { return _this.xScale(_this.quantIsY ? _this.x(d) : d.x1 || _this.x(d)); };
        this.adjustedY = function (d) { return _this.yScale(_this.quantIsY ? d.y1 || _this.y(d) : _this.y(d)); };
    };
    Line.prototype.addMissingData = function () {
        var _this = this;
        if (this.closeGaps()) {
            return;
        }
        if (this.quantIsY && !this.series.options.stacked) {
            var ticks = this.state.current.get("computed").series.dataForAxes[this.series.xAxis()];
            fp_1.forEach(function (tick) {
                if (!fp_1.find(function (d) { return _this.x(d).toString() === tick.toString(); })(_this.data)) {
                    _this.data.push({ injectedX: tick, injectedY: undefined });
                }
            })(ticks);
        }
    };
    Line.prototype.startPath = function (data) {
        var _this = this;
        var isDefined = function (d) { return !!_this.x(d) && !!_this.y(d); };
        return d3_shape_1.line()
            .x(this.quantIsY ? this.adjustedX : this.xScale(0))
            .y(this.adjustedY ? this.yScale(0) : this.adjustedY)
            .curve(this.interpolate())
            .defined(isDefined)(data);
    };
    Line.prototype.path = function (data) {
        var _this = this;
        var isDefined = function (d) { return !!_this.x(d) && !!_this.y(d); };
        return d3_shape_1.line()
            .x(this.adjustedX)
            .y(this.adjustedY)
            .curve(this.interpolate())
            .defined(isDefined)(data);
    };
    return Line;
}());
exports.default = Line;
//# sourceMappingURL=line.js.map