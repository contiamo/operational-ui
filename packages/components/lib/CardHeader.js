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
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.heading1, { label: "cardheader", display: "flex", alignItems: "center", 
        // This ensures that the card header text and card controls are placed in opposite corners.
        justifyContent: "space-between", height: 36, margin: theme.spacing * -4 / 3, marginBottom: theme.spacing * 4 / 3, padding: "0 " + theme.spacing * 4 / 3 + "px", borderBottom: "1px solid " + theme.colors.separator, lineHeight: 1, color: theme.colors.emphasizedText }));
});
exports.default = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className }, props.children)); };
//# sourceMappingURL=CardHeader.js.map