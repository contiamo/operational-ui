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
var SelectOption = function (_a) {
    var css = _a.css, className = _a.className, theme = _a.theme, selected = _a.selected, color = _a.color, onClick = _a.onClick, children = _a.children;
    return (React.createElement(Container, { css: css, className: className, selected: !!selected, color: color, tabIndex: -2, role: "option", "aria-selected": selected, onClick: onClick },
        children,
        selected ? (React.createElement(IconContainer, null,
            React.createElement(contiamo_ui_components_1.Icon, { name: "X", size: theme.spacing }))) : null));
};
exports.default = glamorous_1.withTheme(SelectOption);
//# sourceMappingURL=SelectOption.js.map