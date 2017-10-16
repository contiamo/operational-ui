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
exports.Container = glamorous_1.default.div(function (_a) {
    var isExpanded = _a.isExpanded, theme = _a.theme;
    return ({
        display: "inline-block",
        width: "auto",
        position: "relative",
        "& .co_card": {
            display: isExpanded ? "block" : "none",
            position: "absolute",
            top: 30,
            left: "50%",
            transform: "translate3d(-50%, 0, 0)",
            width: 240
        }
    });
});
exports.Toggle = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        position: "absolute",
        top: 0,
        right: 0,
        width: 24,
        height: 24,
        fontSize: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: theme.baseZIndex + 1,
        color: theme.colors.palette.grey80,
        borderLeft: "1px solid " + theme.colors.palette.grey60
    });
});
exports.Nav = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        marginBottom: theme.spacing / 2,
        textAlign: "center",
        "& > *": {
            margin: "0 6px",
            verticalAlign: "middle",
            display: "inline-block"
        },
        "& > span": __assign({}, theme.typography.body, { width: 100, textAlign: "center" })
    });
});
exports.IconContainer = glamorous_1.default.div({
    width: 16,
    height: 16,
    cursor: "pointer"
});
exports.Days = glamorous_1.default.div({
    width: 210,
    margin: "auto"
});
exports.Day = glamorous_1.default.div({
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
    return (__assign({}, theme.typography.body, { backgroundColor: selected ? theme.colors.palette.success : "transparent", color: selected ? "#FFF" : "#000", visibility: isPlaceholder ? "hidden" : "visible", content: isPlaceholder ? "' '" : "" }));
});
exports.Input = glamorous_1.default.input(function (_a) {
    var theme = _a.theme;
    return ({
        padding: theme.spacing / 2,
        height: 24,
        border: "1px solid",
        borderColor: theme.colors.palette.grey30,
        width: 160,
        position: "relative"
    });
});
//# sourceMappingURL=DatePicker.styles.js.map