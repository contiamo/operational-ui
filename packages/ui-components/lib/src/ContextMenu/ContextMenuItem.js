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
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, clickable = _a.clickable;
    return (__assign({ backgroundColor: theme.colors.palette.white, minWidth: 160, width: "fit-content", padding: theme.spacing * 2 / 3 + "px " + theme.spacing + "px", border: "1px solid", borderColor: theme.colors.usage.contentSeparatorLine }, clickable
        ? {
            cursor: "pointer",
            "&:hover": {
                backgroundColor: contiamo_ui_utils_1.darken(theme.colors.palette.white)(2)
            }
        }
        : {}, { "&:not(:first-child)": {
            borderTop: 0
        } }));
});
var ContextMenuItem = function (_a) {
    var css = _a.css, className = _a.className, onClick = _a.onClick, children = _a.children;
    return (React.createElement(Container, { css: css, className: className, clickable: !!onClick, onClick: onClick }, children));
};
exports.default = ContextMenuItem;
//# sourceMappingURL=ContextMenuItem.js.map