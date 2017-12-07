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
var d3 = require("d3-selection");
require("d3-transition");
var d3_ease_1 = require("d3-ease");
var d3_utils_1 = require("../../utils/d3_utils");
var styles = require("./styles");
var fp_1 = require("lodash/fp");
var MINOPACITY = 0.5, MAXOPACITY = 1;
var Links = /** @class */ (function (_super) {
    __extends(Links, _super);
    function Links() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "link";
        _this.focusElementAccessor = "path.link." + styles.element;
        return _this;
    }
    Links.prototype.updateDraw = function () {
        var linkGroups = this.el
            .select("g.links-group")
            .selectAll("g.link-group")
            .data(this.data, function (d) { return d.sourceId() + ";" + d.targetId(); });
        this.exit(linkGroups);
        this.enterAndUpdate(linkGroups);
    };
    Links.prototype.linkBorderScale = function (scale) {
        var _this = this;
        return function (size) {
            return scale(size) + 2 * _this.config.linkBorderWidth;
        };
    };
    Links.prototype.enterAndUpdate = function (linkGroups) {
        var _this = this;
        var scale = this.sizeScale([this.config.minLinkWidth, this.config.maxLinkWidth]), borderScale = this.linkBorderScale(scale), opacityScale = this.sizeScale([MINOPACITY, MAXOPACITY]);
        linkGroups
            .enter()
            .append("g")
            .attr("class", "link-group")
            .each(d3_utils_1.withD3Element(function (d, el) {
            var element = d3.select(el);
            // Append link "border" element - transparent element behind link.
            element
                .append("path")
                .attr("class", "link " + styles.border)
                .attr("d", _this.linkStartPath.bind(_this))
                .attr("stroke-width", "0px")
                .on("mouseenter", d3_utils_1.withD3Element(_this.onMouseOver.bind(_this)))
                .attr("opacity", 0);
            // Append link
            element
                .append("path")
                .attr("class", "link " + styles.element)
                .attr("d", _this.linkStartPath.bind(_this))
                .attr("fill", "none")
                .attr("stroke-width", "0px");
        }))
            .merge(linkGroups)
            .each(d3_utils_1.withD3Element(function (d, el) {
            var element = d3.select(el);
            // Update link border
            element
                .select("path.link." + styles.border)
                .attr("stroke", _this.config.borderColor)
                .transition()
                .duration(_this.config.duration)
                .ease(d3_ease_1.easeCubicInOut)
                .attr("d", _this.linkPath.bind(_this))
                .attr("stroke-width", borderScale(d.size()) + "px")
                .attr("stroke-dasharray", d.dash());
            // Update link
            element
                .select("path.link." + styles.element)
                .attr("stroke", d.stroke())
                .transition()
                .duration(_this.config.duration)
                .ease(d3_ease_1.easeCubicInOut)
                .attr("d", _this.linkPath.bind(_this))
                .attr("stroke-width", scale(d.size()) + "px")
                .attr("stroke-dasharray", d.dash())
                .attr("opacity", opacityScale(d.size()));
        }));
    };
    // Paths start as a single point at the source node. If the source node has already been rendered,
    // use its position at the start of the transition.
    Links.prototype.linkStartPath = function (link) {
        var previousData = this.state.previous.get("computed").series.data, previousNodes = previousData ? previousData.nodes : [], existingSource = fp_1.find(function (node) { return node.id() === link.sourceId(); })(previousNodes), x = existingSource ? existingSource.x : link.source().x, y = existingSource ? existingSource.y : link.source().y;
        return "M" + x + "," + y + "L" + x + "," + y;
    };
    Links.prototype.linkPath = function (link) {
        var xStart = link.source().x, yStart = link.source().y, xEnd = link.target().x, yEnd = link.target().y, xMid = (xStart + xEnd) / 2, yMid = (yStart + yEnd) / 2;
        return "M" + xStart + "," + yStart + "L" + xMid + "," + yMid + "L" + xEnd + "," + yEnd;
    };
    Links.prototype.highlight = function (element, d) {
        var _this = this;
        // Highlight path.element when `path.${styles.border}` is hovered
        var pathEl = this.el.selectAll("path.link." + styles.element).filter(function (link) {
            return link.sourceId() === d.sourceId() && link.targetId() === d.targetId();
        });
        _super.prototype.highlight.call(this, pathEl, d);
        // Highlight source and target nodes as well as link
        this.el
            .selectAll("path.node." + styles.border)
            .filter(function (node) { return node.id() === d.sourceId() || node.id() === d.targetId(); })
            .each(d3_utils_1.withD3Element(function (node, el) {
            d3
                .select(el)
                .classed("highlighted", true)
                .attr("stroke", _this.config.highlightColor);
        }));
    };
    Links.prototype.focusPoint = function (element, d) {
        if (d == null)
            return;
        var scale = this.sizeScale([this.config.minLinkWidth, this.config.maxLinkWidth]);
        return {
            offset: scale(d.size()) / 2,
            type: "link",
            x: (d.source().x + d.target().x) / 2,
            y: (d.source().y + d.target().y) / 2,
            id: d.sourceId() + "->" + d.targetId()
        };
    };
    return Links;
}(abstract_renderer_1.default));
exports.default = Links;
//# sourceMappingURL=links.js.map