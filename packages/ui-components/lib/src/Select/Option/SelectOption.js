"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, selected = _a.selected;
    var backgroundColor = color && theme.colors ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette[color]) : "white";
    return {
        backgroundColor: backgroundColor,
        padding: theme.spacing / 2,
        color: selected
            ? contiamo_ui_utils_1.readableTextColor(backgroundColor)(["#aaa"])
            : contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"]),
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
var SelectOption = function (_a) {
    var className = _a.className, selected = _a.selected, color = _a.color, onClick = _a.onClick, children = _a.children;
    return (React.createElement(Container, { className: className, selected: selected, color: color, tabIndex: -2, role: "option", "aria-selected": selected, onClick: onClick }, children));
};
SelectOption.defaultProps = {
    selected: false
};
exports.default = SelectOption;
//# sourceMappingURL=SelectOption.js.map