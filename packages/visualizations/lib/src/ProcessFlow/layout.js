"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var layout_utils_1 = require("./layout_utils");
var Layout = /** @class */ (function () {
    function Layout(state) {
        this.state = state;
    }
    Layout.prototype.computeLayout = function (nodes) {
        var data = this.state.current.get("computed").series.data;
        this.nodes = nodes;
        this.computeNodeYPositions();
        this.computeNodeXPositions();
    };
    // Nodes are assigned the maximum vertical position of incoming neighbors plus one;
    // nodes with no incoming links are considered start nodes.
    Layout.prototype.computeNodeYPositions = function () {
        var _this = this;
        var nextNodes;
        var i = 0;
        var assignNextNodes = function (nodes) {
            nextNodes = [];
            fp_1.forEach(function (node) {
                node.y = i;
                fp_1.forEach(function (link) {
                    if (fp_1.indexOf(link.target())(nextNodes) < 0) {
                        nextNodes.push(link.target());
                    }
                })(node.sourceLinks);
            })(nodes);
            if (nextNodes.length > 0 && i < _this.nodes.length) {
                if (nodes.length === nextNodes.length) {
                    throw new Error('The data contains at least one loop. Handle loops before rendering, by passing the journeys through the ProcessFlowLoopHandler from the "contiamo-visualizations" package.');
                }
                ++i;
                assignNextNodes(nextNodes);
            }
        };
        assignNextNodes(this.nodes);
    };
    Layout.prototype.placeMultipleSourceNodes = function (nodesInRow, nodePositions) {
        var _this = this;
        var multipleSourceNodes = fp_1.filter(function (node) { return node.targetLinks.length > 1; })(nodesInRow);
        fp_1.forEach(function (node) {
            var sourcePositions = fp_1.map(function (link) { return link.source().x; })(node.targetLinks);
            // A node should be placed directly under a source node if possible:
            // Calculate possible node x positions that satisfy the following conditions
            var possiblePositions = fp_1.flow(
            // 1) there can only be one source node directly above
            fp_1.filter(layout_utils_1.default.singleSourceAbove(sourcePositions)), 
            // 2) there cannot be another (non-source) node in between the node and the source node above
            fp_1.filter(layout_utils_1.default.isSourceDirectlyAbove(node, _this.nodes)), 
            // 3) there can't already be another node on the same row in that position
            fp_1.filter(layout_utils_1.default.xPositionAvailable(nodePositions)))(sourcePositions);
            var calculated = layout_utils_1.default.calculateXPosition(sourcePositions, possiblePositions);
            if (calculated.newColumn) {
                layout_utils_1.default.shiftNodesToRight(calculated.xPosition)(_this.nodes);
            }
            node.x = calculated.xPosition;
            nodePositions.push(calculated.xPosition);
        })(multipleSourceNodes);
    };
    Layout.prototype.computeNodeXPositions = function () {
        var _this = this;
        var rows = fp_1.uniq(fp_1.sortBy(function (y) { return y; })(fp_1.map(function (node) { return node.y; })(this.nodes)));
        fp_1.forEach(function (row) {
            var nodesInRow = fp_1.filter(function (node) { return node.y === row; })(_this.nodes);
            if (row === 0) {
                // For the top row, spread nodes out equally
                fp_1.forEach.convert({ cap: false })(function (node, i) {
                    node.x = i + 1;
                })(nodesInRow);
            }
            else {
                var nodePositions = [];
                // Place nodes with only one incoming link directly below their source node, if possible.
                layout_utils_1.default.placeSingleSourceNodes(nodesInRow, nodePositions);
                // If there are more than 1 incoming links, calculate optimal x position for node,
                //  and move other nodes as required.
                _this.placeMultipleSourceNodes(nodesInRow, nodePositions);
            }
        })(rows);
    };
    return Layout;
}());
exports.default = Layout;
//# sourceMappingURL=layout.js.map