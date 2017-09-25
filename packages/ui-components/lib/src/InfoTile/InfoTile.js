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
var ReactFeather = require("react-feather");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, withIcon = _a.withIcon;
    var backgroundColor = color ? contiamo_ui_utils_1.hexOrColor(color)((theme.colors && theme.colors[color]) || "white") : "white";
    return {
        backgroundColor: backgroundColor,
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        padding: theme.spacing / 2,
        paddingRight: withIcon ? (theme.spacing / 2 + 20) : (theme.spacing / 2),
        color: contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"]),
        "& + &": {
            borderLeft: "1px solid",
            borderLeftColor: contiamo_ui_utils_1.darken(backgroundColor)(10)
        }
    };
});
var Label = glamorous_1.default.small(function (_a) {
    var color = _a.color, theme = _a.theme;
    var backgroundColor = color ? contiamo_ui_utils_1.hexOrColor(color)((theme.colors && theme.colors[color]) || "white") : "white";
    return __assign({}, theme.typography.small, { marginBottom: 3, fontWeight: 600, color: contiamo_ui_utils_1.readableTextColor(backgroundColor)([theme.colors.grey60, theme.colors.grey10]) });
});
var IconContainer = glamorous_1.default.div({});
var InfoTile = function (_a) {
    var className = _a.className, label = _a.label, children = _a.children, color = _a.color, icon = _a.icon;
    return (React.createElement(Container, { withIcon: !!icon, color: color, className: "" + className },
        React.createElement(Label, { color: color }, label),
        React.createElement("span", null, children),
        icon ?
            React.createElement(IconContainer, null, (function () {
                if (ReactFeather.hasOwnProperty(icon)) {
                    var Comp = ReactFeather[icon];
                    return React.createElement(Comp, { size: 20 });
                }
                return null;
            }())) : null));
};
exports.default = InfoTile;
//# sourceMappingURL=InfoTile.js.map