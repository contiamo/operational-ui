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
var event_catalog_1 = require("../../utils/event_catalog");
var fp_1 = require("lodash/fp");
var d3_interpolate_1 = require("d3-interpolate");
var d3_scale_1 = require("d3-scale");
var styles = require("./styles");
var Gauge = /** @class */ (function (_super) {
    __extends(Gauge, _super);
    function Gauge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Gauge.prototype.checkData = function () {
        if (!this.target) {
            throw new Error("No target value provided for gauge");
        }
    };
    Gauge.prototype.computeOuter = function (width, height) {
        return this.extent === "full"
            ? _super.prototype.computeOuter.call(this, width, height)
            : Math.min(width / 2, height) - this.state.current.get("config").outerBorderMargin;
    };
    Gauge.prototype.runningTotal = function () {
        return fp_1.reduce(function (memo, datapoint) {
            var previous = fp_1.last(memo) || 0;
            memo.push(previous + datapoint.value);
            return memo;
        }, [])(this.data);
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
    Gauge.prototype.centerDisplayString = function () {
        return [this.total + " / " + this.target];
    };
    Gauge.prototype.compute = function () {
        this.computeTotal();
        this.fillGaugeExtent();
        _super.prototype.compute.call(this);
        this.computed.comparison = this.comparison;
    };
    Gauge.prototype.updateDraw = function () {
        _super.prototype.updateDraw.call(this);
        // Comparison line
        this.updateComparison();
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
    Gauge.prototype.onMouseOver = function (d) {
        if (d.data.unfilled) {
            this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.OUT);
            return;
        }
        _super.prototype.onMouseOver.call(this, d);
    };
    Gauge.prototype.totalForPercentages = function () {
        return this.target;
    };
    // Establish coordinate system with 0,0 being the center of the width, height rectangle
    Gauge.prototype.computeTranslate = function () {
        var drawingDims = this.state.current.get("computed").canvas.drawingContainerDims;
        var yTranslate = this.extent === "full" ? drawingDims.height / 2 : (drawingDims.height + this.computed.r) / 2;
        this.currentTranslation = [drawingDims.width / 2, yTranslate];
        return this.currentTranslation;
    };
    // Helpers
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
        var f = d3_interpolate_1.interpolateObject({ endAngle: e0, startAngle: s0 }, { endAngle: d.endAngle, startAngle: d.startAngle });
        return function (t) { return _this.computed.arc(f(t)); };
    };
    Gauge.prototype.lineTween = function (comparison) {
        var _this = this;
        // Need to rotate range by 90 degrees, since in d3 pie layout, '0' is vertical above origin.
        // Here, we need '0' to be horizontal to left of origin.
        var range = fp_1.map(function (value) { return value + Math.PI / 2; })(this.angleRange()), angle = function (d) {
            return d3_scale_1.scaleLinear()
                .range(range)
                .domain([0, _this.target])(_this.value(d));
        }, xOuter = function (d) { return -d.r * Math.cos(angle(d)); }, yOuter = function (d) { return -d.r * Math.sin(angle(d)); }, xInner = function (d) { return -d.inner * Math.cos(angle(d)); }, yInner = function (d) { return -d.inner * Math.sin(angle(d)); }, path = function (d) { return "M" + [xInner(d), yInner(d)].join(",") + "L" + [xOuter(d), yOuter(d)].join(","); }, oldValue = this.previous.comparison ? this.value(this.previous.comparison) : 0, f = d3_interpolate_1.interpolateObject({ inner: this.previous.inner || this.computed.inner, r: this.previous.r || this.computed.r, value: oldValue }, { inner: this.computed.inner, r: this.computed.r, value: this.value(comparison) });
        return function (t) { return path(f(t)); };
    };
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
    return Gauge;
}(abstract_renderer_1.default));
exports.default = Gauge;
//# sourceMappingURL=gauge.js.map