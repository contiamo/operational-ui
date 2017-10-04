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
var abstract_canvas_1 = require("../utils/abstract_canvas");
var d3 = require("d3-selection");
var Canvas = /** @class */ (function (_super) {
    __extends(Canvas, _super);
    function Canvas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Canvas.prototype.createEl = function () {
        var el = d3.select(document.createElementNS(d3.namespaces["svg"], "svg")).attr("class", "processflow");
        return el;
    };
    Canvas.prototype.createInitialElements = function () {
        this.insertFocusLabel();
        this.defineMarker();
    };
    Canvas.prototype.defineMarker = function () {
        // Add arrow marker definition for link paths
        this.el
            .append("defs")
            .append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "-7 -6 14 12")
            .attr("markerWidth", 16)
            .attr("markerHeight", 12)
            .attr("markerUnits", "userSpaceOnUse")
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M-5,-5L5,0L-5,5");
    };
    return Canvas;
}(abstract_canvas_1.default));
exports.default = Canvas;
//# sourceMappingURL=canvas.js.map