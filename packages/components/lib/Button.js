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
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, active = _a.active, disabled = _a.disabled, condensed = _a.condensed;
    var backgroundColor = color ? utils_1.hexOrColor(color)(theme.colors[color] || "white") : "white";
    var activeBackgroundColor = utils_1.darken(backgroundColor)(5);
    var textColor = utils_1.readableTextColor(backgroundColor)([theme.colors.emphasizedText, "white"]);
    var activeBoxShadow = theme.shadows.pressed;
    var spacing = theme.spacing;
    return __assign({ label: "button", display: "inline-block", padding: condensed ? spacing / 3 + "px " + spacing * 1 / 2 + "px" : spacing * 2 / 3 + "px " + spacing + "px", border: "1px solid rgba(0, 0, 0, .2)", borderRadius: 2, cursor: disabled ? "auto" : "pointer", boxShadow: active ? activeBoxShadow : "none", backgroundColor: active ? activeBackgroundColor : backgroundColor, color: textColor, opacity: disabled ? 0.6 : 1.0, outline: "none" }, !disabled
        ? {
            ":hover": {
                backgroundColor: activeBackgroundColor,
                color: utils_1.readableTextColor(activeBackgroundColor)(["white", "#222"])
            },
            ":focus": {
                outline: 0,
                backgroundColor: activeBackgroundColor
            },
            ":active": {
                boxShadow: activeBoxShadow
            }
        }
        : {}, { marginRight: spacing / 2 });
});
exports.default = function (props) {
    return (React.createElement(Container, { tabIndex: -1, role: "button", type: props.type, key: props.id, css: props.css, className: props.className, onClick: props.onClick, color: props.color, active: props.active, disabled: props.disabled, condensed: props.condensed }, props.children));
};
//# sourceMappingURL=Button.js.map