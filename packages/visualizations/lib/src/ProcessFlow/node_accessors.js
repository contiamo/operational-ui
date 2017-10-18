"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var accessors_factory_1 = require("../utils/accessors_factory");
var defaultAccessors = {
    // Fill color - default white.
    color: function (node) {
        return node.color || "#fff";
    },
    // attribute by which nodes should be colored
    shape: function (node) {
        return node.shape || "squareDiamond";
    },
    size: function (node) {
        return node.size || 1;
    },
    stroke: function (node) {
        return node.stroke || "#000";
    },
    // Unique ID - defaults to a new unique string.
    id: function (node) {
        return node.id || fp_1.uniqueId("node");
    },
    label: function (node) {
        return node.label || node.id || "";
    },
    labelPosition: function (node) {
        return node.labelPosition || "right";
    },
};
exports.default = accessors_factory_1.default(defaultAccessors);
//# sourceMappingURL=node_accessors.js.map