"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var style = function (_a) {
    var theme = _a.theme, color = _a.color;
    var backgroundColor = color && theme.colors ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors[color]) : "white";
    return {
        padding: theme.spacing / 2,
        backgroundColor: backgroundColor,
        color: contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"]),
        outline: "none",
        ":hover": {
            backgroundColor: contiamo_ui_utils_1.darken(backgroundColor)(5),
            color: contiamo_ui_utils_1.readableTextColor(contiamo_ui_utils_1.darken(backgroundColor)(5))(["black", "white"])
        },
        "& + .Select__option": {
            borderTop: "1px solid",
            borderColor: contiamo_ui_utils_1.darken(backgroundColor)(10)
        },
        "&.Select__option_selected": {
            color: contiamo_ui_utils_1.readableTextColor(backgroundColor)(["#aaa"])
        }
    };
};
var SelectOption = function (_a) {
    var className = _a.className, selected = _a.selected, onClick = _a.onClick, children = _a.children;
    return (React.createElement("div", { className: className + " Select__option" + (selected ? " Select__option_selected" : ""), tabIndex: -2, role: "option", "aria-selected": selected, onClick: onClick }, children));
};
exports.SelectOption = SelectOption;
SelectOption.defaultProps = {
    selected: false
};
exports.default = glamorous_1.default(SelectOption)(style);
//# sourceMappingURL=SelectOption.js.map