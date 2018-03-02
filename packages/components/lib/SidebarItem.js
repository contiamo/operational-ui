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
    var theme = _a.theme, isDisabled = _a.isDisabled, isActive = _a.isActive;
    return (__assign({ label: "sidebaritem", backgroundColor: theme.colors.white, height: 30 }, theme.typography.body, { fontWeight: isActive ? 600 : 400, position: "relative", borderBottom: "1px solid", borderColor: theme.colors.secondarySeparator, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0px " + theme.spacing + "px", cursor: "pointer", textDecoration: "none", color: isActive ? theme.colors.linkText : theme.colors.gray80 }, isDisabled ? { opacity: 0.25, pointerEvents: "none" } : {}, { ":hover": {
            backgroundColor: theme.colors.gray10
        }, ":focus": {
            outline: 0
        } }));
});
var SidebarItem = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, onClick: props.onClick, className: props.className, isActive: !!props.active, isDisabled: !!props.disabled }, props.children)); };
exports.default = SidebarItem;
//# sourceMappingURL=SidebarItem.js.map