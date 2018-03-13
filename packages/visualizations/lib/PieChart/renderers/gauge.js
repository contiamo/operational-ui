"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("../../utils/event_catalog");
var fp_1 = require("lodash/fp");
require("d3-transition");
var d3_shape_1 = require("d3-shape");
var d3_interpolate_1 = require("d3-interpolate");
var d3_scale_1 = require("d3-scale");
var d3_utils_1 = require("../../utils/d3_utils");
var styles = require("./styles");
var Utils = require("./renderer_utils");
var Gauge = /** @class */ (function () {
    function Gauge(state, events, el, options) {
        this.drawn = false;
        this.type = "gauge";
        this.state = state;
        this.events = events;
        this.el = el;
        this.updateOptions(options);
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.HIGHLIGHT, this.highlightElement.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOVER, this.updateElementHover.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT, this.updateElementHover.bind(this));
        this.events.on(event_catalog_1.default.CHART.MOUSEOUT, this.updateElementHover.bind(this));
    }
    // Initialization and updating config or accessors
    Gauge.prototype.updateOptions = function (options) {
        Utils.assignOptions(this, options);
    };
    Gauge.prototype.setData = function (data) {
        this.data = data || [];
    };
    // Drawing
    Gauge.prototype.draw = function () {
        this.compute();
        this.drawn ? this.updateDraw() : this.initialDraw();
    };
    Gauge.prototype.initialDraw = function () {
        // groups
        this.el.append("svg:g").attr("class", "arcs");
        this.el.append("svg:g").attr("class", styles.total);
        this.updateDraw();
        this.drawn = true;
    };
    Gauge.prototype.updateDraw = function () {
        var config = this.state.current.get("config");
        var duration = config.duration;
        var minTotalFontSize = config.minTotalFontSize;
        var drawingDims = this.state.current.get("computed").canvas
            .drawingContainerDims;
        // Remove focus before updating chart
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT);
        // Center coordinate system
        this.currentTranslation = Utils.computeTranslate(drawingDims, this.extent === "semi" ? this.computed.r : 0);
        this.el.attr("transform", Utils.translateString(this.currentTranslation));
        // Arcs
        var arcs = Utils.createArcGroups(this.el, this.computed.data, this.key);
        // Exit
        Utils.exitArcs(arcs, duration, Utils.removeArcTween(this.computed, this.angleRange()));
        // Enter
        Utils.enterArcs(arcs, this.onMouseOver.bind(this), this.onMouseOut.bind(this));
        // Update
        var updatingArcs = arcs.merge(arcs.enter().selectAll("g." + styles.arc));
        d3_utils_1.setPathAttributes(updatingArcs.select("path"), this.arcAttributes(), duration);
        d3_utils_1.setTextAttributes(updatingArcs.select("text"), Utils.textAttributes(this.computed), duration);
        // Total / center text
        var options = { minTotalFontSize: minTotalFontSize, innerRadius: this.computed.inner, yOffset: this.totalYOffset() };
        Utils.updateTotal(this.el, this.centerDisplayString(), duration, options);
        // Comparison line
        this.updateComparison();
    };
    Gauge.prototype.arcAttributes = function () {
        return {
            path: this.arcTween.bind(this),
            fill: this.arcColor.bind(this)
        };
    };
    Gauge.prototype.arcColor = function (d) {
        return d.unfilled ? undefined : this.color(d);
    };
    Gauge.prototype.angleRange = function () {
        return this.extent === "semi" ? [-Math.PI / 2, Math.PI / 2] : [-Math.PI, Math.PI];
    };
    Gauge.prototype.totalYOffset = function () {
        return this.extent === "semi" ? "0" : "0.35em";
    };
    // Interpolate the arcs in data space.
    Gauge.prototype.arcTween = function (d, i) {
        var _this = this;
        var angleRange = this.angleRange();
        var old;
        var s0;
        var e0;
        // Segments transition to and from the start/left of the gauge.
        if (!d.data.unfilled) {
            old =
                fp_1.filter(function (datapoint) {
                    return !datapoint.data.unfilled;
                })(this.previous.data) || [];
            if (old[i]) {
                s0 = old[i].startAngle;
                e0 = old[i].endAngle;
            }
            else if (!old[i] && old[i - 1]) {
                s0 = old[i - 1].endAngle;
                e0 = old[i - 1].endAngle;
            }
            else if (!old[i - 1] && old.length > 0) {
                s0 = old[old.length - 1].endAngle;
                e0 = old[old.length - 1].endAngle;
            }
            else {
                s0 = angleRange[0];
                e0 = angleRange[0];
            }
            // The unfilled part of the gauge transitions to and from the end/right of the gauge.
        }
        else {
            old = fp_1.find(function (datapoint) {
                return datapoint.data.unfilled;
            })(this.previous.data);
            if (old) {
                s0 = old.startAngle;
                e0 = old.endAngle;
            }
            else if (!this.previous.data) {
                s0 = angleRange[0];
                e0 = angleRange[1];
            }
            else {
                s0 = angleRange[1];
                e0 = angleRange[1];
            }
        }
        var innerRadius = this.previous.inner || this.computed.inner;
        var outerRadius = this.previous.r || this.computed.r;
        var f = d3_interpolate_1.interpolateObject({ innerRadius: innerRadius, outerRadius: outerRadius, endAngle: e0, startAngle: s0 }, { innerRadius: this.computed.inner, outerRadius: this.computed.r, endAngle: d.endAngle, startAngle: d.startAngle });
        return function (t) { return _this.computed.arc(f(t)); };
    };
    Gauge.prototype.lineTween = function (comparison) {
        var _this = this;
        // Need to rotate range by 90 degrees, since in d3 pie layout, '0' is vertical above origin.
        // Here, we need '0' to be horizontal to left of origin.
        var range = fp_1.map(function (value) { return value + Math.PI / 2; })(this.angleRange());
        var angle = function (d) {
            return d3_scale_1.scaleLinear()
                .range(range)
                .domain([0, _this.target])(d.value);
        };
        var xOuter = function (d) { return -d.r * Math.cos(angle(d)); };
        var yOuter = function (d) { return -d.r * Math.sin(angle(d)); };
        var xInner = function (d) { return -d.inner * Math.cos(angle(d)); };
        var yInner = function (d) { return -d.inner * Math.sin(angle(d)); };
        var path = function (d) {
            return "M" + [xInner(d), yInner(d)].join(",") + "L" + [xOuter(d), yOuter(d)].join(",");
        };
        var oldValue = this.previous.comparison ? this.value(this.previous.comparison) : 0;
        var f = d3_interpolate_1.interpolateObject({ inner: this.previous.inner || this.computed.inner, r: this.previous.r || this.computed.r, value: oldValue }, { inner: this.computed.inner, r: this.computed.r, value: this.value(comparison) });
        return function (t) { return path(f(t)); };
    };
    Gauge.prototype.centerDisplayString = function () {
        return this.total + " / " + this.target;
    };
    Gauge.prototype.updateComparison = function () {
        var comparison = this.el
            .selectAll("g." + styles.comparison)
            .data(this.comparison ? [this.comparison] : []);
        comparison.exit().remove();
        var enter = comparison
            .enter()
            .append("svg:g")
            .attr("class", styles.comparison);
        enter.append("svg:path");
        enter
            .merge(comparison)
            .transition()
            .duration(this.state.current.get("config").duration)
            .select("path")
            .attrTween("d", this.lineTween.bind(this));
    };
    // Data computation / preparation
    Gauge.prototype.compute = function () {
        this.previous = this.computed;
        this.total = Utils.computeTotal(this.data, this.value);
        this.fillGaugeExtent();
        if (!this.target) {
            throw new Error("No target value provided for gauge");
        }
        var d = {
            layout: Utils.layout(this.angleValue.bind(this), this.angleRange()),
            total: this.total,
            target: this.target
        };
        // data should not become part of this.previous in first computation
        this.previous = fp_1.defaults(d)(this.previous);
        Utils.calculatePercentages(this.data, this.angleValue.bind(this), d.target);
        this.computed = __assign({}, d, this.computeArcs(d), { data: d.layout(this.data), comparison: this.comparison });
    };
    Gauge.prototype.angleValue = function (d) {
        return this.value(d) || d.value;
    };
    // Ensure sum of rendered values is equal to gauge target value.
    Gauge.prototype.fillGaugeExtent = function () {
        var _this = this;
        var runningTotal = this.runningTotal();
        // If target has been exceeded, reduce last value(s)
        if (this.total >= this.target) {
            var index_1 = fp_1.findIndex(function (value) { return value >= _this.target; })(runningTotal);
            fp_1.forEach(function (datapoint, i) {
                if (i === index_1) {
                    datapoint.value = i > 0 ? _this.target - runningTotal[i - 1] : _this.target;
                }
                else if (i > index_1) {
                    datapoint.value = 0;
                }
            })(this.data);
            // If target has not been reached, add an "unfilled" segment which will have no color,
            // and will not be hoverable.
        }
        else {
            this.data.push({
                unfilled: true,
                value: this.target - this.total
            });
        }
    };
    Gauge.prototype.runningTotal = function () {
        return fp_1.reduce(function (memo, datapoint) {
            var previous = fp_1.last(memo) || 0;
            memo.push(previous + datapoint.value);
            return memo;
        }, [])(this.data);
    };
    Gauge.prototype.computeArcs = function (computed) {
        var drawingDims = this.state.current.get("computed").canvas
            .drawingContainerDims, outerBorderMargin = this.state.current.get("config").outerBorderMargin, r = this.computeOuter(drawingDims, outerBorderMargin), inner = this.computeInner(r), rHover = r + 1, innerHover = Math.max(inner - 1, 0);
        return {
            r: r,
            inner: inner,
            rHover: rHover,
            innerHover: innerHover,
            arc: d3_shape_1.arc(),
            arcOver: d3_shape_1.arc()
                .innerRadius(innerHover)
                .outerRadius(rHover)
        };
    };
    Gauge.prototype.computeOuter = function (drawingDims, margin) {
        return this.extent === "full"
            ? Math.min(drawingDims.width, drawingDims.height) / 2 - margin
            : Math.min(drawingDims.width / 2, drawingDims.height) - margin;
    };
    Gauge.prototype.computeInner = function (outerRadius) {
        var config = this.state.current.get("config");
        var width = outerRadius - config.minInnerRadius;
        // If there isn't enough space, don't render inner circle
        return width < config.minWidth ? 0 : outerRadius - Math.min(width, config.maxWidth);
    };
    // Event listeners / handlers
    Gauge.prototype.onMouseOver = function (d) {
        if (d.data.unfilled) {
            this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT);
            return;
        }
        var datumInfo = {
            key: this.key(d),
            value: this.value(d),
            percentage: d.data.percentage
        };
        var centroid = Utils.translateBack(this.computed.arcOver.centroid(d), this.currentTranslation);
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOVER, { d: datumInfo, focusPoint: { centroid: centroid } });
    };
    Gauge.prototype.updateElementHover = function (datapoint) {
        var _this = this;
        if (!this.drawn) {
            return;
        }
        var arcs = this.el.select("g.arcs").selectAll("g");
        var filterFocused = function (d) { return datapoint.d && _this.key(d) === datapoint.d.key; };
        var filterUnFocused = function (d) { return (datapoint.d ? _this.key(d) !== datapoint.d.key : true); };
        var shadowDefinitionId = this.state.current.get("computed").canvas.shadowDefinitionId;
        Utils.updateFilteredPathAttributes(arcs, filterFocused, this.computed.arcOver, shadowDefinitionId);
        Utils.updateFilteredPathAttributes(arcs, filterUnFocused, this.computed.arc);
    };
    Gauge.prototype.highlightElement = function (key) {
        var _this = this;
        var d = fp_1.find(function (datum) { return _this.key(datum) === key; })(this.computed.data);
        if (!d) {
            return;
        }
        this.onMouseOver(d);
    };
    Gauge.prototype.onMouseOut = function () {
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT);
    };
    // External methods
    Gauge.prototype.dataForLegend = function () {
        var _this = this;
        var data = fp_1.map(function (datum) {
            return {
                label: _this.key(datum),
                color: _this.color(datum)
            };
        })(this.data);
        if (this.comparison) {
            data.push({
                label: this.key(this.comparison),
                comparison: true
            });
        }
        return data;
    };
    // Remove & clean up
    Gauge.prototype.remove = function () {
        if (this.drawn) {
            this.el.remove();
            this.drawn = false;
        }
    };
    return Gauge;
}());
exports.default = Gauge;
//# sourceMappingURL=gauge.js.map