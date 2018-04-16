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
        boxShadow: "0 0 0 3px " + utils_1.lighten(isError ? theme.colors.error : theme.colors.info, 40)
    });
};
exports.Label = glamorous_1.default.label(function (_a) {
    var theme = _a.theme;
    return ({
        display: "inline-block",
        position: "relative",
        minWidth: 240
    });
});
exports.LabelText = glamorous_1.default.span(function (_a) {
    var theme = _a.theme;
    return (__assign({ display: "inline-block", verticalAlign: "middle", marginBottom: theme.spacing / 8 }, theme.typography.small, { fontWeight: 400, opacity: 0.4 }));
});
//# sourceMappingURL=mixins.js.map