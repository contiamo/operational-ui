"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("../utils/event_catalog");
var styles = require("./styles");
var dims = {
    width: 70,
    height: 20,
    space: 3,
    tip: 7
};
var Breadcrumb = /** @class */ (function () {
    function Breadcrumb(state, stateWriter, events, el) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.CLICK, this.updateHoverPath.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOVER, this.updateHoverPath.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT, this.updateHoverPath.bind(this));
    }
    Breadcrumb.prototype.updateHoverPath = function (payload) {
        var _this = this;
        var computed = this.state.current.get("computed").renderer;
        var fixedNode = computed.zoomNode || computed.topNode;
        var nodeArray = payload.d ? payload.d.ancestors().reverse() : fixedNode.ancestors().reverse();
        setTimeout(function () {
            _this.update(nodeArray);
        }, 1e2);
    };
    Breadcrumb.prototype.label = function (d, i) {
        return d === "hops" ? "..." : d.data.name;
    };
    Breadcrumb.prototype.truncateNodeArray = function (nodeArray) {
        if (nodeArray.length <= 5) {
            return nodeArray;
        }
        else {
            var firstNodes = nodeArray.slice(0, 2);
            var lastNodes = nodeArray.slice(nodeArray.length - 2);
            return firstNodes.concat(["hops"]).concat(lastNodes);
        }
    };
    Breadcrumb.prototype.update = function (nodeArray) {
        var data = nodeArray.length > 1 ? this.truncateNodeArray(nodeArray) : [];
        // Data join; key function combines name and depth (= position in sequence).
        var trail = this.el.selectAll("div." + styles.breadcrumbItem).data(data, function (d) {
            return d === "hops" ? d : d.data.name + d.depth;
        });
        // Remove exiting nodes.
        trail.exit().remove();
        // Add breadcrumb and label for entering nodes.
        var entering = trail
            .enter()
            .append("div")
            .attr("class", function (d) { return styles.breadcrumbItem + " " + (d === "hops" ? d : ""); })
            .style("background-color", function (d) {
            return d === "hops" ? "#fff" : d.data.color || "#eee";
        });
        entering
            .append("div")
            .attr("class", "label")
            .html(this.label);
        entering.append("div").attr("class", "background-arrow");
        entering
            .append("div")
            .attr("class", "arrow")
            .style("border-left-color", function (d) {
            return d === "hops" ? "#fff" : d.data.color || "#eee";
        });
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