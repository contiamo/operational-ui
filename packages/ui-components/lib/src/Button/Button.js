"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, active = _a.active, disabled = _a.disabled, modifiers = _a.modifiers, condensed = _a.condensed;
    var backgroundColor = color ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette[color] || "white") : "white";
    var activeBackgroundColor = contiamo_ui_utils_1.darken(backgroundColor)(5);
    var textColor = contiamo_ui_utils_1.readableTextColor(backgroundColor)([theme.colors.usage.emphasizedText, "white"]);
    var activeBoxShadow = theme.shadows.pressed;
    var isSpace = modifiers && modifiers.indexOf("space") > -1;
    var spacing = theme.spacing;
    return {
        display: "inline-block",
        padding: condensed ? spacing / 3 + "px " + spacing * 1 / 2 + "px" : spacing * 2 / 3 + "px " + spacing + "px",
        border: "1px solid rgba(0, 0, 0, .2)",
        borderRadius: 2,
        cursor: "pointer",
        boxShadow: active ? activeBoxShadow : "none",
        backgroundColor: active ? activeBackgroundColor : backgroundColor,
        color: textColor,
        opacity: disabled ? 0.6 : 1.0,
        outline: "none",
        ":hover": {
            backgroundColor: activeBackgroundColor,
            color: contiamo_ui_utils_1.readableTextColor(activeBackgroundColor)(["white", "#222"])
        },
        ":focus": {
            outline: 0,
            backgroundColor: activeBackgroundColor
        },
        ":active": {
            boxShadow: activeBoxShadow
        },
        marginLeft: isSpace ? spacing / 2 : undefined
    };
});
var Button = function (props) { return React.createElement(Container, __assign({ tabIndex: -1, role: "button" }, props)); };
exports.default = Button;
//# sourceMappingURL=Button.js.map