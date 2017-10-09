"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, hasChip = _a.hasChip;
    var backgroundColor = contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette[color] || theme.colors.palette.info);
    return {
        backgroundColor: backgroundColor,
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        padding: hasChip
            ? theme.spacing / 4 + "px " + 3 * theme.spacing / 4 + "px " + theme.spacing / 4 + "px " + theme.spacing / 4 + "px"
            : theme.spacing / 4,
        cursor: "pointer",
        overflow: "hidden",
        color: contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"]),
        "& + .co_chip": {
            marginLeft: theme.spacing / 4
        }
    };
});
var Action = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color;
    var backgroundColor = contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette[color] || theme.colors.palette.info);
    return {
        backgroundColor: contiamo_ui_utils_1.darken(backgroundColor)(-5),
        color: contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"]),
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
        zIndex: theme.baseZIndex + 100
    };
});
var Chip = function (_a) {
    var className = _a.className, style = _a.style, children = _a.children, onClick = _a.onClick, color = _a.color, symbol = _a.symbol;
    return (React.createElement(Container, { className: className + " co_chip", style: style, color: color, hasChip: !!onClick },
        children,
        onClick && (React.createElement(Action, { tabIndex: -1, role: "button", className: "co_action", color: color, onClick: onClick }, symbol || "x"))));
};
exports.default = Chip;
//# sourceMappingURL=Chip.js.map