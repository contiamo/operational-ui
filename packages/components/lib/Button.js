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
var utils_1 = require("@operational/utils");
var theme_1 = require("@operational/theme");
var color_1 = require("./utils/color");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, active = _a.active, disabled = _a.disabled, condensed = _a.condensed;
    var defaultColor = theme.colors.white;
    var backgroundColor = theme_1.expandColor(theme, color) || defaultColor;
    var activeBackgroundColor = utils_1.darken(backgroundColor, 5);
    var textColor = utils_1.readableTextColor(backgroundColor, [theme.colors.emphasizedText, "white"]);
    var activeBoxShadow = theme.shadows.pressed;
    var spacing = theme.spacing;
    return __assign({ label: "button", display: "inline-block", padding: condensed ? spacing / 3 + "px " + spacing + "px" : spacing * 2 / 3 + "px " + spacing * 2 + "px", borderRadius: 2, border: "1px solid", borderColor: color_1.isWhite(backgroundColor) ? theme.colors.gray30 : active ? activeBackgroundColor : backgroundColor, cursor: disabled ? "auto" : "pointer", boxShadow: active ? activeBoxShadow : "none", backgroundColor: active ? activeBackgroundColor : backgroundColor, color: textColor, opacity: disabled ? 0.6 : 1.0, outline: "none" }, !disabled
        ? {
            ":hover": {
                backgroundColor: activeBackgroundColor,
                color: utils_1.readableTextColor(activeBackgroundColor, ["white", "#222"])
            },
            ":focus": {
                outline: 0,
                boxShadow: "0 0 0 3px " + utils_1.lighten(backgroundColor, 35)
            },
            ":active": {
                boxShadow: activeBoxShadow
            }
        }
        : {}, { marginRight: spacing / 2 });
});
exports.default = function (props) {
    return (React.createElement(Container, { tabIndex: -1, role: "button", type: props.type, key: props.id, css: props.css, className: props.className, onClick: props.disabled ? null : props.onClick, color: props.color, active: props.active, disabled: props.disabled, condensed: props.condensed }, props.children));
};
//# sourceMappingURL=Button.js.map