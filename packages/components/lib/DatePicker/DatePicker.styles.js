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
var mixins = require("../utils/mixins");
var constants_1 = require("../constants");
var inputHeight = 33;
exports.Container = glamorous_1.default.div(function (_a) {
    var isExpanded = _a.isExpanded, theme = _a.theme;
    return ({
        label: "datepicker",
        width: constants_1.inputDefaultWidth,
        position: "relative"
    });
});
exports.DatePickerCard = glamorous_1.default.div({
    position: "absolute",
    left: 0
}, function (_a) {
    var theme = _a.theme, isExpanded = _a.isExpanded;
    return ({
        backgroundColor: theme.colors.white,
        display: isExpanded ? "block" : "none",
        boxShadow: theme.shadows.popup,
        borderRadius: theme.borderRadius,
        // Push down the card to the bottom of the input field,
        // plus the twice the size of the outside focus shadow.
        top: inputHeight + 6,
        padding: theme.spacing * 3 / 4 + "px " + theme.spacing + "px " + theme.spacing * 4 / 3 + "px",
        width: constants_1.inputDefaultWidth,
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
        borderTopRightRadius: theme.borderRadius,
        borderBottomRightRadius: theme.borderRadius,
        width: inputHeight - 2,
        height: inputHeight - 2,
        fontSize: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: theme.baseZIndex + 1000,
        color: theme.colors.inputBorder,
        borderLeft: "1px solid",
        borderColor: theme.colors.inputBorder,
        "& svg": {
            position: "relative",
            pointerEvents: "none"
        },
        ":hover": {
            backgroundColor: theme.colors.lighterBackground
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
        "& > span": __assign({}, theme.typography.body, { userSelect: "none", width: 120, textAlign: "center" })
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
    return (__assign({}, theme.typography.body, { backgroundColor: selected ? theme.colors.info : "transparent", color: selected ? theme.colors.white : isPlaceholder ? theme.colors.gray : theme.colors.black }));
});
exports.Input = glamorous_1.default.input(function (_a) {
    var theme = _a.theme, isExpanded = _a.isExpanded;
    return (__assign({}, theme.typography.body, { userSelect: "none", borderRadius: theme.borderRadius, padding: theme.spacing * 2 / 3, height: inputHeight, cursor: "pointer", border: "1px solid", borderColor: "rgb(208, 217, 229)", width: 200, position: "relative", "&:focus": mixins.inputFocus({ theme: theme }) }, isExpanded ? mixins.inputFocus({ theme: theme }) : {}));
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