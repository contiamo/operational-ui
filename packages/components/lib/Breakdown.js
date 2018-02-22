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
var theme_1 = require("@operational/theme");
var utils_1 = require("@operational/utils");
var Container = glamorous_1.default.div({
    label: "breakdown",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    maxWidth: 300
}, function (_a) {
    var theme = _a.theme, onClick = _a.onClick;
    return (__assign({ padding: theme.spacing * 3 / 4 + "px 0" }, onClick
        ? {
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.01)"
            }
        }
        : {}, { background: theme.colors.white, ":not(:first-child)": {
            borderTop: "1px solid " + theme.colors.separator
        } }));
});
var Content = glamorous_1.default.div({
    width: "100%"
});
var Label = glamorous_1.default.label({
    display: "block"
}, function (_a) {
    var theme = _a.theme;
    return ({
        marginBottom: theme.spacing / 4,
        fontSize: theme.typography.small.fontSize
    });
});
var Bar = glamorous_1.default.div({
    position: "relative",
    width: "100%",
    fontSize: 12,
    overflow: "hidden",
    "& > span": {
        position: "relative",
        padding: 2
    },
    ":before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        display: "block",
        height: "100%",
        pointerEvents: "none"
    }
}, function (_a) {
    var theme = _a.theme, fill = _a.fill, color = _a.color;
    var backgroundColor = theme_1.expandColor(theme, color) || theme.colors.info;
    return {
        padding: theme.spacing / 4 + "px " + theme.spacing / 2 + "px",
        backgroundColor: theme.colors.gray10,
        "> span": {
            color: theme.colors.gray70,
            fontSize: 12,
            position: "relative",
            top: 1,
            fontWeight: 400
        },
        ":before": {
            backgroundColor: utils_1.setBrightness(backgroundColor, 155),
            transition: "all 0.3s ease-in-out",
            width: fill * 100 + "%"
        }
    };
});
var Number = glamorous_1.default.div({
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}, function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.heading1, { flex: "0 0 " + theme.spacing * 2.5 + "px", color: theme.colors.gray20 }));
});
exports.default = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className, onClick: props.onClick, onMouseEnter: props.onMouseEnter, onMouseLeave: props.onMouseLeave },
    React.createElement(Number, null, props.number),
    React.createElement(Content, null,
        React.createElement(Label, null, props.children),
        React.createElement(Bar, { color: props.color, fill: props.fill },
            React.createElement("span", null, props.label))))); };
//# sourceMappingURL=Breakdown.js.map