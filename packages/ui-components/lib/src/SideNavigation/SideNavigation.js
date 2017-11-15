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
var SideNavigationHeader_1 = require("./Header/SideNavigationHeader");
exports.SideNavigationHeader = SideNavigationHeader_1.default;
var SideNavigationItem_1 = require("./Item/SideNavigationItem");
exports.SideNavigationItem = SideNavigationItem_1.default;
var SideNavigationLink_1 = require("./Link/SideNavigationLink");
exports.SideNavigationLink = SideNavigationLink_1.default;
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, fix = _a.fix, expandOnHover = _a.expandOnHover, expandedWidth = _a.expandedWidth, width = _a.width;
    var backgroundColor = color
        ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette[color])
        : theme.colors.usage.sideNavigationBackground;
    var hoverWidth = expandOnHover
        ? {
            transition: ".3s width cubic-bezier(.8, 0, 0, 1)",
            willChange: "width",
            "&:hover": {
                width: expandedWidth
            }
        }
        : {};
    return __assign({ width: width,
        backgroundColor: backgroundColor, position: fix ? "fixed" : "relative", zIndex: theme.baseZIndex + 100, display: "flex", flexDirection: "column", alignItems: "flex-start", height: "100vh", overflow: "hidden", boxShadow: "1px 0 2px rgba(0, 0, 0, 0.2)", color: contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"]) }, hoverWidth, { "& a:focus": {
            outline: 0,
            backgroundColor: "rgba(255, 255, 255, 0.07)"
        } });
});
var SideNavigation = function (_a) {
    var css = _a.css, className = _a.className, key = _a.key, children = _a.children, color = _a.color, fix = _a.fix, expandOnHover = _a.expandOnHover, expandedWidth = _a.expandedWidth, width = _a.width;
    return (React.createElement(Container, { key: key, css: css, className: className, color: color, fix: fix, expandOnHover: expandOnHover, expandedWidth: expandedWidth || 240, width: width || 60 }, children));
};
exports.default = SideNavigation;
//# sourceMappingURL=SideNavigation.js.map