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
var utils_1 = require("@operational/utils");
exports.inputFocus = function (_a) {
    var theme = _a.theme;
    return ({
        outline: 0,
        border: "1px solid",
        borderColor: theme.colors.info,
        boxShadow: "0 0 0 3px " + utils_1.lighten(theme.colors.info, 40)
    });
};
exports.label = function (_a) {
    var theme = _a.theme;
    return ({
        display: "inline-block",
        minWidth: 240,
        // Styles for the label text's span tag
        "& > :first-child": __assign({ display: "inline-block", marginBottom: theme.spacing / 4 }, theme.typography.small, { fontWeight: 600, opacity: 0.7 })
    });
};
//# sourceMappingURL=mixins.js.map