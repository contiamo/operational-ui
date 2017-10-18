"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var nodes = {};
function findNode(nodeId) {
    if (!nodes[nodeId]) {
        nodes[nodeId] = { linkedToFrom: [] };
    }
    return nodes[nodeId];
}
function getSourcesRecursively(sources) {
    var numberOfLinks = sources.length;
    fp_1.forEach(function (sourceId) {
        fp_1.forEach(function (linkedSource) {
            if (fp_1.indexOf(linkedSource)(sources) < 0) {
                sources.push(linkedSource);
            }
        })(findNode(sourceId).linkedToFrom);
    })(sources);
    if (sources.length > numberOfLinks) {
        return getSourcesRecursively(sources);
    }
    else {
        return sources;
    }
}
function isLinkedToFrom(sourceId, targetId) {
    var sourceNodes = findNode(sourceId).linkedToFrom;
    var sourceLinkedToFrom = getSourcesRecursively(sourceNodes);
    return sourceLinkedToFrom.indexOf(targetId) > -1;
}
function removeLoops(path) {
    var i = 1;
    function checkForLoops(pathLeft) {
        var suffix = "";
        var sourceNodeId = pathLeft[0];
        var targetNodeId = pathLeft[1];
        var remainingPath = fp_1.drop(1)(pathLeft);
        if (isLinkedToFrom(sourceNodeId, targetNodeId)) {
            suffix = "+";
            remainingPath = fp_1.map(function (nodeId) { return nodeId + suffix; })(remainingPath);
            path = fp_1.dropRight(path.length - i)(path).concat(remainingPath);
        }
        var targetNode = findNode(targetNodeId + suffix);
        targetNode.linkedToFrom = fp_1.uniq(targetNode.linkedToFrom.concat(fp_1.dropRight(path.length - i)(path)));
        i++;
        if (remainingPath.length > 1) {
            checkForLoops(remainingPath);
        }
    }
    checkForLoops(path);
    return path;
}
exports.default = function (journeys) {
    fp_1.forEach(function (journey) {
        journey.path = removeLoops(journey.path);
    })(journeys);
    return journeys;
};
//# sourceMappingURL=process_flow_loop_handler.js.map