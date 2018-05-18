"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("../utils/event_catalog");
var styles = require("./styles");
var utils_1 = require("@operational/utils");
var ARROW_WIDTH = 7;
var Breadcrumb = /** @class */ (function () {
    function Breadcrumb(state, stateWriter, events, el) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.CLICK, this.updateHoverPath.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.HOVER, this.updateHoverPath.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.OUT, this.updateHoverPath.bind(this));
    }
    Breadcrumb.prototype.updateHoverPath = function (payload) {
        // Only display breadcrumb if drawing area is wide enough.
        var config = this.state.current.get("config");
        if (this.state.current.get("config").width < config.breadcrumbItemWidth * config.maxBreadcrumbLength + ARROW_WIDTH) {
            return;
        }
        var computed = this.state.current.get("computed").renderer;
        var fixedNode = computed.zoomNode || computed.topNode;
        if (!fixedNode || (payload.d && payload.d.data.empty)) {
            return;
        }
        var nodeArray = payload.d ? payload.d.ancestors().reverse() : fixedNode.ancestors().reverse();
        this.update(nodeArray);
    };
    Breadcrumb.prototype.label = function (d, i) {
        return d === "hops" ? "..." : d.name;
    };
    Breadcrumb.prototype.truncateNodeArray = function (nodeArray) {
        var maxLength = this.state.current.get("config").maxBreadcrumbLength;
        if (nodeArray.length <= maxLength) {
            return nodeArray;
        }
        var firstNodes = nodeArray.slice(0, 1);
        var lastNodes = nodeArray.slice(nodeArray.length - (maxLength - 2));
        return firstNodes.concat(["hops"]).concat(lastNodes);
    };
    Breadcrumb.prototype.backgroundColor = function (d) {
        return d === "hops" ? "#fff" : d.color || "#eee";
    };
    Breadcrumb.prototype.labelColor = function (d) {
        return utils_1.readableTextColor(this.backgroundColor(d), ["black", "white"]);
    };
    Breadcrumb.prototype.update = function (nodeArray) {
        var _this = this;
        var data = nodeArray.length > 1 ? this.truncateNodeArray(nodeArray) : [];
        // Data join; key function combines name and depth (= position in sequence).
        var trail = this.el.selectAll("div." + styles.breadcrumbItem).data(data, function (d) {
            return d === "hops" ? d : d.name + d.depth;
        });
        // Remove exiting nodes.
        trail.exit().remove();
        // Add breadcrumb and label for entering nodes.
        var itemWidth = function (d) { return d === "hops" ? 40 : _this.state.current.get("config").breadcrumbItemWidth; };
        var entering = trail
            .enter()
            .append("div")
            .attr("class", function (d) { return styles.breadcrumbItem + " " + (d === "hops" ? d : ""); })
            .style("background-color", this.backgroundColor)
            .style("width", function (d) { return itemWidth(d) + "px"; })
            .attr("title", this.label);
        entering
            .append("div")
            .attr("class", "label")
            .html(this.label)
            .style("color", this.labelColor.bind(this));
        entering.append("div").attr("class", "background-arrow");
        entering
            .append("div")
            .attr("class", "arrow")
            .style("border-left-color", this.backgroundColor);
        entering.merge(trail).on("click", this.onClick.bind(this));
    };
    Breadcrumb.prototype.onClick = function (d) {
        if (d === "hops") {
            return;
        }
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.CLICK, { d: d });
    };
    return Breadcrumb;
}());
exports.default = Breadcrumb;
//# sourceMappingURL=breadcrumb.js.map