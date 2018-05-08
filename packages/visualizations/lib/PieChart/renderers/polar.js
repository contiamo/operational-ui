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
var d3_scale_1 = require("d3-scale");
var d3_interpolate_1 = require("d3-interpolate");
var d3_utils_1 = require("../../utils/d3_utils");
var styles = require("./styles");
var Utils = require("./renderer_utils");
var ANGLE_RANGE = [0, 2 * Math.PI];
var MIN_SEGMENT_WIDTH = 5;
var TOTAL_Y_OFFSET = "0.35em";
var Polar = /** @class */ (function () {
    function Polar(state, events, el, options) {
        this.drawn = false;
        this.type = "polar";
        this.state = state;
        this.events = events;
        this.el = el;
        this.updateOptions(options);
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.HIGHLIGHT, this.highlightElement.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.HOVER, this.updateElementHover.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.OUT, this.updateElementHover.bind(this));
        this.events.on(event_catalog_1.default.CHART.OUT, this.updateElementHover.bind(this));
    }
    // Initialization and updating config or accessors
    Polar.prototype.updateOptions = function (options) {
        Utils.assignOptions(this, options);
    };
    Polar.prototype.setData = function (data) {
        this.data = data || [];
    };
    // Drawing
    Polar.prototype.draw = function () {
        this.compute();
        this.drawn ? this.updateDraw() : this.initialDraw();
    };
    Polar.prototype.initialDraw = function () {
        // groups
        this.el.append("svg:g").attr("class", "arcs");
        this.el.append("svg:g").attr("class", styles.total);
        this.updateDraw();
        this.drawn = true;
    };
    Polar.prototype.updateDraw = function () {
        var config = this.state.current.get("config");
        var duration = config.duration;
        var minTotalFontSize = config.minTotalFontSize;
        var drawingDims = this.state.current.get("computed").canvas
            .drawingContainerDims;
        // Remove focus before updating chart
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.OUT);
        // Center coordinate system
        this.currentTranslation = Utils.computeTranslate(drawingDims);
        this.el.attr("transform", Utils.translateString(this.currentTranslation));
        // Arcs
        var arcs = Utils.createArcGroups(this.el, this.computed.data, this.key);
        // Exit
        Utils.exitArcs(arcs, duration, this.removeArcTween.bind(this));
        // Enter
        Utils.enterArcs(arcs, this.onMouseOver.bind(this), this.onMouseOut.bind(this));
        // Update
        var updatingArcs = arcs.merge(arcs.enter().selectAll("g." + styles.arc));
        d3_utils_1.setPathAttributes(updatingArcs.select("path"), this.arcAttributes(), duration, this.fitToCanvas.bind(this));
        d3_utils_1.setTextAttributes(updatingArcs.select("text"), Utils.textAttributes(this.computed), duration);
        // Total / center text
        var options = { minTotalFontSize: minTotalFontSize, innerRadius: this.computed.rInner, yOffset: TOTAL_Y_OFFSET };
        Utils.updateTotal(this.el, this.centerDisplayString(), duration, options);
    };
    Polar.prototype.arcAttributes = function () {
        return {
            path: this.arcTween.bind(this),
            fill: this.color.bind(this),
        };
    };
    Polar.prototype.fitToCanvas = function () {
        // Reset current translation
        this.currentTranslation = [0, 0];
        this.el.attr("transform", Utils.translateString(this.currentTranslation));
        var current = this.el.node().getBoundingClientRect();
        var drawing = this.state.current.get("computed").canvas.drawingContainerRect;
        if (current.width === 0 && current.height === 0) {
            return;
        }
        var margin = this.state.current.get("config").outerBorderMargin;
        var scale = Math.min((drawing.width - 2 * margin) / current.width, (drawing.height - 2 * margin) / current.height);
        this.computeArcs(this.computed);
        this.el.selectAll("path").attr("d", this.computed.arc);
        var newCurrent = this.el.node().getBoundingClientRect();
        var topOffset = this.state.current.get("computed").canvas.legend.node().offsetHeight;
        this.currentTranslation = [
            (drawing.width - newCurrent.width) / 2 + drawing.left - newCurrent.left,
            (drawing.height - newCurrent.height) / 2 + drawing.top - newCurrent.top,
        ];
        this.el.attr("transform", Utils.translateString(this.currentTranslation));
    };
    // Interpolate the arcs in data space.
    Polar.prototype.arcTween = function (d, i) {
        var _this = this;
        var old = this.previousComputed.data || [];
        var s0;
        var e0;
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
            s0 = 0;
            e0 = 0;
        }
        var f = d3_interpolate_1.interpolateObject({ endAngle: e0, startAngle: s0 }, { endAngle: d.endAngle, startAngle: d.startAngle });
        return function (t) { return _this.computed.arc(fp_1.extend(f(t))(d)); };
    };
    Polar.prototype.removeArcTween = function (d, i) {
        var _this = this;
        var s0;
        var e0;
        s0 = e0 = ANGLE_RANGE[1];
        // Value is needed to interpolate the radius as well as the angles.
        var f = d3_interpolate_1.interpolateObject({ endAngle: d.endAngle, startAngle: d.startAngle, value: d.value }, { endAngle: e0, startAngle: s0, value: d.value });
        return function (t) { return _this.computed.arc(f(t)); };
    };
    Polar.prototype.centerDisplayString = function () {
        return this.computed.rInner > 0 ? this.computed.total.toString() : "";
    };
    // Data computation / preparation
    Polar.prototype.compute = function () {
        this.previousComputed = this.computed;
        var d = {
            layout: Utils.layout(this.angleValue, ANGLE_RANGE),
            total: Utils.computeTotal(this.data, this.value),
        };
        // data should not become part of this.previousComputed in first computation
        this.previousComputed = fp_1.defaults(d)(this.previousComputed);
        Utils.calculatePercentages(this.data, this.angleValue, d.total);
        var data = d.layout(this.data);
        this.computed = __assign({}, d, this.computeArcs(__assign({ data: data }, d)), { data: data });
    };
    Polar.prototype.angleValue = function () {
        return 1;
    };
    Polar.prototype.computeArcs = function (computed) {
        var drawingDims = this.state.current.get("computed").canvas
            .drawingContainerDims, r = this.computeOuterRadius(drawingDims), rInner = this.computeInnerRadius(computed.data, r), rHover = this.hoverOuterRadius(r), rInnerHover = Math.max(rInner - 1, 0);
        return {
            r: r,
            rInner: rInner,
            rHover: rHover,
            rInnerHover: rInnerHover,
            arc: d3_shape_1.arc()
                .innerRadius(rInner)
                .outerRadius(r),
            arcOver: d3_shape_1.arc()
                .innerRadius(rInnerHover)
                .outerRadius(rHover),
        };
    };
    Polar.prototype.computeOuterRadius = function (drawingDims, scaleFactor) {
        var _this = this;
        if (scaleFactor === void 0) { scaleFactor = 1; }
        var domainMax = fp_1.max(fp_1.map(function (datum) { return _this.value(datum); })(this.data));
        var scale = d3_scale_1.scaleSqrt()
            .range([
            this.state.current.get("config").minInnerRadius,
            Math.min(drawingDims.width, drawingDims.height) / 2 - this.state.current.get("config").outerBorderMargin,
        ])
            .domain([0, domainMax]);
        return function (d) { return scale(_this.value(d)) * scaleFactor; };
    };
    Polar.prototype.computeInnerRadius = function (data, outerRadius) {
        var options = this.state.current.get("config");
        var minWidth = this.minSegmentWidth || MIN_SEGMENT_WIDTH;
        var maxWidth = options.maxWidth;
        var minOuterRadius = fp_1.min(fp_1.map(outerRadius)(data));
        // Space is not enough, don't render
        var width = minOuterRadius - options.minInnerRadius;
        return width < minWidth ? 0 : minOuterRadius - Math.min(width, maxWidth);
    };
    Polar.prototype.hoverOuterRadius = function (radius) {
        return function (d) { return radius(d) + 1; };
    };
    // Event listeners / handlers
    Polar.prototype.onMouseOver = function (d) {
        var datumInfo = {
            key: this.key(d),
            value: this.value(d),
            percentage: d.data.percentage,
        };
        var centroid = Utils.translateBack(this.computed.arcOver.centroid(d), this.currentTranslation);
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.HOVER, { d: datumInfo, focusPoint: { centroid: centroid } });
    };
    Polar.prototype.updateElementHover = function (datapoint) {
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
    Polar.prototype.highlightElement = function (key) {
        var _this = this;
        var d = fp_1.find(function (datum) { return _this.key(datum) === key; })(this.computed.data);
        if (!d) {
            return;
        }
        this.onMouseOver(d);
    };
    Polar.prototype.onMouseOut = function () {
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.OUT);
    };
    // External methods
    Polar.prototype.dataForLegend = function () {
        var _this = this;
        return fp_1.map(function (datum) {
            return {
                label: _this.key(datum),
                color: _this.color(datum),
            };
        })(this.data);
    };
    // Remove & clean up
    Polar.prototype.remove = function () {
        if (this.drawn) {
            this.el.remove();
            this.drawn = false;
        }
    };
    return Polar;
}());
exports.default = Polar;
//# sourceMappingURL=polar.js.map