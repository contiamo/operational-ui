"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var utils_1 = require("@operational/utils");
var react_feather_1 = require("react-feather");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, selected = _a.selected;
    var backgroundColor = color && theme.colors ? utils_1.hexOrColor(color)(theme.colors[color]) : "white";
    return {
        backgroundColor: backgroundColor,
        label: "selectoption",
        position: "relative",
        padding: theme.spacing / 2,
        wordWrap: "break-word",
        color: utils_1.readableTextColor(backgroundColor)(["black", "white"]),
        outline: "none",
        ":hover": {
            backgroundColor: utils_1.darken(backgroundColor)(5),
            color: utils_1.readableTextColor(utils_1.darken(backgroundColor)(5))(["black", "white"])
        },
        "&:not(:first-child)": {
            borderTop: "1px solid",
            borderColor: utils_1.darken(backgroundColor)(10)
        }
    };
});
var IconContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        width: 8,
        height: 8,
        position: "absolute",
        top: "50%",
        right: 4,
        transform: "translate3d(-50%, -50%, 0)"
    });
});
var SelectOption = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className, selected: !!props.selected, color: props.color, tabIndex: -2, role: "option", "aria-selected": props.selected, onClick: props.onClick },
    props.children,
    props.selected ? (React.createElement(IconContainer, null,
        React.createElement(react_feather_1.X, { size: props.theme.spacing }))) : null)); };
var WrappedSelectOption = glamorous_1.withTheme(SelectOption);
exports.default = WrappedSelectOption;
//# sourceMappingURL=SelectOption.js.map