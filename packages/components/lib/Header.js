"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var utils_1 = require("@operational/utils");
var Container = glamorous_1.default.header(function (_a) {
    var theme = _a.theme, color = _a.color;
    var white = theme.colors.white;
    var backgroundColor = color ? utils_1.hexOrColor(color)(theme.colors[color] || white) : white;
    return {
        backgroundColor: backgroundColor,
        label: "header",
        display: "flex",
        flex: "0 0 60px",
        height: 60,
        alignItems: "center",
        padding: theme.spacing / 2 + "px " + theme.spacing + "px",
        boxShadow: theme.shadows.card,
        color: utils_1.readableTextColor(backgroundColor)(["black", "white"])
    };
});
exports.default = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className, color: props.color }, props.children)); };
//# sourceMappingURL=Header.js.map