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
// It is necessary to import the card props so that TypeScript can compile type definitions.
var Card_1 = require("../Card");
var mixins = require("../utils/mixins");
var inputHeight = 33;
exports.Container = glamorous_1.default.div(function (_a) {
    var isExpanded = _a.isExpanded, theme = _a.theme;
    return ({
        label: "datepicker",
        width: 215 + 2 * theme.spacing,
        position: "relative"
    });
});
exports.DatePickerCard = glamorous_1.default(Card_1.default)({
    position: "absolute",
    left: 0
}, function (_a) {
    var theme = _a.theme, isExpanded = _a.isExpanded;
    return ({
        display: isExpanded ? "block" : "none",
        boxShadow: theme.shadows.popup,
        top: inputHeight + 4,
        padding: theme.spacing * 3 / 4 + "px " + theme.spacing + "px " + theme.spacing * 4 / 3 + "px",
        width: 215 + 2 * theme.spacing,
        zIndex: theme.baseZIndex + 1000
    });
});
exports.Toggle = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        position: "absolute",
        cursor: "pointer",
        top: 1,
        right: 1,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        width: inputHeight - 2,
        height: inputHeight - 2,
        fontSize: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: theme.baseZIndex + 1000,
        color: theme.colors.gray80,
        borderLeft: "1px solid rgb(208, 217, 229)",
        "& svg": {
            position: "relative",
            pointerEvents: "none"
        },
        ":hover": {
            backgroundColor: theme.colors.gray10
        }
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
    return (__assign({}, theme.typography.body, { backgroundColor: selected ? theme.colors.info : "transparent", color: selected ? "#FFF" : isPlaceholder ? theme.colors.gray40 : theme.colors.black }));
});
exports.Input = glamorous_1.default.input(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body, { userSelect: "none", borderRadius: 4, padding: theme.spacing * 2 / 3, height: inputHeight, cursor: "pointer", border: "1px solid", borderColor: "rgb(208, 217, 229)", width: 200, position: "relative", "&:focus": mixins.inputFocus({ theme: theme }) }));
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
                stroke: theme.colors.warning
            }
        }
    });
});
//# sourceMappingURL=DatePicker.styles.js.map