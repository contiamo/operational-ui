"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, active = _a.active;
    var activeBackgroundColor = "rgba(0, 0, 0, 0.2)";
    var hoverBackgroundColor = "rgba(255, 255, 255, 0.07)";
    return {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: 2,
        width: "fit-content",
        minHeight: 40,
        cursor: "pointer",
        backgroundColor: active ? activeBackgroundColor : "transparent",
        minWidth: "100%",
        whiteSpace: "pre",
        ":hover": {
            backgroundColor: active ? activeBackgroundColor : hoverBackgroundColor
        },
        ":first-child": {
            marginTop: 0
        }
    };
});
var SideNavigationItem = function (_a) {
    var key = _a.key, className = _a.className, css = _a.css, children = _a.children, onClick = _a.onClick, active = _a.active;
    return (React.createElement(Container, { key: key, css: css, className: className, active: !!active, onClick: onClick }, children));
};
exports.default = SideNavigationItem;
//# sourceMappingURL=SideNavigationItem.js.map