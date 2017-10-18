"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var Layout = /** @class */ (function () {
    function Layout(state) {
        this.state = state;
    }
    Layout.prototype.computeLayout = function () {
        var data = this.state.current.get("computed").series.data;
        this.nodes = data.nodes;
        this.links = data.links;
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
                    throw new Error("The data contains at least one loop. Handle loops before rendering.");
                }
                ++i;
                assignNextNodes(nextNodes);
            }
        };
        assignNextNodes(this.nodes);
    };
    // Shift all nodes that have an x-value >= the given value to the right by one place
    Layout.prototype.shiftNodesToRight = function (x) {
        return fp_1.flow(fp_1.filter(function (n) { return n.x >= x; }), fp_1.forEach(function (n) {
            n.x += 1;
        }));
    };
    // Check that there isn't a non-source node vertically between 2 linked nodes.
    Layout.prototype.isSourceDirectlyAbove = function (node) {
        var _this = this;
        return fp_1.bind(function (xValue) {
            var findSourceNodeAtX = fp_1.find(function (link) { return link.source().x === xValue; });
            var maxYVal = fp_1.flow(fp_1.filter(function (n) { return n.x === xValue; }), fp_1.reduce(function (max, n) {
                return Math.max(max, n.y);
            }, 0))(_this.nodes);
            return maxYVal === findSourceNodeAtX(node.targetLinks).source().y;
        }, this);
    };
    Layout.prototype.placeNode = function (used, x, node) {
        if (fp_1.find(function (val) { return val === x; })(used)) {
            this.placeNode(used, x + 1, node);
        }
        else {
            node.x = x;
            used.push(x);
        }
    };
    Layout.prototype.singleSourceAbove = function (sourcePositions) {
        var sourceNodesAbove = function (x) {
            return fp_1.filter(function (position) { return position === x; })(sourcePositions);
        };
        return function (x) { return sourceNodesAbove(x).length === 1; };
    };
    Layout.prototype.xPositionAvailable = function (nodePositions) {
        return function (x) { return fp_1.indexOf(x)(nodePositions) === -1; };
    };
    Layout.prototype.calculateXPosition = function (sourcePositions, possiblePositions) {
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
            this.shiftNodesToRight(xPosition)(this.nodes);
        }
        return xPosition;
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
                var nodePositions_1 = [];
                // Place nodes with only one incoming link directly below their source node, if possible.
                var singleSourceNodes = fp_1.filter(function (node) { return node.targetLinks.length === 1; })(nodesInRow);
                fp_1.forEach(function (node) {
                    var sourceNodePosition = node.targetLinks[0].source().x;
                    _this.placeNode(nodePositions_1, sourceNodePosition, node);
                })(singleSourceNodes);
                // If there are more than 1 incoming links, look at source node x positions.
                var multipleSourceNodes = fp_1.filter(function (node) { return node.targetLinks.length > 1; })(nodesInRow);
                fp_1.forEach(function (node) {
                    // The mean source node position is calculated as a starting point for positioning the node
                    var sourcePositions = fp_1.map(function (link) { return link.source().x; })(node.targetLinks);
                    // A node should be placed directly under a source node if possible:
                    // Calculate possible node x positions that satisfy the following conditions
                    var possiblePositions = fp_1.flow(
                    // 1) there can only be one source node directly above
                    fp_1.filter(_this.singleSourceAbove(sourcePositions)), 
                    // 2) there cannot be another (non-source) node in between the node and the source node above
                    fp_1.filter(_this.isSourceDirectlyAbove(node)), 
                    // 3) there can't already be another node on the same row in that position
                    fp_1.filter(_this.xPositionAvailable(nodePositions_1)))(sourcePositions);
                    var xPosition = _this.calculateXPosition(sourcePositions, possiblePositions);
                    node.x = xPosition;
                    nodePositions_1.push(xPosition);
                })(multipleSourceNodes);
            }
        })(rows);
    };
    return Layout;
}());
exports.default = Layout;
//# sourceMappingURL=layout.js.map