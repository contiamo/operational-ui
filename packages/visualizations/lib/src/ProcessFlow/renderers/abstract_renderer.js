"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var d3 = require("d3-selection");
var d3_scale_1 = require("d3-scale");
var event_catalog_1 = require("../../utils/event_catalog");
var AbstractRenderer = /** @class */ (function () {
    function AbstractRenderer(state, events, el) {
        this.state = state;
        this.events = events;
        this.el = el;
    }
    AbstractRenderer.prototype.onMouseOver = function (ctx) {
        return function (d) {
            ctx.mouseOver(d3.select(this), d);
        };
    };
    AbstractRenderer.prototype.mouseOver = function (element, d) {
        var focusPoint = this.focusPoint(element, d);
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.HOVER, { focusPoint: focusPoint, d: d });
        element.classed("hover", true).on("mouseleave", this.onMouseOut(this, focusPoint));
    };
    AbstractRenderer.prototype.onMouseOut = function (ctx, focusPoint) {
        return function (d) {
            ctx.events.emit(event_catalog_1.default.FOCUS.ELEMENT.OUT, focusPoint);
            d3.select(this).classed("hover", false);
        };
    };
    AbstractRenderer.prototype.draw = function (data) {
        this.data = data;
        this.config = this.state.current.get("config");
        this.updateDraw();
    };
    AbstractRenderer.prototype.sizeScale = function (range) {
        var sizes = fp_1.map(function (el) {
            return el.size();
        })(this.data);
        return d3_scale_1.scaleLinear()
            .domain([0, Math.max.apply(Math, sizes)])
            .range(range);
    };
    return AbstractRenderer;
}());
exports.default = AbstractRenderer;
//# sourceMappingURL=abstract_renderer.js.map