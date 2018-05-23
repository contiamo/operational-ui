"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var theme_1 = require("@operational/theme");
var utils_1 = require("@operational/utils");
var _1 = require("../");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, selected = _a.selected;
    var backgroundColor = theme_1.expandColor(theme, color) || theme.colors.white;
    return {
        backgroundColor: backgroundColor,
        label: "selectoption",
        position: "relative",
        padding: theme.spacing / 2 + "px " + theme.spacing * 3 / 4 + "px",
        wordWrap: "break-word",
        color: utils_1.readableTextColor(backgroundColor, ["black", "white"]),
        outline: "none",
        ":hover": {
            backgroundColor: utils_1.darken(backgroundColor, 5),
            color: utils_1.readableTextColor(utils_1.darken(backgroundColor, 5), ["black", "white"]),
        },
        "&:not(:first-child)": {
            borderTop: "1px solid",
            borderColor: utils_1.darken(backgroundColor, 10),
        },
    };
});
var IconContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        width: 10,
        height: 10,
        position: "absolute",
        top: "50%",
        right: 4,
        transform: "translate3d(-50%, -50%, 0)",
        "& svg": {
            width: "100%",
            height: "100%",
        },
    });
});
var SelectOption = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className, selected: !!props.selected, color: props.color, tabIndex: -2, role: "option", "aria-selected": props.selected, onClick: props.onClick },
    props.children,
    props.selected ? (React.createElement(IconContainer, null,
        React.createElement(_1.Icon, { name: "Check", size: 10 }))) : null)); };
exports.default = SelectOption;
//# sourceMappingURL=Select.Option.js.map