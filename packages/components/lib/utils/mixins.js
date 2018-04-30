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
var utils_1 = require("@operational/utils");
exports.inputFocus = function (_a) {
    var theme = _a.theme, isError = _a.isError;
    return ({
        outline: 0,
        border: "1px solid",
        borderColor: isError ? theme.colors.error : theme.colors.info,
        boxShadow: "0 0 0 3px " + utils_1.lighten(isError ? theme.colors.error : theme.colors.info, 40),
    });
};
exports.Label = glamorous_1.default.label(function (_a) {
    var theme = _a.theme;
    return ({
        display: "inline-block",
        position: "relative",
        minWidth: 240,
    });
});
exports.LabelText = glamorous_1.default.span(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.small, { display: "inline-block", verticalAlign: "middle", marginBottom: theme.spacing / 8, 
        // Set font explicitly so it doesn't inherit overrides on the parent
        // (e.g. monospaced code in text areas)
        fontFamily: theme.fontFamily, opacity: 0.4 }));
});
exports.FormFieldControls = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        position: "absolute",
        top: 3,
        right: 0,
    });
});
exports.FormFieldControl = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        position: "relative",
        verticalAlign: "middle",
        display: "inline-block",
        width: "fit-content",
        marginLeft: 4,
        "& svg": {
            opacity: 0.4,
            position: "relative",
            top: -1,
        },
        // :nth-child(2) refers to the tooltip
        "& > :nth-child(2)": {
            display: "none",
        },
        ":hover": {
            "& svg": {
                opacity: 1,
            },
            "& > :nth-child(2)": {
                display: "block",
            },
        },
    });
});
exports.FormFieldError = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.small, { color: theme.colors.error, padding: theme.spacing / 6 + "px " + theme.spacing * 3 / 4 + "px", marginBottom: 0, width: "100%", borderRadius: theme.borderRadius, position: "absolute", backgroundColor: utils_1.lighten(theme.colors.error, 45), boxShadow: theme.shadows.card, bottom: theme.spacing * -1.75, left: 0 }));
});
//# sourceMappingURL=mixins.js.map