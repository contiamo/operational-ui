"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var styles = require("./styles");
var d3_shape_1 = require("d3-shape");
var defaultAccessors = {
    fill: function (series, d) { return "#fff"; },
    size: function (series, d) { return 50; },
    stroke: function (series, d) { return series.legendColor(); },
    symbol: function (series, d) { return "circle"; }
};
var symbolOptions = {
    circle: {
        symbol: d3_shape_1.symbolCircle
    },
    cross: {
        symbol: d3_shape_1.symbolCross
    },
    diamond: {
        symbol: d3_shape_1.symbolDiamond
    },
    square: {
        symbol: d3_shape_1.symbolSquare
    },
    squareDiamond: {
        symbol: d3_shape_1.symbolSquare,
        rotation: 45
    },
    star: {
        symbol: d3_shape_1.symbolStar
    },
    triangle: {
        symbol: d3_shape_1.symbolTriangle
    }
};
var Symbol = /** @class */ (function () {
    function Symbol(state, events, el, data, options, series) {
        this.type = "symbol";
        this.state = state;
        this.events = events;
        this.series = series;
        this.el = this.appendSeriesGroup(el);
        this.update(data, options);
    }
    // Public methods
    Symbol.prototype.update = function (data, options) {
        this.options = options;
        this.assignAccessors(options.accessors);
        this.data = data;
    };
    Symbol.prototype.draw = function () {
        var _this = this;
        this.setAxisScales();
        var data = fp_1.filter(this.validate.bind(this))(this.data);
        var duration = this.state.current.get("config").duration;
        var symbols = this.el.selectAll("path").data(data);
        symbols
            .enter()
            .append("svg:path")
            .attr("d", function (d) {
            return d3_shape_1.symbol()
                .type(_this.symbol(d).symbol)
                .size(1)();
        })
            .attr("transform", this.startTransform.bind(this))
            .merge(symbols)
            .attr("fill", this.fill.bind(this))
            .attr("stroke", this.stroke.bind(this))
            .transition()
            .duration(duration)
            .attr("d", function (d) {
            return d3_shape_1.symbol()
                .type(_this.symbol(d).symbol)
                .size(_this.size(d))();
        })
            .attr("transform", this.transform.bind(this));
        symbols
            .exit()
            .transition()
            .duration(duration)
            .attr("d", function (d) {
            return d3_shape_1.symbol()
                .type(_this.symbol(d).symbol)
                .size(1)();
        })
            .remove();
    };
    Symbol.prototype.close = function () {
        this.el.remove();
    };
    Symbol.prototype.dataForAxis = function (axis) {
        var data = fp_1.map(this[axis])(this.data)
            .concat(fp_1.map(fp_1.get(axis + "0"))(this.data))
            .concat(fp_1.map(fp_1.get(axis + "1"))(this.data));
        return fp_1.compact(data);
    };
    // Private methods
    Symbol.prototype.appendSeriesGroup = function (el) {
        return el.append("g").attr("class", "series:" + this.series.key() + " " + styles.symbol);
    };
    Symbol.prototype.validate = function (d) {
        return isFinite(this.xScale(this.x(d))) && isFinite(this.yScale(this.y(d)));
    };
    Symbol.prototype.assignAccessors = function (customAccessors) {
        var _this = this;
        var accessors = fp_1.defaults(defaultAccessors)(customAccessors);
        this.x = function (d) { return _this.series.x(d) || d.injectedX; };
        this.y = function (d) { return _this.series.y(d) || d.injectedY; };
        this.fill = function (d) { return accessors.fill(_this.series, d); };
        this.stroke = function (d) { return accessors.stroke(_this.series, d); };
        this.symbol = function (d) { return symbolOptions[accessors.symbol(_this.series, d)]; };
        this.size = function (d) { return accessors.size(_this.series, d); };
    };
    Symbol.prototype.setAxisScales = function () {
        this.xIsBaseline = this.state.current.get("computed").axes.baseline === "x";
        this.xScale = this.state.current.get("computed").axes.computed[this.series.xAxis()].scale;
        this.yScale = this.state.current.get("computed").axes.computed[this.series.yAxis()].scale;
    };
    Symbol.prototype.transform = function (d) {
        var x = this.xScale(d.x1 || this.x(d));
        var y = this.yScale(d.y1 || this.y(d));
        return "translate(" + x + ", " + y + ") rotate(" + (this.symbol(d).rotation || 0) + ")";
    };
    Symbol.prototype.startTransform = function (d) {
        var x = this.xScale(this.xIsBaseline ? d.x1 || this.x(d) : 0);
        var y = this.yScale(this.xIsBaseline ? 0 : d.y1 || this.y(d));
        return "translate(" + x + ", " + y + ")";
    };
    return Symbol;
}());
exports.default = Symbol;
//# sourceMappingURL=symbol.js.map