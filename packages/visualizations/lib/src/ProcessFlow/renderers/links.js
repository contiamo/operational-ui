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
require("d3-transition");
var d3_ease_1 = require("d3-ease");
var styles = require("./styles");
var MINOPACITY = 0.5, MAXOPACITY = 1;
var Links = /** @class */ (function (_super) {
    __extends(Links, _super);
    function Links() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Links.prototype.updateDraw = function () {
        var links = this.el
            .select("g")
            .selectAll("path." + styles.link)
            .data(this.data, function (link) { return link.sourceId() + ";" + link.targetId(); });
        this.exit(links);
        this.enterAndUpdate(links);
    };
    Links.prototype.enterAndUpdate = function (links) {
        var scale = this.sizeScale([this.config.minLinkWidth, this.config.maxLinkWidth]);
        var opacityScale = this.sizeScale([MINOPACITY, MAXOPACITY]);
        links.enter()
            .append("path")
            .attr("class", styles.link)
            .attr("d", this.linkStartPath.bind(this))
            .attr("stroke-width", "0px")
            .on("mouseenter", this.onMouseOver(this))
            .merge(links)
            .transition()
            .duration(this.config.duration)
            .ease(d3_ease_1.easeCubicInOut)
            .attr("d", this.linkPath.bind(this))
            .attr("stroke", function (d) { return d.stroke(); })
            .attr("stroke-width", function (d) { return scale(d.size()) + "px"; })
            .attr("stroke-dasharray", function (d) { return d.dash(); })
            .attr("opacity", function (d) { return opacityScale(d.size()); });
    };
    Links.prototype.linkStartPath = function (link) {
        var xStart = link.source().x, yStart = link.source().y;
        return "M" + xStart + "," + yStart + "L" + xStart + "," + yStart;
    };
    Links.prototype.linkPath = function (link) {
        var xStart = link.source().x, yStart = link.source().y, xEnd = link.target().x, yEnd = link.target().y, xMid = (xStart + xEnd) / 2, yMid = (yStart + yEnd) / 2;
        return "M" + xStart + "," + yStart + "L" + xMid + "," + yMid + "L" + xEnd + "," + yEnd;
    };
    Links.prototype.highlight = function (element, value) {
        var _this = this;
        element.attr("stroke", function (d) { return value ? _this.config.highlightColor : d.stroke(); });
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