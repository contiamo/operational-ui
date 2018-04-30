"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3-selection");
require("d3-transition");
var d3_shape_1 = require("d3-shape");
var d3_utils_1 = require("../../utils/d3_utils");
var styles = require("./styles");
var event_catalog_1 = require("../../utils/event_catalog");
var renderer_utils_1 = require("./renderer_utils");
var nodeLabelOptions = {
    top: {
        dy: "0",
        textAnchor: "middle",
        x: 0,
        y: -1,
    },
    bottom: {
        dy: "1em",
        textAnchor: "middle",
        x: 0,
        y: 1,
    },
    middle: {
        dy: "0.35em",
        textAnchor: "middle",
        x: 0,
        y: 0,
    },
    left: {
        dy: "0.35em",
        textAnchor: "end",
        x: -1,
        y: 0,
    },
    right: {
        dy: "0.35em",
        textAnchor: "start",
        x: 1,
        y: 0,
    },
};
var nodeShapeOptions = {
    squareDiamond: {
        symbol: d3_shape_1.symbolSquare,
        rotation: 45,
    },
    square: {
        symbol: d3_shape_1.symbolSquare,
        rotation: 0,
    },
    diamond: {
        symbol: d3_shape_1.symbolDiamond,
        rotation: 0,
    },
    circle: {
        symbol: d3_shape_1.symbolCircle,
        rotation: 0,
    },
};
var Nodes = /** @class */ (function () {
    function Nodes(state, events, el) {
        this.state = state;
        this.events = events;
        this.el = el;
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT, this.removeHighlights.bind(this));
    }
    Nodes.prototype.onMouseOver = function (d, element) {
        this.mouseOver(d3.select(element), d);
    };
    Nodes.prototype.mouseOver = function (element, d, hideLabel) {
        if (hideLabel === void 0) { hideLabel = false; }
        this.highlight(element, d);
        var focusPoint = this.focusPoint(element, d);
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOVER, { focusPoint: focusPoint, d: d, hideLabel: hideLabel });
        element.on("mouseleave", this.onMouseOut.bind(this));
    };
    Nodes.prototype.focusElement = function (focusElement) {
        var _this = this;
        this.el
            .selectAll("path.node." + styles.border)
            .filter(renderer_utils_1.filterByMatchers(focusElement.matchers))
            .each(d3_utils_1.withD3Element(function (d, el) {
            _this.mouseOver(d3.select(el), d, focusElement.hideLabel);
        }));
    };
    Nodes.prototype.highlight = function (element, d, keepCurrent) {
        if (keepCurrent === void 0) { keepCurrent = false; }
        if (!keepCurrent) {
            this.removeHighlights();
        }
        element.attr("stroke", this.config.highlightColor);
    };
    // Remove any old highlights, including link highlighting (needed if an element has been manually focussed)
    Nodes.prototype.removeHighlights = function () {
        this.el.selectAll("path.node." + styles.border).attr("stroke", this.config.borderColor);
        this.el.selectAll("path.link." + styles.element).attr("stroke", function (d) { return d.stroke(); });
    };
    Nodes.prototype.focusPoint = function (element, d) {
        if (d == null)
            return;
        var offset = this.getNodeBoundingRect(element.node()).width / 2;
        return {
            offset: offset,
            type: "node",
            x: d.x,
            y: d.y,
            id: d.id(),
        };
    };
    Nodes.prototype.onMouseOut = function () {
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT);
    };
    Nodes.prototype.draw = function (data) {
        this.data = data;
        this.config = this.state.current.get("config");
        var groups = this.el
            .select("g.nodes-group")
            .selectAll("g.node-group")
            .data(this.data, function (node) { return node.id(); });
        renderer_utils_1.exitGroups(groups);
        this.enterAndUpdate(groups);
    };
    Nodes.prototype.borderScale = function (scale) {
        var _this = this;
        return function (size) {
            return Math.pow(Math.sqrt(scale(size)) + _this.config.nodeBorderWidth, 2);
        };
    };
    Nodes.prototype.translate = function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    };
    Nodes.prototype.rotate = function (d) {
        return "rotate(" + nodeShapeOptions[d.shape()].rotation + ")";
    };
    Nodes.prototype.enterAndUpdate = function (groups) {
        var scale = renderer_utils_1.sizeScale([this.config.minNodeSize, this.config.maxNodeSize], this.data), borderScale = this.borderScale(scale);
        var enteringGroups = groups
            .enter()
            .append("g")
            .attr("class", "node-group")
            .attr("transform", this.translate);
        enteringGroups
            .append("path")
            .attr("class", "node " + styles.border)
            .attr("d", function (d) {
            return d3_shape_1.symbol()
                .type(nodeShapeOptions[d.shape()].symbol)
                .size(borderScale(d.size()))();
        })
            .attr("transform", this.rotate)
            .attr("fill", this.config.borderColor)
            // @TODO delegate to a single event listener at the SVG root and locate the node in question by an attribute.
            // Single event handlers should be attached to a non-svg node.
            .on("mouseenter", d3_utils_1.withD3Element(this.onMouseOver.bind(this)));
        enteringGroups
            .append("path")
            .attr("class", "node " + styles.element)
            .attr("d", function (d) {
            return d3_shape_1.symbol()
                .type(nodeShapeOptions[d.shape()].symbol)
                .size(scale(d.size()))();
        })
            .attr("transform", this.rotate)
            .attr("fill", function (d) { return d.color(); })
            .attr("stroke", function (d) { return d.stroke(); })
            .attr("opacity", 0);
        enteringGroups.append("text").attr("class", styles.label);
        groups
            .merge(enteringGroups)
            .transition()
            .duration(this.config.duration)
            .attr("transform", this.translate);
        groups
            .merge(enteringGroups)
            .selectAll("path.node." + styles.border)
            .transition()
            .duration(this.config.duration)
            // NOTE: changing shape from one with straight edges to a circle/one with curved edges throws errors,
            // but doesn't break the viz.
            .attr("d", function (d) {
            return d3_shape_1.symbol()
                .type(nodeShapeOptions[d.shape()].symbol)
                .size(borderScale(d.size()))();
        })
            .attr("transform", this.rotate);
        groups
            .merge(enteringGroups)
            .selectAll("path.node." + styles.element)
            .transition()
            .duration(this.config.duration)
            // NOTE: changing shape from one with straight edges to a circle/one with curved edges throws errors,
            // but doesn't break the viz.
            .attr("d", function (d) {
            return d3_shape_1.symbol()
                .type(nodeShapeOptions[d.shape()].symbol)
                .size(scale(d.size()))();
        })
            .attr("transform", this.rotate)
            .attr("fill", function (d) { return d.color(); })
            .attr("stroke", function (d) { return d.stroke(); })
            .attr("opacity", 1)
            .call(d3_utils_1.onTransitionEnd, this.updateNodeLabels.bind(this));
    };
    Nodes.prototype.getNodeBoundingRect = function (el) {
        var node = d3
            .select(el.parentNode)
            .select("path.node." + styles.element)
            .node();
        return node.getBoundingClientRect();
    };
    Nodes.prototype.getLabelPosition = function (d) {
        return d.labelPosition() === "auto" ? this.getAutomaticLabelPosition(d) : d.labelPosition();
    };
    Nodes.prototype.getAutomaticLabelPosition = function (d) {
        var columnSpacing = this.state.current.get("computed").series.horizontalNodeSpacing;
        return (d.x / columnSpacing) % 2 === 1 ? "top" : "bottom";
    };
    Nodes.prototype.getNodeLabelX = function (d, el) {
        var offset = this.getNodeBoundingRect(el).width / 2 + this.config.nodeBorderWidth + this.config.labelOffset;
        return nodeLabelOptions[this.getLabelPosition(d)].x * offset;
    };
    Nodes.prototype.getNodeLabelY = function (d, el) {
        var offset = this.getNodeBoundingRect(el).height / 2 + this.config.nodeBorderWidth + this.config.labelOffset;
        return nodeLabelOptions[this.getLabelPosition(d)].y * offset;
    };
    Nodes.prototype.getLabelText = function (d) {
        // Pixel width of character approx 1/2 of font-size - allow 7px per character
        var desiredPixelWidth = this.state.current.get("computed").series.horizontalNodeSpacing, numberOfCharacters = desiredPixelWidth / 7;
        return d.label().substring(0, numberOfCharacters) + (d.label().length > numberOfCharacters ? "..." : "");
    };
    Nodes.prototype.updateNodeLabels = function () {
        var _this = this;
        var labels = this.el
            .select("g.nodes-group")
            .selectAll("text." + styles.label)
            .data(this.data, function (node) { return node.id(); });
        labels
            .enter()
            .merge(labels)
            .text(function (d) { return _this.getLabelText(d); })
            .attr("x", d3_utils_1.withD3Element(this.getNodeLabelX.bind(this)))
            .attr("y", d3_utils_1.withD3Element(this.getNodeLabelY.bind(this)))
            .attr("dy", function (d) { return nodeLabelOptions[_this.getLabelPosition(d)].dy; })
            .attr("text-anchor", function (d) { return nodeLabelOptions[_this.getLabelPosition(d)].textAnchor; });
    };
    return Nodes;
}());
exports.default = Nodes;
//# sourceMappingURL=nodes.js.map