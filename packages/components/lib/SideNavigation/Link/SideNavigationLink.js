"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var utils_1 = require("@operational/utils");
var style = function (_a) {
    var theme = _a.theme, color = _a.color;
    var backgroundColor = color ? utils_1.hexOrColor(color)(theme.colors.palette[color]) : theme.colors.palette.grey90;
    return {
        backgroundColor: backgroundColor,
        position: "relative",
        zIndex: theme.baseZIndex + 1,
        margin: "0 " + theme.spacing * -0.5 + "px",
        padding: theme.spacing + "px",
        minWidth: 200,
        borderRadius: 2,
        transition: ".1s background-color ease",
        color: utils_1.readableTextColor(backgroundColor)(["black", "white"]),
        "& + &": {
            borderTop: "1px solid " + theme.colors.palette.grey90
        },
        ":hover": {
            backgroundColor: utils_1.darken(backgroundColor)(10)
        },
        ":focus": {
            outline: 0,
            backgroundColor: utils_1.darken(backgroundColor)(15)
        },
        ":first-child": {
            marginTop: theme.spacing * -0.5 + "px"
        },
        ":last-child": {
            marginBottom: theme.spacing * -0.5 + "px"
        }
    };
};
exports.style = style;
var SideNavigationLink = function (props) { return (React.createElement("div", { key: props.id, style: props.style, className: props.className, onClick: props.onClick, role: "button", tabIndex: -1 }, props.children)); };
exports.SideNavigationLink = SideNavigationLink;
exports.default = glamorous_1.default(SideNavigationLink)(style);
//# sourceMappingURL=SideNavigationLink.js.map