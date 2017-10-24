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
var d3_shape_1 = require("d3-shape");
var styles = require("./styles");
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
        rotation: 45
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
var Nodes = /** @class */ (function (_super) {
    __extends(Nodes, _super);
    function Nodes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "node";
        _this.focusElementAccessor = "path.node." + styles.border;
        return _this;
    }
    Nodes.prototype.updateDraw = function () {
        var nodeGroups = this.el.select("g.nodes-group")
            .selectAll("g.node-group")
            .data(this.data, function (node) { return node.id(); });
        this.exit(nodeGroups);
        this.enterAndUpdate(nodeGroups);
    };
    Nodes.prototype.nodeBorderScale = function (scale) {
        var _this = this;
        return function (size) {
            return Math.pow((Math.sqrt(scale(size)) + _this.config.nodeBorderWidth), 2);
        };
    };
    Nodes.prototype.enterAndUpdate = function (nodeGroups) {
        var _this = this;
        var scale = this.sizeScale([this.config.minNodeSize, this.config.maxNodeSize]), borderScale = this.nodeBorderScale(scale), ctx = this;
        var n = 0;
        nodeGroups
            .enter()
            .append("g")
            .attr("class", "node-group")
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
            .each(function (d) {
            // Append node "border" element - white element behind node.
            d3
                .select(this)
                .append("path")
                .attr("class", "node " + styles.border)
                .attr("d", d3_shape_1.symbol()
                .type(nodeShapeOptions[d.shape()].symbol)
                .size(borderScale(d.size())))
                .attr("transform", "rotate(" + nodeShapeOptions[d.shape()].rotation + ")")
                .attr("fill", ctx.config.borderColor)
                .on("mouseenter", ctx.onMouseOver(ctx));
            // Append node
            d3
                .select(this)
                .append("path")
                .attr("class", "node " + styles.element)
                .attr("d", d3_shape_1.symbol()
                .type(nodeShapeOptions[d.shape()].symbol)
                .size(scale(d.size())))
                .attr("transform", "rotate(" + nodeShapeOptions[d.shape()].rotation + ")")
                .attr("fill", d.color())
                .attr("stroke", d.stroke())
                .attr("opacity", 0);
            // Append label
            d3
                .select(this)
                .append("text")
                .attr("class", styles.label);
        })
            .merge(nodeGroups)
            .transition()
            .duration(ctx.config.duration)
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
            .each(function (d) {
            // Update node border
            d3
                .select(this)
                .select("path.node." + styles.border)
                .transition()
                .duration(ctx.config.duration)
                .attr("d", d3_shape_1.symbol()
                .type(nodeShapeOptions[d.shape()].symbol)
                .size(borderScale(d.size())))
                .attr("transform", "rotate(" + nodeShapeOptions[d.shape()].rotation + ")");
            // Update node
            d3
                .select(this)
                .select("path.node." + styles.element)
                .transition()
                .duration(ctx.config.duration)
                .attr("d", d3_shape_1.symbol()
                .type(nodeShapeOptions[d.shape()].symbol)
                .size(scale(d.size())))
                .attr("transform", "rotate(" + nodeShapeOptions[d.shape()].rotation + ")")
                .attr("fill", d.color())
                .attr("stroke", d.stroke())
                .attr("opacity", 1);
            ++n;
        })
            .on("end", function () {
            --n;
            if (n < 1) {
                _this.updateNodeLabels(nodeGroups);
            }
        });
    };
    Nodes.prototype.getNodeBoundingRect = function (el) {
        var node = d3
            .select(el.parentNode)
            .select("path.node." + styles.element)
            .node();
        return node.getBoundingClientRect();
    };
    Nodes.prototype.getNodeLabelX = function (d, el) {
        var offset = this.getNodeBoundingRect(el).width / 2 + this.config.nodeBorderWidth + this.config.labelOffset;
        return nodeLabelOptions[d.labelPosition()].x * offset;
    };
    Nodes.prototype.getNodeLabelY = function (d, el) {
        var offset = this.getNodeBoundingRect(el).height / 2 + this.config.nodeBorderWidth + this.config.labelOffset;
        return nodeLabelOptions[d.labelPosition()].y * offset;
    };
    Nodes.prototype.updateNodeLabels = function (nodeGroups) {
        var that = this;
        nodeGroups
            .enter()
            .selectAll("text." + styles.label)
            .merge(nodeGroups)
            .text(function (d) { return d.label(); })
            .attr("x", function (d) {
            return that.getNodeLabelX(d, this);
        })
            .attr("y", function (d) {
            return that.getNodeLabelY(d, this);
        })
            .attr("dy", function (d) { return nodeLabelOptions[d.labelPosition()].dy; })
            .attr("text-anchor", function (d) { return nodeLabelOptions[d.labelPosition()].textAnchor; });
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
    return Nodes;
}(abstract_renderer_1.default));
exports.default = Nodes;
//# sourceMappingURL=nodes.js.map