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
var fp_1 = require("lodash/fp");
var Canvas = /** @class */ (function (_super) {
    __extends(Canvas, _super);
    function Canvas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Canvas.prototype.createEl = function () {
        var el = d3.select(document.createElementNS(d3.namespaces["svg"], "svg"))
            .attr("class", "processflow");
        this.stateWriter("elRect", el.node().getBoundingClientRect());
        return el;
    };
    Canvas.prototype.createInitialElements = function () {
        this.insertDrawingGroups();
        this.insertFocusLabel();
    };
    Canvas.prototype.insertDrawingGroups = function () {
        var _this = this;
        fp_1.forEach(function (group) {
            _this.el.append("svg:g")
                .attr("class", group + "-group");
        })(["links", "nodes"]);
    };
    Canvas.prototype.draw = function () {
        var config = this.state.current.get("config"), series = this.state.current.get("computed").series;
        this.container.style("width", series.width + "px").style("height", series.height + "px");
        this.el.style("width", series.width + "px").style("height", series.height + "px");
        this.container.classed("hidden", config.hidden);
    };
    Canvas.prototype.mouseOverElement = function () {
        return this.el;
    };
    return Canvas;
}(abstract_canvas_1.default));
exports.default = Canvas;
//# sourceMappingURL=canvas.js.map