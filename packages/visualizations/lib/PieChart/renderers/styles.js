"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var glamor_1 = require("glamor");
var theme_1 = require("@operational/theme");
var arcStyle = {
    stroke: "#fff",
    strokeWidth: "1",
    fill: "#eee",
};
var labelStyle = __assign({ fill: "#333", stroke: "none", pointerEvents: "none" }, theme_1.operational.typography.small);
var totalStyle = __assign({ fill: "#4c4c4c" }, theme_1.operational.typography.small);
var comparisonStyle = {
    stroke: "#747474",
    strokeWidth: 2,
    strokeDasharray: "6 4",
};
exports.arc = glamor_1.css(arcStyle).toString();
exports.label = glamor_1.css(labelStyle).toString();
exports.total = glamor_1.css(totalStyle).toString();
exports.comparison = glamor_1.css(comparisonStyle).toString();
//# sourceMappingURL=styles.js.map