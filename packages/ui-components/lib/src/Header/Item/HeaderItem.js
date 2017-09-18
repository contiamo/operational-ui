"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var style = function (_a) {
    var theme = _a.theme, active = _a.active;
    var opacity = 0.1, activeBackground = "rgba(0, 0, 0, " + opacity * 2 + ")";
    return {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing / 4 + "px " + theme.spacing / 2 + "px",
        minHeight: 32,
        borderRadius: 2,
        cursor: "pointer",
        transition: ".1s background-color ease, .05s transform ease",
        userSelect: "none",
        backgroundColor: active ? activeBackground : "transparent",
        ":hover": {
            backgroundColor: "rgba(0, 0, 0, " + opacity + ")"
        },
        ":not(.active):active": {
            transform: "scale(0.95)",
            backgroundColor: "rgba(0, 0, 0, " + opacity * 2 + ")"
        },
        "&.active": {
            backgroundColor: activeBackground
        },
        "& + &": {
            marginLeft: theme.spacing / 2
        },
        "& > svg": {
            width: 16,
            marginRight: theme.spacing / 2
        }
    };
};
var HeaderItem = function (_a) {
    var className = _a.className, children = _a.children, onClick = _a.onClick;
    return (React.createElement("div", { tabIndex: -1, role: "button", onClick: onClick, className: className }, children));
};
exports.HeaderItem = HeaderItem;
exports.default = glamorous_1.default(HeaderItem)(style);
//# sourceMappingURL=HeaderItem.js.map