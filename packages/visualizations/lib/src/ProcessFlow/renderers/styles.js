"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glamor_1 = require("glamor");
var nodeStyle = {
    pointerEvents: "none"
};
var linkStyle = {
    cursor: "pointer"
};
var labelStyle = {
    fillOpacity: 0.7
};
exports.node = glamor_1.css(nodeStyle).toString();
exports.link = glamor_1.css(linkStyle).toString();
exports.label = glamor_1.css(labelStyle).toString();
//# sourceMappingURL=styles.js.map