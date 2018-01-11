"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var utils_1 = require("@operational/utils");
var Icon_1 = require("./Icon");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color;
    var backgroundColor = color ? utils_1.hexOrColor(color)(theme.colors[color] || "white") : "white";
    var textColor = utils_1.readableTextColor(backgroundColor)([theme.colors.black, "white"]);
    return {
        backgroundColor: backgroundColor,
        overflow: "hidden",
        color: textColor,
        padding: theme.spacing * 1 / 2 + "px " + theme.spacing + "px",
        borderRadius: 2,
        position: "relative",
        maxWidth: 400,
        border: "1px solid rgba(0, 0, 0, 0.2)"
    };
});
var Content = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        paddingRight: theme.spacing * 2.5
    });
});
var IconContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        position: "absolute",
        top: 0,
        right: 0,
        cursor: "pointer",
        width: theme.spacing * 2.5,
        height: theme.spacing * 2.5,
        padding: theme.spacing * 0.5,
        "& svg": {
            width: "100%",
            height: "100%"
        },
        ":hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)"
        }
    });
});
exports.default = function (props) { return (React.createElement(Container, { css: props.css, className: props.className, color: props.color },
    React.createElement(IconContainer, { onClick: props.onClose },
        React.createElement(Icon_1.default, { name: "X" })),
    React.createElement(Content, null, props.children))); };
//# sourceMappingURL=Message.js.map