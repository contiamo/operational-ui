"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var d3 = require("d3-selection");
var d3_scale_1 = require("d3-scale");
var node_1 = require("../node");
var d3_utils_1 = require("../../utils/d3_utils");
var event_catalog_1 = require("../../utils/event_catalog");
var AbstractRenderer = /** @class */ (function () {
    function AbstractRenderer(state, events, el) {
        this.state = state;
        this.events = events;
        this.el = el;
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.HIGHLIGHT, this.focusElement.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT, this.removeHighlights.bind(this));
    }
    AbstractRenderer.prototype.onMouseOver = function (d, element) {
        this.mouseOver(d3.select(element), d);
    };
    AbstractRenderer.prototype.mouseOver = function (element, d) {
        this.highlight(element, d);
        var focusPoint = this.focusPoint(element, d);
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOVER, { focusPoint: focusPoint, d: d });
        element.classed("hover", true).on("mouseleave", d3_utils_1.withD3Element(this.onMouseOut.bind(this)));
    };
    AbstractRenderer.prototype.focusElement = function (elementInfo) {
        var _this = this;
        if (elementInfo.type !== this.type) {
            return;
        }
        this.el
            .selectAll(this.focusElementAccessor)
            .filter(function (d) {
            return fp_1.every.convert({ cap: false })(function (value, matcher) {
                return fp_1.invoke(matcher)(d) === value;
            })(elementInfo.matchers);
        })
            .each(d3_utils_1.withD3Element(function (d, el) {
            _this.mouseOver(d3.select(el), d);
        }));
    };
    AbstractRenderer.prototype.highlight = function (element, d) {
        this.removeHighlights();
        element.classed("highlighted", true).attr("stroke", this.config.highlightColor);
    };
    // Remove any old highlights (needed if an element has been manually focussed)
    AbstractRenderer.prototype.removeHighlights = function () {
        var _this = this;
        this.el
            .selectAll(".highlighted")
            .attr("stroke", function (d) {
            return d instanceof node_1.default ? _this.config.borderColor : d.stroke();
        })
            .classed("highlighted", false);
    };
    AbstractRenderer.prototype.onMouseOut = function (d, el) {
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT);
        var element = d3.select(el);
        element.classed("hover", false);
    };
    AbstractRenderer.prototype.draw = function (data) {
        this.data = data;
        this.config = this.state.current.get("config");
        this.updateDraw();
    };
    AbstractRenderer.prototype.exit = function (elementGroups) {
        elementGroups
            .exit()
            .on("mouseenter", null)
            .on("mouseleave", null)
            .remove();
    };
    AbstractRenderer.prototype.sizeScale = function (range) {
        var sizes = fp_1.map(function (el) { return el.size(); })(this.data);
        return d3_scale_1.scaleLinear()
            .domain([0, Math.max.apply(Math, sizes)])
            .range(range);
    };
    return AbstractRenderer;
}());
exports.default = AbstractRenderer;
//# sourceMappingURL=abstract_renderer.js.map