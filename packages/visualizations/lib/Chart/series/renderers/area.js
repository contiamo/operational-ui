"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var d3_shape_1 = require("d3-shape");
var styles = require("./styles");
var interpolator = {
    cardinal: d3_shape_1.curveCardinal,
    linear: d3_shape_1.curveLinear,
    monotoneX: d3_shape_1.curveMonotoneX,
    monotoneY: d3_shape_1.curveMonotoneY,
    step: d3_shape_1.curveStep,
    stepAfter: d3_shape_1.curveStepAfter,
    stepBefore: d3_shape_1.curveStepBefore
};
var defaultAccessors = {
    color: function (series, d) { return series.legendColor(); },
    interpolate: function (series, d) { return "linear"; },
    closeGaps: function (series, d) { return true; }
};
var Area = /** @class */ (function () {
    function Area(state, events, el, data, options, series) {
        this.type = "area";
        this.state = state;
        this.events = events;
        this.series = series;
        this.el = this.appendSeriesGroup(el);
        this.update(data, options);
    }
    // Public methods
    Area.prototype.update = function (data, options) {
        this.options = options;
        this.assignAccessors(options.accessors);
        this.data = data;
    };
    Area.prototype.draw = function () {
        var _this = this;
        this.setAxisScales();
        this.addMissingData();
        this.updateClipPath();
        var duration = this.state.current.get("config").duration;
        var data = fp_1.sortBy(function (d) { return (_this.xIsBaseline ? _this.x(d) : _this.y(d)); })(this.data);
        var area = this.el.selectAll("path.main").data([data]);
        area
            .enter()
            .append("svg:path")
            .attr("class", "main")
            .attr("d", this.startPath.bind(this))
            .merge(area)
            .attr("fill", this.color.bind(this))
            .transition()
            .duration(duration)
            .attr("d", this.path.bind(this))
            .attr("clip-path", "url(#area-clip-" + this.series.key() + ")");
        area
            .exit()
            .transition()
            .duration(duration)
            .attr("d", this.startPath.bind(this))
            .remove();
    };
    Area.prototype.close = function () {
        this.el.remove();
    };
    Area.prototype.dataForAxis = function (axis) {
        var data = fp_1.map(this[axis])(this.data)
            .concat(fp_1.map(fp_1.get(axis + "0"))(this.data))
            .concat(fp_1.map(fp_1.get(axis + "1"))(this.data));
        return fp_1.compact(data);
    };
    // Private methods
    Area.prototype.appendSeriesGroup = function (el) {
        return el.append("g").attr("class", "series:" + this.series.key() + " " + styles.area);
    };
    Area.prototype.updateClipPath = function () {
        var duration = this.state.current.get("config").duration;
        var data = this.series.options.clipData ? [this.series.options.clipData] : [];
        var clip = this.el.selectAll("clipPath path").data(data);
        clip
            .enter()
            .append("svg:clipPath")
            .attr("id", "area-clip-" + this.series.key())
            .append("svg:path")
            .attr("d", this.startClipPath.bind(this))
            .merge(clip)
            .transition()
            .duration(duration)
            .attr("d", this.clipPath.bind(this));
        clip
            .exit()
            .transition()
            .duration(duration)
            .attr("d", this.startClipPath.bind(this))
            .remove();
    };
    Area.prototype.setAxisScales = function () {
        var _this = this;
        this.xIsBaseline = this.state.current.get("computed").axes.baseline === "x";
        var axisData = this.state.current.get("accessors").data.axes(this.state.current.get("data"));
        var axisTypes = fp_1.map(function (axis) { return axisData[axis].type; })([
            this.series.xAxis(),
            this.series.yAxis()
        ]);
        if (fp_1.difference(axisTypes)(["time", "quant"]).length > 0) {
            throw new Error("The area renderer is incompatible with a " + axisTypes[0] + " and a " + axisTypes[1] + " axis.");
        }
        this.xScale = this.state.current.get("computed").axes.computed[this.series.xAxis()].scale;
        this.yScale = this.state.current.get("computed").axes.computed[this.series.yAxis()].scale;
        this.x0 = function (d) { return _this.xScale(_this.xIsBaseline ? _this.x(d) : d.x0 || 0); };
        this.x1 = function (d) { return _this.xScale(_this.xIsBaseline ? _this.x(d) : d.x1 || _this.x(d)); };
        this.y0 = function (d) { return _this.yScale(_this.xIsBaseline ? d.y0 || 0 : _this.y(d)); };
        this.y1 = function (d) { return _this.yScale(_this.xIsBaseline ? d.y1 || _this.y(d) : _this.y(d)); };
    };
    Area.prototype.assignAccessors = function (customAccessors) {
        var _this = this;
        var axisAcessors = this.state.current.get("accessors").renderer;
        var accessors = fp_1.defaults(fp_1.merge(defaultAccessors)(axisAcessors))(customAccessors);
        this.x = function (d) { return accessors.x(_this.series, d) || d.injectedX; };
        this.y = function (d) { return accessors.y(_this.series, d) || d.injectedY; };
        this.color = function (d) { return accessors.color(_this.series, d); };
        this.interpolate = function (d) { return interpolator[accessors.interpolate(_this.series, d)]; };
        this.closeGaps = function (d) { return accessors.closeGaps(_this.series, d); };
    };
    Area.prototype.addMissingData = function () {
        var _this = this;
        if (this.closeGaps()) {
            return;
        }
        if (this.xIsBaseline && !this.series.options.stacked) {
            var ticks = this.state.current.get("computed").series.dataForAxes[this.series.xAxis()];
            fp_1.forEach(function (tick) {
                if (!fp_1.find(function (d) { return _this.x(d).toString() === tick.toString(); })(_this.data)) {
                    _this.data.push({ injectedX: tick, injectedY: undefined });
                }
            })(ticks);
        }
    };
    Area.prototype.startPath = function (data) {
        var _this = this;
        var isDefined = function (d) { return !!_this.x(d) && !!_this.y(d); };
        return d3_shape_1.area()
            .x(this.x0)
            .y(this.y0)
            .curve(this.interpolate())
            .defined(isDefined)(data);
    };
    Area.prototype.path = function (data) {
        var _this = this;
        var isDefined = function (d) { return !!_this.x(d) && !!_this.y(d); };
        return d3_shape_1.area()
            .x0(this.x0)
            .x1(this.x1)
            .y0(this.y0)
            .y1(this.y1)
            .curve(this.interpolate())
            .defined(isDefined)(data);
    };
    Area.prototype.startClipPath = function (data) {
        var _this = this;
        return d3_shape_1.area()
            .x(function (d) { return _this.xScale(_this.xIsBaseline ? _this.x(d) : 0); })
            .y(function (d) { return _this.yScale(_this.xIsBaseline ? 0 : _this.y(d)); })
            .curve(this.interpolate())(data);
    };
    Area.prototype.clipPath = function (data) {
        var _this = this;
        return d3_shape_1.area()
            .x0(this.x0)
            .x1(this.x1)
            .y0(function (d) { return (_this.xIsBaseline ? 0 : _this.y0(d)); })
            .y1(this.y1)
            .curve(this.interpolate())(data);
    };
    return Area;
}());
exports.default = Area;
//# sourceMappingURL=area.js.map