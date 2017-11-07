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
        var linkGroups = this.el.select("g.links-group")
            .selectAll("g.link-group")
            .data(this.data, function (link) { return link.sourceId() + ";" + link.targetId(); });
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
        var scale = this.sizeScale([this.config.minLinkWidth, this.config.maxLinkWidth]), borderScale = this.linkBorderScale(scale), opacityScale = this.sizeScale([MINOPACITY, MAXOPACITY]), ctx = this;
        linkGroups
            .enter()
            .append("g")
            .attr("class", "link-group")
            .each(function (d) {
            // Append link "border" element - transparent element behind link.
            d3
                .select(this)
                .append("path")
                .attr("class", "link " + styles.border)
                .attr("d", ctx.linkStartPath.bind(ctx))
                .attr("stroke-width", "0px")
                .on("mouseenter", d3_utils_1.withD3Element(ctx.onMouseOver.bind(ctx)))
                .attr("opacity", 0);
            // Append link
            d3
                .select(this)
                .append("path")
                .attr("class", "link " + styles.element)
                .attr("d", ctx.linkStartPath.bind(ctx))
                .attr("fill", "none")
                .attr("stroke-width", "0px");
        })
            .merge(linkGroups)
            .each(function (d) {
            // Update link border
            d3
                .select(this)
                .select("path.link." + styles.border)
                .attr("stroke", ctx.config.borderColor)
                .transition()
                .duration(ctx.config.duration)
                .ease(d3_ease_1.easeCubicInOut)
                .attr("d", ctx.linkPath.bind(ctx))
                .attr("stroke-width", function (d) { return borderScale(d.size()) + "px"; })
                .attr("stroke-dasharray", function (d) { return d.dash(); });
            // Update link
            d3
                .select(this)
                .select("path.link." + styles.element)
                .attr("stroke", function (d) { return d.stroke(); })
                .transition()
                .duration(ctx.config.duration)
                .ease(d3_ease_1.easeCubicInOut)
                .attr("d", ctx.linkPath.bind(ctx))
                .attr("stroke-width", function (d) { return scale(d.size()) + "px"; })
                .attr("stroke-dasharray", function (d) { return d.dash(); })
                .attr("opacity", function (d) { return opacityScale(d.size()); });
        });
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
        // Highlight path.element when `path.${styles.border}` is hovered
        var pathEl = this.el.selectAll("path.link." + styles.element)
            .filter(function (link) {
            return link.sourceId() === d.sourceId() && link.targetId() === d.targetId();
        });
        _super.prototype.highlight.call(this, pathEl, d);
        // Highlight source and target nodes as well as link
        var ctx = this;
        this.el.selectAll("path.node." + styles.border)
            .filter(function (node) { return node.id() === d.sourceId() || node.id() === d.targetId(); })
            .each(function (node) {
            d3.select(this).classed("highlighted", true).attr("stroke", ctx.config.highlightColor);
        });
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
            id: d.sourceId() + "->" + d.targetId(),
        };
    };
    return Links;
}(abstract_renderer_1.default));
exports.default = Links;
//# sourceMappingURL=links.js.map