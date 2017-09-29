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
var contiamo_ui_utils_1 = require("@contiamo/ui-utils");
var Line = glamorous_1.default.div({
    position: "absolute",
    left: 7,
    top: 2,
    height: "100%"
}, function (_a) {
    var theme = _a.theme;
    return ({
        borderLeft: "2px solid " + theme.colors.grey30
    });
});
var StatusContainer = glamorous_1.default.div({
    border: "2px solid transparent",
    borderRadius: "100px",
    height: 16,
    position: "absolute",
    top: 2,
    width: 16,
    "& > svg": {
        height: 18,
        width: 18
    }
}, function (_a) {
    var theme = _a.theme, color = _a.color, children = _a.children;
    return (__assign({ backgroundColor: "" + theme.colors.white, borderColor: "" + color, color: "" + color }, children
        ? {
            border: 0,
            borderRadius: 0,
            height: "auto",
            left: -7,
            lineHeight: 0,
            marginTop: 10,
            padding: "3px 0",
            position: "absolute",
            textAlign: "center",
            transform: "translateY(-50%)",
            width: 30
        }
        : {}));
});
var Content = glamorous_1.default.div({
    padding: "0 0 5px 26px",
    position: "relative",
    top: 0,
    "& > *": {
        margin: 0
    },
    "& p": {
        marginBottom: 0
    }
}, function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body));
});
var Container = glamorous_1.default.li({
    listStyle: "none",
    margin: 0,
    padding: "0 0 24px",
    position: "relative",
    "&:last-child > :first-child": {
        display: "none"
    }
});
var TimelineItem = function (_a) {
    var children = _a.children, _b = _a.color, color = _b === void 0 ? "info" : _b, _c = _a.icon, icon = _c === void 0 ? "" : _c, theme = _a.theme;
    var IconLib = ReactFeather;
    var isValidIcon = IconLib.hasOwnProperty(icon);
    var Icon = IconLib[icon];
    color = contiamo_ui_utils_1.hexOrColor(color)(theme.colors[color] || theme.colors.info);
    return (React.createElement(Container, null,
        React.createElement(Line, null),
        React.createElement(StatusContainer, { color: color }, isValidIcon ? React.createElement(Icon, { color: color }) : null),
        React.createElement(Content, null, children)));
};
exports.default = glamorous_1.withTheme(TimelineItem);
//# sourceMappingURL=TimelineItem.js.map