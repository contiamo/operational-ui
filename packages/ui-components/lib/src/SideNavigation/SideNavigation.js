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
var style = function (_a) {
    var theme = _a.theme, color = _a.color, fix = _a.fix, expandOnHover = _a.expandOnHover, 
    // for some reason, glamorous doesn't get the defaultProps...
    _b = _a.expandedWidth, 
    // for some reason, glamorous doesn't get the defaultProps...
    expandedWidth = _b === void 0 ? 240 : _b, _c = _a.width, width = _c === void 0 ? 60 : _c;
    var backgroundColor = color ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette[color]) : theme.colors.palette.grey80, hoverWidth = expandOnHover
        ? {
            transition: ".3s width cubic-bezier(.8, 0, 0, 1)",
            willChange: "width",
            "&:hover": {
                width: expandedWidth
            },
            "& .Tooltip": {
                display: "none"
            },
            "&:not(:hover) .SideNavigationHeader::after": {
                content: "none"
            },
            "&:not(:hover) .SideNavigationHeader__options": {
                display: "none"
            }
        }
        : {};
    return __assign({ width: width,
        backgroundColor: backgroundColor, position: fix ? "fixed" : "relative", zIndex: theme.baseZIndex + 100, display: "flex", flexDirection: "column", alignItems: "flex-start", height: "100vh", overflow: "hidden", boxShadow: "1px 0 2px rgba(0, 0, 0, 0.2)", color: contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"]) }, hoverWidth);
};
var SideNavigation = function (_a) {
    var className = _a.className, children = _a.children;
    return React.createElement("div", { className: className }, children);
};
SideNavigation.defaultProps = {
    expandOnHover: false,
    expandedWidth: 280,
    width: 64,
    fix: false
};
exports.default = glamorous_1.default(SideNavigation)(style);
//# sourceMappingURL=SideNavigation.js.map