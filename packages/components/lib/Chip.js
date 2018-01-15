"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var utils_1 = require("@operational/utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, hasChip = _a.hasChip;
    var backgroundColor = utils_1.hexOrColor(color)(theme.colors[color] || theme.colors.info);
    return {
        backgroundColor: backgroundColor,
        label: "chip",
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        borderRadius: 2,
        padding: hasChip
            ? theme.spacing / 3 + "px " + theme.spacing * 8 / 3 + "px " + theme.spacing / 3 + "px " + theme.spacing + "px"
            : theme.spacing / 3 + "px " + theme.spacing + "px",
        cursor: "pointer",
        overflow: "hidden",
        color: utils_1.readableTextColor(backgroundColor)(["black", "white"]),
        margin: theme.spacing / 3 + "px " + theme.spacing / 3 + "px 0px 0px"
    };
});
var Action = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color;
    var backgroundColor = utils_1.hexOrColor(color)(theme.colors[color] || theme.colors.info);
    return {
        borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
        color: utils_1.readableTextColor(backgroundColor)(["black", "white"]),
        position: "absolute",
        width: theme.spacing * 1.75,
        top: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "0 " + theme.spacing / 3 + "px",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)"
        }
    };
});
var Chip = function (props) { return (React.createElement(Container, { key: props.id, className: props.className, css: props.css, color: props.color, hasChip: !!props.onClick },
    props.children,
    props.onClick && (React.createElement(Action, { color: props.color, onClick: props.onClick }, props.symbol || "×")))); };
exports.default = Chip;
//# sourceMappingURL=Chip.js.map