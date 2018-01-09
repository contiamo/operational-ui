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
var d3_interpolate_1 = require("d3-interpolate");
var Donut = /** @class */ (function (_super) {
    __extends(Donut, _super);
    function Donut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Establish coordinate system with 0,0 being the center of the width, height rectangle
    Donut.prototype.computeTranslate = function () {
        var drawingDims = this.state.current.get("computed").canvas.drawingContainerDims;
        this.currentTranslation = [drawingDims.width / 2, drawingDims.height / 2];
        return this.currentTranslation;
    };
    // Helpers
    Donut.prototype.totalForPercentages = function () {
        this.computeTotal();
        return this.total;
    };
    Donut.prototype.centerDisplayString = function () {
        return this.computed.inner > 0 ? [this.computed.total.toString()] : [];
    };
    Donut.prototype.totalYOffset = function () {
        return "0.35em";
    };
    // Interpolate the arcs in data space.
    Donut.prototype.arcTween = function (d, i) {
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
        return function (t) { return _this.computed.arc(f(t)); };
    };
    Donut.prototype.angleRange = function () {
        return [0, 2 * Math.PI];
    };
    return Donut;
}(abstract_renderer_1.default));
exports.default = Donut;
//# sourceMappingURL=donut.js.map