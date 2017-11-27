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
    AbstractRenderer.prototype.mouseOver = function (element, d, hideLabel) {
        if (hideLabel === void 0) { hideLabel = false; }
        this.highlight(element, d);
        var focusPoint = this.focusPoint(element, d);
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOVER, { focusPoint: focusPoint, d: d, hideLabel: hideLabel });
        element.classed("hover", true).on("mouseleave", d3_utils_1.withD3Element(this.onMouseOut.bind(this)));
    };
    AbstractRenderer.prototype.focusElement = function (focusElement) {
        var _this = this;
        if (focusElement.type === "path") {
            this.highlightPath(focusElement);
            return;
        }
        if (focusElement.type !== this.type) {
            return;
        }
        this.el
            .selectAll(this.focusElementAccessor)
            .filter(function (d) {
            return fp_1.every.convert({ cap: false })(function (value, matcher) {
                return fp_1.invoke(matcher)(d) === value;
            })(focusElement.matchers);
        })
            .each(d3_utils_1.withD3Element(function (d, el) {
            _this.mouseOver(d3.select(el), d, focusElement.hideLabel);
        }));
    };
    AbstractRenderer.prototype.highlightPath = function (focusElement) {
        var _this = this;
        if (this.type !== "link") {
            return;
        }
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT);
        var links = fp_1.reduce.convert({ cap: false })(function (memo, nodeId, i) {
            if (!focusElement.matchers.path[i + 1]) {
                return memo;
            }
            memo.push([nodeId, focusElement.matchers.path[i + 1]]);
            return memo;
        }, [])(focusElement.matchers.path);
        fp_1.forEach(function (link) {
            _this.el
                .selectAll(_this.focusElementAccessor)
                .filter(function (d) {
                return d.sourceId() === link[0] && d.targetId() === link[1];
            })
                .each(d3_utils_1.withD3Element(function (d, el) {
                _this.highlight(d3.select(el), d, true);
            }));
        })(links);
    };
    AbstractRenderer.prototype.highlight = function (element, d, keepCurrent) {
        if (keepCurrent === void 0) { keepCurrent = false; }
        if (!keepCurrent) {
            this.removeHighlights();
        }
        element
            .classed("highlighted", true)
            .attr("stroke", this.config.highlightColor);
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