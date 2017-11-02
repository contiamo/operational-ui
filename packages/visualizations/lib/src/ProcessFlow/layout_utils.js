"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var LayoutUtils = {
    placeSingleSourceNodes: function (nodesInRow, nodePositions) {
        var singleSourceNodes = fp_1.filter(function (node) { return node.targetLinks.length === 1; })(nodesInRow);
        var placeNode = function (used, x, node) {
            if (fp_1.find(function (val) { return val === x; })(used)) {
                placeNode(used, x + 1, node);
            }
            else {
                node.x = x;
                used.push(x);
            }
        };
        fp_1.forEach(function (node) {
            var sourceNodePosition = node.targetLinks[0].source().x;
            placeNode(nodePositions, sourceNodePosition, node);
        })(singleSourceNodes);
    },
    singleSourceAbove: function (sourcePositions) {
        var sourceNodesAbove = function (x) {
            return fp_1.filter(function (position) { return position === x; })(sourcePositions);
        };
        return function (x) { return sourceNodesAbove(x).length === 1; };
    },
    // Check that there isn't a non-source node vertically between 2 linked nodes.
    isSourceDirectlyAbove: function (node, nodes) {
        return function (xValue) {
            var findSourceNodeAtX = fp_1.find(function (link) { return link.source().x === xValue; });
            var maxYVal = fp_1.flow(fp_1.filter(function (n) { return n.x === xValue; }), fp_1.reduce(function (max, n) {
                return Math.max(max, n.y);
            }, 0))(nodes);
            return maxYVal === findSourceNodeAtX(node.targetLinks).source().y;
        };
    },
    xPositionAvailable: function (nodePositions) {
        return function (x) { return fp_1.indexOf(x)(nodePositions) === -1; };
    },
    // Shift all nodes that have an x-value >= the given value to the right by one place
    shiftNodesToRight: function (x) {
        return fp_1.flow(fp_1.filter(function (n) { return n.x >= x; }), fp_1.forEach(function (n) { n.x += 1; }));
    },
    // The mean source node position is calculated as a starting point for positioning the node
    calculateXPosition: function (sourcePositions, possiblePositions) {
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
};
exports.default = LayoutUtils;
//# sourceMappingURL=layout_utils.js.map