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
var glamorous_1 = require("glamorous");
var glamor_1 = require("glamor");
var inputHeight = 27;
var fadeIn = glamor_1.css.keyframes({
    from: {
        opacity: 0,
        transform: "translate3d(-50%, -6px, 0)"
    },
    to: {
        opacity: 1,
        transform: "translate3d(-50%, 0, 0)"
    }
});
exports.Container = glamorous_1.default.div(function (_a) {
    var isExpanded = _a.isExpanded, theme = _a.theme;
    return ({
        display: "inline-block",
        width: "auto",
        position: "relative",
        "& .co_card": {
            animation: fadeIn + " ease-in-out forwards 0.2s",
            display: isExpanded ? "block" : "none",
            position: "absolute",
            top: 30,
            left: "50%",
            transform: "translate3d(-50%, 0, 0)",
            padding: theme.spacing * 3 / 4 + "px " + theme.spacing + "px " + theme.spacing * 4 / 3 + "px",
            width: 210 + 2 * theme.spacing,
            zIndex: theme.baseZIndex + 1000
        }
    });
});
exports.Toggle = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        position: "absolute",
        bottom: 0,
        right: 0,
        width: inputHeight,
        height: inputHeight,
        fontSize: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: theme.baseZIndex + 1,
        color: theme.colors.palette.grey80,
        borderLeft: "1px solid " + theme.colors.palette.grey40
    });
});
exports.MonthNav = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        marginBottom: theme.spacing / 2,
        textAlign: "center",
        "& > *": {
            margin: "0 6px",
            verticalAlign: "middle",
            display: "inline-block"
        },
        "& > span": __assign({}, theme.typography.body, { userSelect: "none", width: 100, textAlign: "center" })
    });
});
exports.IconContainer = glamorous_1.default.div({
    backgroundColor: "#FFFFFF",
    padding: 4,
    height: "auto",
    width: "fit-content",
    cursor: "pointer"
});
exports.Days = glamorous_1.default.div({
    textAlign: "center",
    width: 210,
    margin: "auto -1px"
});
exports.Day = glamorous_1.default.div({
    userSelect: "none",
    width: 30,
    height: 30,
    marginRight: -1,
    marginBottom: -1,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #efefef"
}, function (_a) {
    var theme = _a.theme, selected = _a.selected, isPlaceholder = _a.isPlaceholder;
    return (__assign({}, theme.typography.body, { backgroundColor: selected ? theme.colors.palette.success : "transparent", color: selected ? "#FFF" : isPlaceholder ? theme.colors.palette.grey80 : theme.colors.palette.black }));
});
exports.Input = glamorous_1.default.input(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body, { userSelect: "none", padding: theme.spacing / 2, height: inputHeight, border: "1px solid", borderColor: theme.colors.palette.grey30, width: 200, position: "relative" }));
});
exports.ClearButton = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        width: inputHeight,
        height: inputHeight,
        cursor: "pointer",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bottom: 0,
        right: -inputHeight + 1,
        opacity: 0.3,
        textAlign: "center",
        zIndex: theme.baseZIndex + 100,
        "&:hover": {
            opacity: 1,
            "& svg": {
                stroke: theme.colors.palette.warning
            }
        }
    });
});
//# sourceMappingURL=DatePicker.styles.js.map