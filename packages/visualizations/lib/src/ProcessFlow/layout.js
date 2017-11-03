"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
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
            fp_1.filter(singleSourceAbove(sourcePositions)), 
            // 2) there cannot be another (non-source) node in between the node and the source node above
            fp_1.filter(isSourceDirectlyAbove(node, _this.nodes)), 
            // 3) there can't already be another node on the same row in that position
            fp_1.filter(xPositionAvailable(nodePositions)))(sourcePositions);
            var calculated = calculateXPosition(sourcePositions, possiblePositions);
            if (calculated.newColumn) {
                shiftNodesToRight(calculated.xPosition)(_this.nodes);
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
                placeSingleSourceNodes(nodesInRow, nodePositions);
                // If there are more than 1 incoming links, calculate optimal x position for node,
                //  and move other nodes as required.
                _this.placeMultipleSourceNodes(nodesInRow, nodePositions);
            }
        })(rows);
    };
    return Layout;
}());
// Helper functions
function placeNode(used, x, node) {
    if (fp_1.find(function (val) { return val === x; })(used)) {
        placeNode(used, x + 1, node);
    }
    else {
        node.x = x;
        used.push(x);
    }
}
function placeSingleSourceNodes(nodesInRow, nodePositions) {
    var singleSourceNodes = fp_1.filter(function (node) { return node.targetLinks.length === 1; })(nodesInRow);
    fp_1.forEach(function (node) {
        var sourceNodePosition = node.targetLinks[0].source().x;
        placeNode(nodePositions, sourceNodePosition, node);
    })(singleSourceNodes);
}
function singleSourceAbove(sourcePositions) {
    var sourceNodesAbove = function (x) {
        return fp_1.filter(function (position) { return position === x; })(sourcePositions);
    };
    return function (x) { return sourceNodesAbove(x).length === 1; };
}
// Check that there isn't a non-source node vertically between 2 linked nodes.
function isSourceDirectlyAbove(node, nodes) {
    return function (xValue) {
        var findSourceNodeAtX = fp_1.find(function (link) { return link.source().x === xValue; });
        var maxYVal = fp_1.flow(fp_1.filter(function (n) { return n.x === xValue; }), fp_1.reduce(function (max, n) {
            return Math.max(max, n.y);
        }, 0))(nodes);
        return maxYVal === findSourceNodeAtX(node.targetLinks).source().y;
    };
}
function xPositionAvailable(nodePositions) {
    return function (x) { return fp_1.indexOf(x)(nodePositions) === -1; };
}
// Shift all nodes that have an x-value >= the given value to the right by one place
function shiftNodesToRight(x) {
    return fp_1.flow(fp_1.filter(function (n) { return n.x >= x; }), fp_1.forEach(function (n) { n.x += 1; }));
}
// The mean source node position is calculated as a starting point for positioning the node
function calculateXPosition(sourcePositions, possiblePositions) {
    var newColumn = false;
    var sourcePositionsSum = fp_1.reduce(function (sum, val) {
        return sum + val;
    }, 0)(sourcePositions);
    var meanSourcePosition = sourcePositionsSum / sourcePositions.length;
    var xPosition;
    if (possiblePositions.length > 0) {
        possiblePositions = fp_1.sortBy(function (x) { return Math.abs(x - meanSourcePosition); })(possiblePositions);
        xPosition = possiblePositions[0];
    }
    else {
        xPosition = Math.round(meanSourcePosition);
        // Shift nodes to the right by one place to make space for new node column
        newColumn = true;
    }
    return { xPosition: xPosition, newColumn: newColumn };
}
exports.default = Layout;
//# sourceMappingURL=layout.js.map