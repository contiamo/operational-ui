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
var MINNODESIZE = 100, nodeLabelOptions = {
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
var Nodes = /** @class */ (function (_super) {
    __extends(Nodes, _super);
    function Nodes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Nodes.prototype.updateDraw = function () {
        var nodeGroups = this.el
            .selectAll("g.node-group")
            .data(this.data, function (node) {
            return node.id();
        });
        this.exit(nodeGroups.exit());
        this.enterAndUpdate(nodeGroups.enter());
    };
    Nodes.prototype.exit = function (exitNodes) {
        exitNodes.selectAll("text.label").remove();
        exitNodes
            .selectAll("path.node")
            .on("mouseenter", null)
            .on("mouseleave", null)
            .transition()
            .duration(this.config.duration)
            .style("opacity", 0)
            .remove();
    };
    Nodes.prototype.enterAndUpdate = function (enterNodes) {
        var enterNodeGroups = enterNodes
            .append("g")
            .attr("class", "node-group")
            .attr("transform", function (node) {
            return "translate(" + node.x + "," + node.y + ")";
        });
        this.updateNodes(enterNodeGroups);
    };
    // @TODO How do I import the d3 symbol types?
    Nodes.prototype.getNodeShape = function (d) {
        switch (d.shape()) {
            case "square":
                return d3_shape_1.symbolSquare;
            case "circle":
                return d3_shape_1.symbolCircle;
            default:
                return d3_shape_1.symbolDiamond;
        }
    };
    Nodes.prototype.updateNodes = function (enterNodeGroups) {
        var _this = this;
        var scale = this.sizeScale([MINNODESIZE, this.config.maxNodeSize]);
        var n = 0;
        enterNodeGroups
            .append("path")
            .attr("class", "node")
            .attr("d", d3_shape_1.symbol()
            .type(this.getNodeShape)
            .size(0))
            .attr("fill", function (d) {
            return d.color();
        })
            .attr("stroke", function (d) {
            return d.stroke();
        })
            .on("mouseenter", this.onMouseOver(this))
            .merge(enterNodeGroups)
            .transition()
            .duration(this.config.duration)
            .attr("d", d3_shape_1.symbol()
            .type(this.getNodeShape)
            .size(function (d) {
            return scale(d.size());
        }))
            .each(function () {
            ++n;
        })
            .on("end", function () {
            if (!--n) {
                _this.updateNodeLabels(enterNodeGroups);
            }
        });
    };
    Nodes.prototype.getNodeBBox = function (el) {
        var node = d3
            .select(el.parentNode)
            .select("path.node")
            .node();
        return node.getBBox();
    };
    Nodes.prototype.getNodeLabelX = function (d, el) {
        var offset = this.getNodeBBox(el).width / 2 + this.config.labelOffset;
        return nodeLabelOptions[d.labelPosition()].x * offset;
    };
    Nodes.prototype.getNodeLabelY = function (d, el) {
        var offset = this.getNodeBBox(el).height / 2 + this.config.labelOffset;
        return nodeLabelOptions[d.labelPosition()].y * offset;
    };
    Nodes.prototype.updateNodeLabels = function (enterNodes) {
        var that = this;
        enterNodes
            .append("text")
            .attr("class", "label")
            .merge(enterNodes)
            .text(function (node) {
            return node.label();
        })
            .attr("x", function (d) {
            return that.getNodeLabelX(d, this);
        })
            .attr("y", function (d) {
            return that.getNodeLabelY(d, this);
        })
            .attr("dy", function (d) {
            return nodeLabelOptions[d.labelPosition()].dy;
        })
            .attr("text-anchor", function (d) {
            return nodeLabelOptions[d.labelPosition()].textAnchor;
        });
    };
    Nodes.prototype.focusPoint = function (element, d) {
        if (d == null) {
            return;
        }
        var nodeBBox = this.getNodeBBox(element.node());
        return {
            offset: nodeBBox.width,
            type: "node",
            x: d.x + nodeBBox.width / 2,
            y: d.y + nodeBBox.height / 2,
            id: d.id(),
        };
    };
    return Nodes;
}(abstract_renderer_1.default));
exports.default = Nodes;
//# sourceMappingURL=nodes.js.map