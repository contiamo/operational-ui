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
var Icon_1 = require("./Icon");
var Container = glamorous_1.default.div({
    label: "sidenavheader",
    width: "100%",
});
var Content = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, isActive = _a.isActive, isExpanded = _a.isExpanded;
    return ({
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
        height: theme.box,
        flex: "0 0 " + theme.box + "px",
        // Readable text color is calculated in the <Sidenav> component,
        // and cascades down to both sidenav headers and items.
        color: isActive ? theme.colors.linkText : "inherit",
        borderBottom: isExpanded ? "1px solid #395568" : "none",
        backgroundColor: isExpanded ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0)",
        ":hover": {
            backgroundColor: isExpanded ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.1)",
        },
    });
});
var Label = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.heading1, { fontSize: 14, width: "fit-content", whiteSpace: "nowrap" }));
});
var IconContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        width: theme.box,
        height: theme.box,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "0 0 " + theme.box + "px",
    });
});
var SidenavHeader = function (props) { return (
// See ./SidenavItem.tsx for reason why class name is set.
// Note that the click listener is set on `<Content>` so it doesn't interfere
// with click listeners set on the children.
React.createElement(Container, { id: props.id, css: props.css, className: ["op_sidenavheader", props.className].filter(function (a) { return !!a; }).join(" ") },
    React.createElement(Content, { isActive: !!props.active, isExpanded: !!props.expanded, onClick: props.onClick },
        React.createElement(IconContainer, null, props.icon === String(props.icon) ? React.createElement(Icon_1.default, { name: props.icon, size: 24 }) : props.icon),
        React.createElement(Label, null, props.label)))); };
exports.default = SidenavHeader;
//# sourceMappingURL=SidenavHeader.js.map