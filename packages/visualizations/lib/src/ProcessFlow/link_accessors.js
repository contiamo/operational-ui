"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var accessors_factory_1 = require("../utils/accessors_factory");
var defaultAccessors = {
    // Dash length of link. Default "0" (solid line)
    dash: function (link) {
        return link.dash || "0";
    },
    // Label to display next to link - defaults to an empty string.
    label: function (link) {
        return link.label || link.source.label() + " → " + link.target.label() || "";
    },
    // Value for determining width of link. Default: 1.
    size: function (link) {
        return link.size || 1;
    },
    // Color of link. Default: grey.
    stroke: function (link) {
        return link.stroke || "#bbb";
    },
    // Node at which the link starts, if available.
    source: function (link) {
        return link.source;
    },
    // ID of node at which the link starts, if available.
    sourceId: function (link) {
        return link.sourceId;
    },
    // Node at which the link ends, if available.
    target: function (link) {
        return link.target;
    },
    // ID of node at which the link ends, if available.
    targetId: function (link) {
        return link.targetId;
    },
};
exports.default = accessors_factory_1.default(defaultAccessors);
//# sourceMappingURL=link_accessors.js.map