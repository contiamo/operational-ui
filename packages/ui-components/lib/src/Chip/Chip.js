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
var style = function (_a) {
    var theme = _a.theme, color = _a.color, onClick = _a.onClick;
    var backgroundColor = contiamo_ui_utils_1.hexOrColor(color)(theme.colors[color]);
    var actionStyles = onClick
        ? {
            "& .action": {
                backgroundColor: backgroundColor,
                position: "absolute",
                top: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                padding: "0 " + theme.spacing / 4 + "px",
                width: "fit-content",
                opacity: 0,
                transform: "translateX(10px)",
                transition: ".3s transform ease, .3s opacity ease"
            },
            "& .action::before": {
                content: "\"\"",
                position: "absolute",
                top: 0,
                left: "-100%",
                display: "block",
                width: "100%",
                height: "100%",
                backgroundImage: "linear-gradient(90deg, transparent 0%, " + backgroundColor + " 100%)"
            }
        }
        : {};
    return __assign({ backgroundColor: backgroundColor, position: "relative", display: "flex", alignItems: "center", width: "fit-content", padding: theme.spacing / 4, cursor: "pointer", overflow: "hidden", color: contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"]), "&.chip + .chip": {
            marginLeft: theme.spacing / 4
        }, ":hover .action": {
            opacity: 1,
            transform: "none"
        } }, actionStyles);
};
var Chip = function (_a) {
    var className = _a.className, children = _a.children, onClick = _a.onClick, symbol = _a.symbol;
    return (React.createElement("div", { className: className + " chip" },
        children,
        onClick && (React.createElement("div", { tabIndex: -1, role: "button", className: "action", onClick: onClick }, symbol || "x"))));
};
exports.default = glamorous_1.default(Chip)(style);
//# sourceMappingURL=Chip.js.map