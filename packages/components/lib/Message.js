"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var theme_1 = require("@operational/theme");
var utils_1 = require("@operational/utils");
var Icon_1 = require("./Icon");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color;
    var backgroundColor = theme_1.expandColor(theme, color) || theme.colors.info;
    var textColor = utils_1.readableTextColor(backgroundColor, [theme.colors.black, "white"]);
    return {
        backgroundColor: backgroundColor,
        overflow: "hidden",
        color: textColor,
        padding: theme.spacing * 1 / 2 + "px " + theme.spacing + "px",
        borderRadius: 4,
        position: "relative",
        maxWidth: 400,
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
var Message = function (props) { return (React.createElement(Container, { css: props.css, className: props.className, color: props.color },
    React.createElement(IconContainer, { onClick: props.onClose },
        React.createElement(Icon_1.default, { name: "X" })),
    React.createElement(Content, null, props.children))); };
exports.default = Message;
//# sourceMappingURL=Message.js.map