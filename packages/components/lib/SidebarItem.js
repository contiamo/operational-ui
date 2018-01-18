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
var utils_1 = require("@operational/utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, isDisabled = _a.isDisabled, isActive = _a.isActive;
    return (__assign({ label: "sidebarlink", backgroundColor: theme.colors.white }, theme.typography.body, { fontWeight: isActive ? 600 : 400, position: "relative", display: "flex", padding: theme.spacing / 3 + "px " + theme.spacing + "px", cursor: "pointer", textDecoration: "none", color: isActive ? theme.colors.linkText : theme.colors.gray80, opacity: isDisabled ? 0.25 : 1, "&:not(:first-child)": {
            borderTop: "1px solid",
            borderColor: theme.colors.secondarySeparator
        }, ":hover": {
            backgroundColor: utils_1.darken(theme.colors.white)(2)
        }, ":focus": {
            outline: 0
        } }));
});
exports.default = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, onClick: props.onClick, className: props.className, isActive: !!props.active, isDisabled: !!props.disabled }, props.children)); };
//# sourceMappingURL=SidebarItem.js.map