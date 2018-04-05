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
    return (__assign({}, theme.typography.heading1, { label: "cardheader", display: "flex", borderTopLeftRadius: 4, borderTopRightRadius: 4, alignItems: "center", backgroundColor: theme.colors.cardHeaderBackground, 
        // This ensures that the card header text and card controls are placed in opposite corners.
        justifyContent: "space-between", height: 3.5 * theme.spacing, margin: -theme.spacing, marginBottom: theme.spacing, padding: "0 " + theme.spacing + "px", lineHeight: 1, color: theme.colors.emphasizedText }));
});
var CardHeader = function (props) { return (React.createElement(Container, { id: props.id, css: props.css, className: props.className }, props.children)); };
exports.default = CardHeader;
//# sourceMappingURL=CardHeader.js.map