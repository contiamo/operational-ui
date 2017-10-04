"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Container = glamorous_1.default.div({
    display: "flex",
    alignItems: "center",
    maxWidth: 300
}, function (_a) {
    var theme = _a.theme;
    return ({
        padding: theme.spacing / 2,
        background: theme.colors.palette.white,
        "& + &": {
            borderTop: "1px solid " + theme.colors.palette.grey20
        }
    });
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
    overflow: "hidden",
    "& > div": {
        position: "relative"
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
    var backgroundColor = color ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette.info) : theme.colors.palette.info;
    return {
        padding: theme.spacing / 4 + "px " + theme.spacing / 2 + "px",
        backgroundColor: theme.colors.palette.grey10,
        "> div": {
            color: contiamo_ui_utils_1.readableTextColor(backgroundColor)([theme.colors.palette.white, theme.colors.palette.black])
        },
        ":before": {
            backgroundColor: backgroundColor,
            width: fill * 100 + "%"
        }
    };
});
var Number = glamorous_1.default.div({
    fontSize: 24
}, function (_a) {
    var theme = _a.theme;
    return ({
        minWidth: theme.spacing * 3,
        paddingRight: theme.spacing,
        paddingLeft: theme.spacing / 2,
        fontWeight: theme.typography.title.fontWeight,
        color: theme.colors.palette.grey20
    });
});
exports.default = function (_a) {
    var children = _a.children, label = _a.label, fill = _a.fill, number = _a.number, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave;
    return (React.createElement(Container, { onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
        React.createElement(Number, null, number),
        React.createElement("div", { style: { width: "100%" } },
            React.createElement(Label, null, children),
            React.createElement(Bar, { fill: fill },
                React.createElement("div", null, label)))));
};
//# sourceMappingURL=Breakdown.js.map