"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_renderer_1 = require("./abstract_renderer");
require("d3-transition");
var fp_1 = require("lodash/fp");
var d3_interpolate_1 = require("d3-interpolate");
var d3_scale_1 = require("d3-scale");
var MIN_SEGMENT_WIDTH = 5;
function radiusValue(d) {
    return d.data ? d.data.value : d.value;
}
var Polar = /** @class */ (function (_super) {
    __extends(Polar, _super);
    function Polar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Polar.prototype.onTransitionEnd = function () {
        this.fitToCanvas();
    };
    Polar.prototype.fitToCanvas = function () {
        // Reset current translation
        this.currentTranslation = [0, 0];
        this.el.attr("transform", this.translateString(this.currentTranslation));
        var current = this.el.node().getBoundingClientRect(), drawing = this.state.current.get("computed").canvas.drawingContainerRect;
        if (current.width === 0 && current.height === 0) {
            return;
        }
        var margin = this.state.current.get("config").outerBorderMargin;
        var scale = Math.min((drawing.width - 2 * margin) / current.width, (drawing.height - 2 * margin) / current.height);
        this.computeArcs(scale);
        this.el.selectAll("path").attr("d", this.computed.arc);
        var newCurrent = this.el.node().getBoundingClientRect(), topOffset = this.state.current.get("computed").canvas.legends.top.left.node().offsetHeight;
        this.currentTranslation = [
            (drawing.width - newCurrent.width) / 2 + drawing.left - newCurrent.left,
            (drawing.height - newCurrent.height) / 2 + drawing.top - newCurrent.top
        ];
        this.el.attr("transform", this.translateString(this.currentTranslation));
    };
    Polar.prototype.computeOuter = function (width, height, scaleFactor) {
        var _this = this;
        if (scaleFactor === void 0) { scaleFactor = 1; }
        var domainMax = fp_1.max(fp_1.map(function (datum) { return _this.value(datum); })(this.data));
        var scale = d3_scale_1.scaleSqrt()
            .range([
            this.state.current.get("config").minInnerRadius,
            Math.min(width, height) / 2 - this.state.current.get("config").outerBorderMargin
        ])
            .domain([0, domainMax]);
        return function (d) { return scale(radiusValue(d)) * scaleFactor; };
    };
    Polar.prototype.computeInner = function (outerRadius) {
        var options = this.state.current.get("config");
        var minWidth = this.minSegmentWidth || MIN_SEGMENT_WIDTH;
        var maxWidth = options.maxWidth;
        var minOuterRadius = fp_1.min(fp_1.map(outerRadius)(this.computed.data));
        // Space is not enough, don't render
        var width = minOuterRadius - options.minInnerRadius;
        return width < minWidth ? 0 : minOuterRadius - Math.min(width, maxWidth);
    };
    Polar.prototype.hoverOuter = function (radius) {
        return function (d) { return radius(d) + 1; };
    };
    Polar.prototype.angleValue = function (d) {
        return 1;
    };
    // Establish coordinate system with 0,0 being the center of the width, height rectangle
    Polar.prototype.computeTranslate = function () {
        var drawingDims = this.state.current.get("computed").canvas.drawingContainerDims;
        this.currentTranslation = [drawingDims.width / 2, drawingDims.height / 2];
        return this.currentTranslation;
    };
    // Helpers
    Polar.prototype.totalForPercentages = function () {
        this.computeTotal();
        return this.total;
    };
    Polar.prototype.centerDisplayString = function () {
        return this.computed.inner > 0 ? [this.computed.total.toString()] : [];
    };
    Polar.prototype.totalYOffset = function () {
        return "0.35em";
    };
    // Interpolate the arcs in data space.
    Polar.prototype.arcTween = function (d, i) {
        var _this = this;
        var old = this.previous.data || [];
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
        s0 = e0 = this.angleRange()[1];
        // Value is needed to interpolate the radius as well as the angles.
        var f = d3_interpolate_1.interpolateObject({ endAngle: d.endAngle, startAngle: d.startAngle, value: d.value }, { endAngle: e0, startAngle: s0, value: d.value });
        return function (t) { return _this.computed.arc(f(t)); };
    };
    Polar.prototype.angleRange = function () {
        return [0, 2 * Math.PI];
    };
    return Polar;
}(abstract_renderer_1.default));
exports.default = Polar;
//# sourceMappingURL=polar.js.map