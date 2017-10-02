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
var Container = glamorous_1.default.div({
    "&:not(:first-child)": {
        borderLeftWidth: 1,
        borderLeftStyle: "solid"
    }
}, function (_a) {
    var theme = _a.theme, color = _a.color, withIcon = _a.withIcon;
    var backgroundColor = color
        ? contiamo_ui_utils_1.hexOrColor(color)((theme.colors && theme.colors.palette[color]) || "white")
        : "white";
    return {
        backgroundColor: backgroundColor,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        borderColor: contiamo_ui_utils_1.darken(backgroundColor)(15),
        padding: theme.spacing / 2,
        paddingRight: withIcon ? theme.spacing + 20 : theme.spacing / 2,
        color: contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"])
    };
});
var Label = glamorous_1.default.small(function (_a) {
    var color = _a.color, theme = _a.theme;
    var backgroundColor = color ? contiamo_ui_utils_1.hexOrColor(color)((theme.colors && theme.colors.palette[color]) || "white") : "white";
    return __assign({}, theme.typography.small, { marginBottom: 3, fontWeight: 600, color: contiamo_ui_utils_1.readableTextColor(backgroundColor)([theme.colors.palette.grey60, theme.colors.palette.grey10]) });
});
var IconContainer = glamorous_1.default.div({
    width: 20,
    height: 20,
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)"
}, function (_a) {
    var theme = _a.theme, color = _a.color;
    var backgroundColor = color
        ? contiamo_ui_utils_1.hexOrColor(color)((theme.colors && theme.colors.palette[color]) || "white")
        : "white";
    return {
        right: theme.spacing / 2,
        "& svg": {
            stroke: contiamo_ui_utils_1.readableTextColor(backgroundColor)([theme.colors.palette.white, theme.colors.palette.black])
        }
    };
});
var InfoTile = function (_a) {
    var className = _a.className, label = _a.label, children = _a.children, color = _a.color, icon = _a.icon, onIconClick = _a.onIconClick;
    return (React.createElement(Container, { withIcon: !!icon, color: color, className: className },
        React.createElement(Label, { color: color }, label),
        React.createElement("span", null, children),
        icon ? (React.createElement(IconContainer, { color: color, onClick: onIconClick }, (function () {
            if (ReactFeather.hasOwnProperty(icon)) {
                var Comp = ReactFeather[icon];
                return React.createElement(Comp, { size: 20 });
            }
            return null;
        })())) : null));
};
exports.default = InfoTile;
//# sourceMappingURL=InfoTile.js.map