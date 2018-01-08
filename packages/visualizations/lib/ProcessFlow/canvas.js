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
var canvas_1 = require("../utils/canvas");
var d3 = require("d3-selection");
var fp_1 = require("lodash/fp");
var Canvas = /** @class */ (function (_super) {
    __extends(Canvas, _super);
    function Canvas(state, stateWriter, events, context) {
        var _this = _super.call(this, state, stateWriter, events, context) || this;
        _this.focusEl = _this.insertFocusLabel();
        _this.appendDrawingGroups();
        return _this;
    }
    Canvas.prototype.createEl = function () {
        var el = d3
            .select(document.createElementNS(d3.namespaces["svg"], "svg"))
            .attr("class", "processflow");
        this.stateWriter("elRect", el.node().getBoundingClientRect());
        return el;
    };
    Canvas.prototype.appendDrawingGroups = function () {
        var _this = this;
        fp_1.forEach(function (group) {
            _this.el.append("svg:g").attr("class", group + "-group");
        })(["links", "nodes"]);
    };
    Canvas.prototype.mouseOverElement = function () {
        return this.el;
    };
    return Canvas;
}(canvas_1.default));
exports.default = Canvas;
//# sourceMappingURL=canvas.js.map