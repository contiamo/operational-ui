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
    var theme = _a.theme, color = _a.color, active = _a.active, modifiers = _a.modifiers;
    var backgroundColor = color ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors[color] || "white") : "white";
    var activeBackgroundColor = contiamo_ui_utils_1.darken(backgroundColor)(5);
    var textColor = contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"]);
    var activeBoxShadow = "2px 2px 4px rgba(0, 0, 0, 0.14) inset";
    var isGroup = modifiers && modifiers.indexOf("group") > -1;
    var isSpace = modifiers && modifiers.indexOf("space") > -1;
    var spacing = theme.spacing;
    return {
        display: "inline-block",
        padding: spacing / 2,
        border: "1px solid rgba(0, 0, 0, .2)",
        cursor: "pointer",
        boxShadow: active ? activeBoxShadow : "none",
        backgroundColor: active ? activeBackgroundColor : backgroundColor,
        color: textColor,
        ":hover": {
            backgroundColor: activeBackgroundColor,
            color: contiamo_ui_utils_1.readableTextColor(activeBackgroundColor)(["white", "black"])
        },
        ":active": {
            boxShadow: activeBoxShadow
        },
        marginLeft: isGroup ? -1 : isSpace ? spacing / 2 : "0"
    };
});
var Button = function (props) { return React.createElement(Container, __assign({ tabIndex: -1, role: "button" }, props)); };
exports.default = Button;
//# sourceMappingURL=Button.js.map