"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var utils_1 = require("@operational/utils");
var Icon_1 = require("./Icon");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, hasChip = _a.hasChip;
    var backgroundColor = utils_1.hexOrColor(color)(theme.colors[color] || theme.colors.info);
    return {
        backgroundColor: backgroundColor,
        label: "chip",
        position: "relative",
        height: 20,
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        borderRadius: 2,
        cursor: "pointer",
        overflow: "hidden",
        color: utils_1.readableTextColor(backgroundColor)(["black", "white"]),
        margin: theme.spacing / 3 + "px " + theme.spacing / 3 + "px 0px 0px"
    };
});
var Content = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        display: "block",
        padding: theme.spacing / 2,
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)"
        }
    });
});
var Action = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color;
    var backgroundColor = utils_1.hexOrColor(color)(theme.colors[color] || theme.colors.info);
    return {
        borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
        color: utils_1.readableTextColor(backgroundColor)(["black", "white"]),
        width: theme.spacing * 1.75,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)"
        }
    };
});
var Chip = function (props) { return (React.createElement(Container, { key: props.id, className: props.className, css: props.css, color: props.color, hasChip: !!props.onClick },
    React.createElement(Content, { onClick: props.onClick }, props.children),
    props.onIconClick && (React.createElement(Action, { color: props.color, onClick: props.onIconClick }, String(props.icon) === props.icon ? React.createElement(Icon_1.default, { name: props.icon, size: 12 }) : props.icon)))); };
exports.default = Chip;
//# sourceMappingURL=Chip.js.map