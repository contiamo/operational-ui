"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var withTooltip_1 = require("../../Tooltip/withTooltip");
var SideNavigationItem = function (_a) {
    var className = _a.className, children = _a.children, onClick = _a.onClick;
    return React.createElement("div", { className: className + " SideNavigationItem", onClick: onClick, role: "button", tabIndex: -1 }, children);
}, style = function (_a) {
    var theme = _a.theme, active = _a.active;
    var activeBackgroundColor = "rgba(0, 0, 0, 0.2)";
    return {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: theme.spacing / 2 + "px " + theme.spacing * 1.7 + "px",
        borderRadius: 2,
        width: "100%",
        minHeight: 40,
        cursor: "pointer",
        backgroundColor: active ? activeBackgroundColor : "transparent",
        ":hover": {
            backgroundColor: "rgba(255, 255, 255, 0.07)",
        },
        "&.SideNavigationItem_active": {
            backgroundColor: activeBackgroundColor,
        },
        ":first-child": {
            marginTop: 0,
            marginBottom: theme.spacing ? theme.spacing * 2 : 16,
        },
    };
};
exports.default = glamorous_1.default(withTooltip_1.default(SideNavigationItem))(style);
//# sourceMappingURL=SideNavigationItem.js.map