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
var Container = glamorous_1.default.div({
    display: "flex",
    alignItems: "center",
    position: "relative",
    maxWidth: 300
}, function (_a) {
    var theme = _a.theme, onClick = _a.onClick;
    return (__assign({ padding: theme.spacing / 2 + "px " + theme.spacing / 2 + "px " + theme.spacing / 2 + "px " + 3 * theme.spacing + "px" }, onClick
        ? {
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.01)"
            }
        }
        : {}, { background: theme.colors.palette.white, ":not(:first-child)": {
            borderTop: "1px solid " + theme.colors.palette.grey20
        } }));
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
    var backgroundColor = color
        ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette[color] || theme.colors.palette.info)
        : theme.colors.palette.info;
    return {
        padding: theme.spacing / 4 + "px " + theme.spacing / 2 + "px",
        backgroundColor: theme.colors.palette.grey10,
        "> span": {
            color: theme.colors.palette.grey70,
            fontSize: 12,
            position: "relative",
            top: 1,
            fontWeight: 400
        },
        ":before": {
            backgroundColor: contiamo_ui_utils_1.setBrightness(backgroundColor, 145),
            width: fill * 100 + "%"
        }
    };
});
var Number = glamorous_1.default.div({
    fontSize: 24,
    position: "absolute"
}, function (_a) {
    var theme = _a.theme;
    return ({
        top: theme.spacing,
        right: "calc(100% - " + 3.75 * theme.spacing + "px)",
        minWidth: theme.spacing * 3,
        paddingRight: theme.spacing,
        paddingLeft: theme.spacing / 2,
        fontWeight: theme.typography.title.fontWeight,
        color: theme.colors.palette.grey20
    });
});
exports.default = function (_a) {
    var css = _a.css, className = _a.className, children = _a.children, color = _a.color, label = _a.label, fill = _a.fill, number = _a.number, onClick = _a.onClick, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave;
    return (React.createElement(Container, { css: css, className: className, onClick: onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
        React.createElement(Number, null, number),
        React.createElement("div", { style: { width: "100%" } },
            React.createElement(Label, null, children),
            React.createElement(Bar, { color: color, fill: fill },
                React.createElement("span", null, label)))));
};
//# sourceMappingURL=Breakdown.js.map