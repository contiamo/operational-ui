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
        label: "sidebaritem",
        position: "relative",
        color: theme.colors.emphasizedText
    });
});
var Content = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        position: "relative",
        paddingLeft: theme.spacing
    });
});
var Header = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, isOpen = _a.isOpen;
    return (__assign({ position: "relative", display: "flex", alignItems: "center", padding: theme.spacing * 2 / 3 + "px " + theme.spacing + "px", borderTop: "1px solid", borderTopColor: theme.colors.gray10, cursor: "pointer", outline: "none", backgroundColor: theme.colors.white }, isOpen
        ? {
            borderBottom: "1px solid",
            borderBottomColor: theme.colors.separator,
            fontWeight: 600,
            backgroundColor: theme.colors.gray10
        }
        : {}, { "&:hover": {
            backgroundColor: theme.colors.gray10
        }, "&::after": {
            content: '""',
            display: "block",
            width: 0,
            height: 0,
            marginLeft: "auto",
            border: "4px solid transparent",
            borderLeftColor: theme.colors.gray20,
            transition: ".15s transform ease",
            transform: isOpen ? "translate3d(-2px, 2px, 0) rotate(90deg)" : null
        } }));
});
exports.default = function (props) { return (React.createElement(Container, { css: props.css, key: props.id, onClick: props.onClick, className: props.className + " " + (props.open ? "open" : "") },
    React.createElement(Header, { isOpen: !!props.open, className: "header " + (props.open ? "open" : "") }, props.label),
    props.open ? React.createElement(Content, null, props.children) : null)); };
//# sourceMappingURL=SidebarHeader.js.map