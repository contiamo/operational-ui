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
var drawing_canvas_1 = require("../utils/drawing_canvas");
var event_catalog_1 = require("../utils/event_catalog");
var d3 = require("d3-selection");
var Canvas = /** @class */ (function (_super) {
    __extends(Canvas, _super);
    function Canvas(state, stateWriter, events, context) {
        var _this = _super.call(this, state, stateWriter, events, context) || this;
        _this.mousePosition = _this.initialMousePosition();
        _this.appendShadows();
        _this.appendBackground();
        _this.appendDrawingGroup();
        _this.insertFocusElements();
        _this.insertLegend("top", "left");
        _this.elements.background.on("mouseover", function () {
            _this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.OUT);
        });
        _this.stateWriter("elements", _this.elements);
        return _this;
    }
    Canvas.prototype.createEl = function () {
        return d3.select(document.createElementNS(d3.namespaces["svg"], "svg"));
    };
    Canvas.prototype.appendShadows = function () {
        var shadow = this.elements.defs
            .append("filter")
            .attr("id", this.shadowDefinitionId())
            .attr("height", "130%");
        shadow
            .append("feGaussianBlur")
            .attr("in", "SourceAlpha")
            .attr("stdDeviation", "3");
        shadow
            .append("feOffset")
            .attr("dx", "2")
            .attr("dy", "2")
            .attr("result", "offsetblur");
        shadow
            .append("feComponentTransfer")
            .append("feFuncA")
            .attr("type", "linear")
            .attr("slope", "0.5");
        var shadowFeMerge = shadow.append("feMerge");
        shadowFeMerge.append("feMergeNode");
        shadowFeMerge.append("feMergeNode").attr("in", "SourceGraphic");
        this.stateWriter("shadowDefinitionId", this.shadowDefinitionId());
    };
    Canvas.prototype.initialMousePosition = function () {
        return {
            absolute: {
                x: undefined,
                y: undefined
            },
            relative: {
                x: undefined,
                y: undefined
            }
        };
    };
    Canvas.prototype.trackMouseMove = function () {
        var _this = this;
        var config = this.state.current.get("config");
        this.el.on("mousemove", function () {
            var event = d3.event, mouse = d3.mouse(_this.el.node());
            _this.mousePosition = {
                absolute: {
                    x: event.pageX,
                    y: event.pageY
                },
                relative: {
                    x: mouse[0],
                    y: mouse[1]
                }
            };
            _this.events.emit(event_catalog_1.default.CHART.MOVE, _this.mousePosition);
        });
    };
    Canvas.prototype.stopMouseMove = function () {
        this.el.on("mousemove", undefined);
    };
    Canvas.prototype.totalLegendHeight = function () {
        var legend = this.state.current.get("computed").canvas.legends.top.left;
        return legend.node().offsetHeight;
    };
    return Canvas;
}(drawing_canvas_1.default));
exports.default = Canvas;
//# sourceMappingURL=canvas.js.map