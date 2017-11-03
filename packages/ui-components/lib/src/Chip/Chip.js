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
        borderRadius: 2,
        padding: hasChip
            ? theme.spacing / 3 + "px " + 2.5 * theme.spacing + "px " + theme.spacing / 3 + "px " + theme.spacing * 2 / 3 + "px"
            : theme.spacing / 3 + "px " + theme.spacing * 2 / 3 + "px",
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
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
        color: contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"]),
        position: "absolute",
        width: theme.spacing * 1.75,
        top: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "0 " + theme.spacing / 4 + "px",
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.25)"
        }
    };
});
var Chip = function (_a) {
    var className = _a.className, css = _a.css, children = _a.children, onClick = _a.onClick, color = _a.color, symbol = _a.symbol;
    return (React.createElement(Container, { className: (className || "") + " co_chip", css: css, color: color, hasChip: !!onClick },
        children,
        onClick && (React.createElement(Action, { color: color, onClick: onClick }, symbol || "×"))));
};
exports.default = Chip;
//# sourceMappingURL=Chip.js.map