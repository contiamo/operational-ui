"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3-selection");
require("d3-transition");
var d3_ease_1 = require("d3-ease");
var d3_utils_1 = require("../../utils/d3_utils");
var styles = require("./styles");
var fp_1 = require("lodash/fp");
var event_catalog_1 = require("../../utils/event_catalog");
var renderer_utils_1 = require("./renderer_utils");
var MINOPACITY = 0.5, MAXOPACITY = 1;
var path = function (link) {
    var xStart = link.source().x, yStart = link.source().y, xEnd = link.target().x, yEnd = link.target().y, xMid = (xStart + xEnd) / 2, yMid = (yStart + yEnd) / 2;
    return "M" + xStart + "," + yStart + "L" + xMid + "," + yMid + "L" + xEnd + "," + yEnd;
};
var Links = /** @class */ (function () {
    function Links(state, events, el) {
        this.state = state;
        this.events = events;
        this.el = el;
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT, this.removeHighlights.bind(this));
    }
    Links.prototype.onMouseOver = function (d, element) {
        this.mouseOver(d3.select(element), d);
    };
    Links.prototype.mouseOver = function (element, d, hideLabel) {
        if (hideLabel === void 0) { hideLabel = false; }
        this.highlight(element, d);
        var focusPoint = this.focusPoint(element, d);
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOVER, { focusPoint: focusPoint, d: d, hideLabel: hideLabel });
        element.on("mouseleave", this.onMouseOut.bind(this));
    };
    Links.prototype.focusElement = function (focusElement) {
        var _this = this;
        this.el
            .selectAll("path.link." + styles.element)
            .filter(renderer_utils_1.filterByMatchers(focusElement.matchers))
            .each(d3_utils_1.withD3Element(function (d, el) {
            _this.mouseOver(d3.select(el), d, focusElement.hideLabel);
        }));
    };
    Links.prototype.highlight = function (element, d, keepCurrent) {
        var _this = this;
        if (keepCurrent === void 0) { keepCurrent = false; }
        if (!keepCurrent) {
            this.removeHighlights();
        }
        // Highlight path.element when `path.${styles.border}` is hovered
        var pathEl = this.el.selectAll("path.link." + styles.element).filter(function (link) {
            return link.sourceId() === d.sourceId() && link.targetId() === d.targetId();
        });
        pathEl.attr("stroke", this.config.highlightColor);
        // Highlight source and target nodes as well as link
        this.el
            .selectAll("path.node." + styles.border)
            .filter(function (node) { return node.id() === d.sourceId() || node.id() === d.targetId(); })
            .each(d3_utils_1.withD3Element(function (node, el) {
            d3.select(el).attr("stroke", _this.config.highlightColor);
        }));
    };
    // Remove any old highlights, including node highlighting (needed if an element has been manually focussed)
    Links.prototype.removeHighlights = function () {
        this.el.selectAll("path.node." + styles.border).attr("stroke", this.config.borderColor);
        this.el.selectAll("path.link." + styles.element).attr("stroke", function (d) { return d.stroke(); });
    };
    Links.prototype.focusPoint = function (element, d) {
        if (d == null)
            return;
        var scale = renderer_utils_1.sizeScale([this.config.minLinkWidth, this.config.maxLinkWidth], this.data);
        return {
            offset: scale(d.size()) / 2,
            type: "link",
            x: (d.source().x + d.target().x) / 2,
            y: (d.source().y + d.target().y) / 2,
            id: d.sourceId() + "->" + d.targetId()
        };
    };
    Links.prototype.onMouseOut = function () {
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT);
    };
    Links.prototype.draw = function (data) {
        this.data = data;
        this.config = this.state.current.get("config");
        var groups = this.el
            .select("g.links-group")
            .selectAll("g.link-group")
            .data(this.data, function (d) { return d.sourceId() + ";" + d.targetId(); });
        renderer_utils_1.exitGroups(groups);
        this.enterAndUpdate(groups);
    };
    Links.prototype.borderScale = function (scale) {
        var _this = this;
        return function (size) { return scale(size) + 2 * _this.config.linkBorderWidth; };
    };
    Links.prototype.enterAndUpdate = function (groups) {
        var scale = renderer_utils_1.sizeScale([this.config.minLinkWidth, this.config.maxLinkWidth], this.data), borderScale = this.borderScale(scale), opacityScale = renderer_utils_1.sizeScale([MINOPACITY, MAXOPACITY], this.data);
        var enteringGroups = groups
            .enter()
            .append("g")
            .attr("class", "link-group");
        enteringGroups
            .append("path")
            .attr("class", "link " + styles.border)
            .attr("d", this.startPath.bind(this))
            .attr("stroke-width", "0px")
            .on("mouseenter", d3_utils_1.withD3Element(this.onMouseOver.bind(this)))
            .attr("opacity", 0);
        enteringGroups
            .append("path")
            .attr("class", "link " + styles.element)
            .attr("d", this.startPath.bind(this))
            .attr("fill", "none")
            .attr("stroke-width", "0px");
        groups
            .merge(enteringGroups)
            .select("path.link." + styles.border)
            .attr("stroke", this.config.borderColor)
            .transition()
            .duration(this.config.duration)
            .ease(d3_ease_1.easeCubicInOut)
            .attr("d", path)
            .attr("stroke-width", function (d) { return borderScale(d.size()) + "px"; })
            .attr("stroke-dasharray", function (d) { return d.dash(); });
        groups
            .merge(enteringGroups)
            .select("path.link." + styles.element)
            .attr("stroke", function (d) { return d.stroke(); })
            .transition()
            .duration(this.config.duration)
            .ease(d3_ease_1.easeCubicInOut)
            .attr("d", path)
            .attr("stroke-width", function (d) { return scale(d.size()) + "px"; })
            .attr("stroke-dasharray", function (d) { return d.dash(); })
            .attr("opacity", function (d) { return opacityScale(d.size()); });
    };
    // Paths start as a single point at the source node. If the source node has already been rendered,
    // use its position at the start of the transition.
    Links.prototype.startPath = function (link) {
        var previousData = this.state.previous.get("computed").series.data, previousNodes = previousData ? previousData.nodes : [], existingSource = fp_1.find(function (node) { return node.id() === link.sourceId(); })(previousNodes), x = existingSource ? existingSource.x : link.source().x, y = existingSource ? existingSource.y : link.source().y;
        return "M" + x + "," + y + "L" + x + "," + y;
    };
    return Links;
}());
exports.default = Links;
//# sourceMappingURL=links.js.map