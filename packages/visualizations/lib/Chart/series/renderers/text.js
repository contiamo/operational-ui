"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var styles = require("./styles");
var defaultAccessors = {
    color: function (series, d) { return series.legendColor(); },
    size: function (series, d) { return 10; },
};
var Text = /** @class */ (function () {
    function Text(state, events, el, data, options, series) {
        this.type = "text";
        this.state = state;
        this.events = events;
        this.series = series;
        this.el = this.appendSeriesGroup(el);
        this.update(data, options);
    }
    // Public methods
    Text.prototype.update = function (data, options) {
        this.options = options;
        this.assignAccessors(options.accessors);
        this.data = data;
    };
    Text.prototype.dataForAxis = function (axis) {
        var data = fp_1.map(this[axis])(this.data)
            .concat(fp_1.map(fp_1.get(axis + "0"))(this.data))
            .concat(fp_1.map(fp_1.get(axis + "1"))(this.data));
        return fp_1.compact(data);
    };
    Text.prototype.draw = function () {
        this.setAxisScales();
        var data = fp_1.filter(this.validate.bind(this))(this.data);
        var duration = this.state.current.get("config").duration;
        var startAttributes = this.startAttributes();
        var attributes = this.attributes();
        var text = this.el.selectAll("text").data(data);
        text
            .enter()
            .append("text")
            .attr("x", startAttributes.x)
            .attr("y", startAttributes.y)
            .style("font-size", this.size() + "px")
            .text(startAttributes.text)
            .attr("transform", startAttributes.transform)
            .merge(text)
            .transition()
            .duration(duration)
            .attr("x", attributes.x)
            .attr("y", attributes.y)
            .style("font-size", this.size() + "px")
            .text(attributes.text)
            .attr("transform", attributes.transform);
        text
            .exit()
            .transition()
            .duration(duration)
            .attr("x", startAttributes.x)
            .attr("y", startAttributes.y)
            .text(startAttributes.text)
            .remove();
    };
    Text.prototype.close = function () {
        this.el.remove();
    };
    // Private methods
    Text.prototype.appendSeriesGroup = function (el) {
        return el.append("g").attr("class", "series:" + this.series.key() + " " + styles.text);
    };
    Text.prototype.assignAccessors = function (customAccessors) {
        var _this = this;
        var accessors = fp_1.defaults(defaultAccessors)(customAccessors);
        this.x = function (d) { return _this.series.x(d) || d.injectedX; };
        this.y = function (d) { return _this.series.y(d) || d.injectedY; };
        this.color = function (d) { return accessors.color(_this.series, d); };
        this.size = function (d) { return accessors.size(_this.series, d); };
    };
    Text.prototype.setAxisScales = function () {
        this.xIsBaseline = this.state.current.get("computed").axes.baseline === "x";
        this.xScale = this.state.current.get("computed").axes.computed[this.series.xAxis()].scale;
        this.yScale = this.state.current.get("computed").axes.computed[this.series.yAxis()].scale;
    };
    Text.prototype.validate = function (d) {
        return isFinite(this.xScale(this.x(d))) && isFinite(this.yScale(this.y(d)));
    };
    Text.prototype.startAttributes = function () {
        var _this = this;
        var computedBars = this.state.current.get("computed").axes.computedBars;
        var offset = computedBars && computedBars[this.series.key()] ? computedBars[this.series.key()].width / 2 : 0;
        var rotate = this.state.current.get("config").textlabels.rotate[this.xIsBaseline ? "vertical" : "horizontal"];
        var attrs = {
            x: function (d) { return _this.xScale(_this.xIsBaseline ? _this.x(d) - offset : 0); },
            y: function (d) { return _this.yScale(_this.xIsBaseline ? 0 : _this.y(d) - offset); },
            text: function (d) { return (_this.xIsBaseline ? _this.y(d) : _this.x(d)).toString(); },
        };
        attrs.transform = function (d) { return "rotate(" + rotate + ", " + attrs.x(d) + ", " + attrs.y(d) + ")"; };
        return attrs;
    };
    Text.prototype.attributes = function () {
        var _this = this;
        var config = this.state.current.get("config");
        var computedBars = this.state.current.get("computed").axes.computedBars;
        var barOffset = computedBars && computedBars[this.series.key()]
            ? computedBars[this.series.key()].offset + computedBars[this.series.key()].width / 2
            : 0;
        var symbolOffset = function (d) {
            return (_this.series.symbolOffset ? _this.series.symbolOffset(d) : 0) + config.textlabels.offset;
        };
        var rotate = config.textlabels.rotate[this.xIsBaseline ? "vertical" : "horizontal"];
        var attrs = {
            x: function (d) { return _this.xScale(d.x1 || _this.x(d)) + (_this.xIsBaseline ? barOffset : symbolOffset(d)); },
            y: function (d) { return _this.yScale(d.y1 || _this.y(d)) + (_this.xIsBaseline ? -symbolOffset(d) : barOffset); },
            text: function (d) { return (_this.xIsBaseline ? _this.y(d) : _this.x(d)).toString(); },
        };
        attrs.transform = function (d) { return "rotate(" + rotate + ", " + attrs.x(d) + ", " + attrs.y(d) + ")"; };
        return attrs;
    };
    return Text;
}());
exports.default = Text;
//# sourceMappingURL=text.js.map