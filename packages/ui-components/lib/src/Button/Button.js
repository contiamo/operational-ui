"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Button = function (_a) {
    var _b = _a.className, className = _b === void 0 ? "" : _b, onClick = _a.onClick, children = _a.children, _c = _a.modifiers, modifiers = _c === void 0 ? [] : _c;
    return React.createElement("div", { tabIndex: -1, role: "button", className: className + " Button" + modifiers
            .map(function (mod) { return (modifiers.length > 0 ? " " : "") + "Button_" + mod; })
            .join(" "), onClick: onClick }, children);
}, style = function (_a) {
    var theme = _a.theme, color = _a.color, active = _a.active;
    var backgroundColor = color ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors ? theme.colors[color] : "white") : "white", activeBackgroundColor = contiamo_ui_utils_1.darken(backgroundColor)(5), textColor = contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"]), activeBoxShadow = "2px 2px 4px rgba(0, 0, 0, 0.14) inset";
    return {
        display: "inline-block",
        padding: theme.spacing ? theme.spacing / 2 : 8,
        border: "1px solid rgba(0, 0, 0, .2)",
        cursor: "pointer",
        boxShadow: active ? activeBoxShadow : "none",
        backgroundColor: active ? activeBackgroundColor : backgroundColor,
        color: textColor,
        ":hover": {
            backgroundColor: activeBackgroundColor,
            color: contiamo_ui_utils_1.readableTextColor(activeBackgroundColor)(["white", "black"]),
        },
        ":active": {
            boxShadow: activeBoxShadow,
        },
        "&.Button_group": {
            marginLeft: -1,
        },
        "&.Button_space": {
            marginLeft: theme.spacing ? theme.spacing / 2 : 8,
        },
    };
};
exports.Button = Button;
exports.style = style;
exports.default = glamorous_1.default(Button)(style);
//# sourceMappingURL=Button.js.map