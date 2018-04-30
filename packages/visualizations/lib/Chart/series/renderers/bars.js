"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var styles = require("./styles");
var d3_utils_1 = require("../../../utils/d3_utils");
var defaultAccessors = {
    color: function (series, d) { return series.legendColor(); },
    barWidth: function (series, d) { return undefined; }
};
var Bars = /** @class */ (function () {
    function Bars(state, events, el, data, options, series) {
        this.type = "bars";
        this.state = state;
        this.events = events;
        this.series = series;
        this.el = this.appendSeriesGroup(el);
        this.update(data, options);
    }
    // Public methods
    Bars.prototype.update = function (data, options) {
        this.options = options;
        this.assignAccessors(options.accessors);
        this.data = data;
    };
    Bars.prototype.draw = function () {
        this.setAxisScales();
        var data = fp_1.filter(this.validate.bind(this))(this.data);
        var duration = this.state.current.get("config").duration;
        this.el
            .transition()
            .duration(!!this.el.attr("transform") ? duration : 0)
            .attr("transform", this.seriesTranslation());
        var attributes = this.attributes();
        var startAttributes = this.startAttributes(attributes);
        var bars = this.el.selectAll("rect").data(data);
        bars
            .enter()
            .append("svg:rect")
            .call(d3_utils_1.setRectAttributes, startAttributes)
            .merge(bars)
            .call(d3_utils_1.setRectAttributes, attributes, duration);
        bars
            .exit()
            .transition()
            .duration(duration)
            .call(d3_utils_1.setRectAttributes, startAttributes)
            .remove();
    };
    Bars.prototype.close = function () {
        this.el.remove();
    };
    Bars.prototype.dataForAxis = function (axis) {
        var data = fp_1.map(this[axis])(this.data)
            .concat(fp_1.map(fp_1.get(axis + "0"))(this.data))
            .concat(fp_1.map(fp_1.get(axis + "1"))(this.data));
        return fp_1.compact(data);
    };
    // Private methods
    Bars.prototype.appendSeriesGroup = function (el) {
        return el.append("g").attr("class", "series:" + this.series.key() + " " + styles.bar);
    };
    Bars.prototype.setAxisScales = function () {
        var _this = this;
        this.xIsBaseline = this.state.current.get("computed").axes.baseline === "x";
        var axisData = this.state.current.get("accessors").data.axes(this.state.current.get("data"));
        var axisTypes = fp_1.map(function (axis) { return axisData[axis].type; })([
            this.series.xAxis(),
            this.series.yAxis()
        ]);
        if (!fp_1.includes("quant")(axisTypes)) {
            throw new Error("The bar renderer requires a quant axis.");
        }
        this.xScale = this.state.current.get("computed").axes.computed[this.series.xAxis()].scale;
        this.yScale = this.state.current.get("computed").axes.computed[this.series.yAxis()].scale;
        this.x0 = function (d) { return _this.xScale(_this.xIsBaseline ? _this.x(d) : d.x0 || 0); };
        this.x1 = function (d) { return _this.xScale(_this.xIsBaseline ? _this.x(d) : d.x1 || _this.x(d)); };
        this.y0 = function (d) { return _this.yScale(_this.xIsBaseline ? d.y0 || 0 : _this.y(d)); };
        this.y1 = function (d) { return _this.yScale(_this.xIsBaseline ? d.y1 || _this.y(d) : _this.y(d)); };
    };
    Bars.prototype.validate = function (d) {
        return fp_1.isFinite(this.xScale(this.x(d))) && fp_1.isFinite(this.yScale(this.y(d)));
    };
    Bars.prototype.assignAccessors = function (customAccessors) {
        var _this = this;
        var accessors = fp_1.defaults(defaultAccessors)(customAccessors);
        this.x = function (d) { return _this.series.x(d) || d.injectedX; };
        this.y = function (d) { return _this.series.y(d) || d.injectedY; };
        this.color = function (d) { return accessors.color(_this.series, d); };
        this.barWidth = function (d) { return accessors.barWidth(_this.series, d); };
    };
    Bars.prototype.seriesTranslation = function () {
        var seriesBars = this.state.current.get("computed").axes.computedBars[this.series.key()];
        return this.xIsBaseline ? "translate(" + seriesBars.offset + ", 0)" : "translate(0, " + seriesBars.offset + ")";
    };
    Bars.prototype.startAttributes = function (attributes) {
        return {
            x: this.xIsBaseline ? this.x0 : 0,
            y: this.xIsBaseline ? this.yScale(0) : this.y0,
            width: this.xIsBaseline ? attributes.width : 0,
            height: this.xIsBaseline ? 0 : attributes.height,
            color: attributes.color
        };
    };
    Bars.prototype.attributes = function () {
        var _this = this;
        var barWidth = this.state.current.get("computed").axes.computedBars[this.series.key()].width;
        return {
            x: this.x0,
            y: this.y1,
            width: this.xIsBaseline ? barWidth : function (d) { return _this.x1(d) - _this.x0(d); },
            height: this.xIsBaseline ? function (d) { return _this.y0(d) - _this.y1(d); } : barWidth,
            color: this.color.bind(this)
        };
    };
    return Bars;
}());
exports.default = Bars;
//# sourceMappingURL=bars.js.map