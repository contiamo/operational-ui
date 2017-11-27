"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var contiamo_ui_components_1 = require("contiamo-ui-components");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, selected = _a.selected;
    var backgroundColor = color && theme.colors ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette[color]) : "white";
    return {
        backgroundColor: backgroundColor,
        position: "relative",
        padding: theme.spacing / 2,
        color: contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"]),
        outline: "none",
        ":hover": {
            backgroundColor: contiamo_ui_utils_1.darken(backgroundColor)(5),
            color: contiamo_ui_utils_1.readableTextColor(contiamo_ui_utils_1.darken(backgroundColor)(5))(["black", "white"])
        },
        "&:not(:first-child)": {
            borderTop: "1px solid",
            wordBreak: "break-all",
            borderColor: contiamo_ui_utils_1.darken(backgroundColor)(10)
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
        React.createElement(contiamo_ui_components_1.Icon, { name: "X", size: props.theme.spacing }))) : null)); };
var WrappedSelectOption = glamorous_1.withTheme(SelectOption);
exports.default = WrappedSelectOption;
//# sourceMappingURL=SelectOption.js.map