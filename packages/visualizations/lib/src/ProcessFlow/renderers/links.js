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
var MINLINKWIDTH = 2;
var Links = /** @class */ (function (_super) {
    __extends(Links, _super);
    function Links() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Links.prototype.updateDraw = function () {
        var links = this.el
            .selectAll("path.link")
            .data(this.data, function (link) {
            return link.sourceId() + ";" + link.targetId();
        });
        this.exit(links.exit());
        this.enterAndUpdate(links);
    };
    Links.prototype.exit = function (exitLinks) {
        exitLinks
            .on("mouseenter", null)
            .on("mouseleave", null)
            .transition()
            .duration(this.config.duration)
            .style("opacity", 0)
            .remove();
    };
    Links.prototype.enterAndUpdate = function (links) {
        var scale = this.sizeScale([MINLINKWIDTH, this.config.maxLinkWidth]);
        links
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", this.linkStartPath.bind(this))
            .attr("stroke-width", "0px")
            .on("mouseenter", this.onMouseOver(this))
            .merge(links)
            .transition()
            .duration(1e3)
            .attr("d", this.linkPath.bind(this))
            .attr("stroke", function (d) {
            return d.stroke();
        })
            .attr("stroke-width", function (d) {
            return scale(d.size()) + "px";
        })
            .attr("stroke-dasharray", function (d) {
            return d.dash();
        })
            .attr("marker-mid", "url(#arrow)");
    };
    Links.prototype.linkStartPath = function (link) {
        var xStart = link.source().x, yStart = link.source().y;
        return "M" + xStart + "," + yStart + "L" + xStart + "," + yStart;
    };
    Links.prototype.linkPath = function (link) {
        var xStart = link.source().x, yStart = link.source().y, xEnd = link.target().x, yEnd = link.target().y, xMid = (xStart + xEnd) / 2, yMid = (yStart + yEnd) / 2;
        return "M" + xStart + "," + yStart + "L" + xMid + "," + yMid + "L" + xEnd + "," + yEnd;
    };
    Links.prototype.focusPoint = function (element, d) {
        if (d == null) {
            return;
        }
        var scale = this.sizeScale([MINLINKWIDTH, this.config.maxLinkWidth]);
        return {
            offset: scale(d.size()) / 2,
            type: "link",
            x: d.source().x,
            y: (d.source().y + d.target().y) / 2,
            id: d.sourceId() + "->" + d.targetId(),
        };
    };
    return Links;
}(abstract_renderer_1.default));
exports.default = Links;
//# sourceMappingURL=links.js.map