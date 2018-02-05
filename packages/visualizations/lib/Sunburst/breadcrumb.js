"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("../utils/event_catalog");
var fp_1 = require("lodash/fp");
var styles = require("./styles");
var dims = {
    width: 70,
    height: 20,
    space: 3,
    tip: 7
};
var breadcrumbPolygonStart = "0,0 " + dims.width + ", 0 " + (dims.width + dims.tip) + ", " + dims.height / 2 + " " + dims.width + ", " + dims.height + " 0, " + dims.height;
var breadcrumbPolygon = "0,0 " + dims.width + ",0 " + (dims.width + dims.tip) + "," + dims.height / 2 + " " + dims.width + "," + dims.height + " 0," + dims.height + " " + dims.tip + "," + dims.height / 2;
var Breadcrumb = /** @class */ (function () {
    function Breadcrumb(state, stateWriter, events, el) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
        this.el.insert("svg:svg", ":first-child");
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.CLICK, this.updateHoverPath.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOVER, this.updateHoverPath.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT, this.updateHoverPath.bind(this));
    }
    Breadcrumb.prototype.updateHoverPath = function (payload) {
        var computed = this.state.current.get("computed").renderer;
        var fixedNode = computed.zoomNode || computed.topNode;
        var nodeArray = payload.d ? payload.d.ancestors().reverse() : fixedNode.ancestors().reverse();
        var percentageString = nodeArray.length > 1 ? (fp_1.last(nodeArray).value * 100 / computed.topNode.value).toPrecision(3) + "%" : "";
        this.update(nodeArray, percentageString);
    };
    Breadcrumb.prototype.breadcrumbPoints = function (d, i) {
        return i > 0 ? breadcrumbPolygon : breadcrumbPolygonStart;
    };
    Breadcrumb.prototype.label = function (d, i) {
        // Pixel width of character approx 1/2 of font-size - allow 7px per character
        var desiredPixelWidth = dims.width - (i > 0 ? dims.tip : 0) - dims.tip - 2 * dims.space, numberOfCharacters = desiredPixelWidth / 7;
        var name = d.data.name || "";
        return name.substring(0, numberOfCharacters) + (name.length > numberOfCharacters ? "..." : "");
    };
    Breadcrumb.prototype.update = function (nodeArray, percentage) {
        // Data join; key function combines name and depth (= position in sequence).
        var trail = this.el
            .select("svg")
            .selectAll("g")
            .data(nodeArray, function (d) { return d.data.name + d.depth; });
        // Remove exiting nodes.
        trail.exit().remove();
        // Add breadcrumb and label for entering nodes.
        var entering = trail.enter().append("svg:g");
        entering
            .append("svg:polygon")
            .attr("points", this.breadcrumbPoints)
            .style("fill", function (d) { return d.data.color || "#fff"; })
            .style("stroke", function (d) { return (d.data.color ? "none" : "000"); });
        entering
            .append("svg:text")
            .attr("x", function (d, i) { return (i > 0 ? dims.tip : 0) + dims.space; })
            .attr("y", dims.height / 2)
            .attr("dy", "0.35em")
            .text(this.label);
        // Merge enter and update selections; set position for all nodes.
        entering.merge(trail)
            .on("click", this.onClick.bind(this))
            .attr("transform", function (d, i) {
            return "translate(" + i * (dims.width + dims.space) + ", 0)";
        });
        // Update the explanation.
        this.el
            .select("." + styles.explanation)
            .style("visibility", function () { return (percentage.length > 0 ? "visible" : "hidden"); })
            .select(".percentage")
            .text(percentage);
    };
    Breadcrumb.prototype.onClick = function (d) {
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.CLICK, { d: d });
    };
    return Breadcrumb;
}());
exports.default = Breadcrumb;
//# sourceMappingURL=breadcrumb.js.map