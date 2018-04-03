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
    return ({
        label: "infotile",
        borderRadius: 2,
        minWidth: 100,
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        width: "fit-content",
        marginRight: theme.spacing,
        padding: theme.spacing / 3 + "px " + theme.spacing + "px",
        backgroundColor: theme.colors.gray10,
        border: "1px solid " + theme.colors.gray20
    });
});
var Content = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.heading2));
});
var Label = glamorous_1.default.small(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.small, { opacity: 0.6 }));
});
var InfoTile = function (props) { return (React.createElement(Container, { id: props.id, css: props.css, className: props.className },
    React.createElement(Label, null, props.label),
    React.createElement(Content, null, props.children))); };
exports.default = InfoTile;
//# sourceMappingURL=InfoTile.js.map