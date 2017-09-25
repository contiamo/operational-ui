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
var THEME_COLORS = {
    info: "#1499CE",
    success: "#689F2C",
    warning: "#FFAE00",
    error: "#DE1A1A",
    white: "#FFFFFF",
    black: "#000000",
    grey10: "#F5F5F5",
    grey20: "#F1F1F1",
    grey30: "#D0D9E5",
    grey40: "#C6D1E1",
    grey50: "#BBCADC",
    grey60: "#999999",
    grey70: "#8092B0",
    grey80: "#747474",
    grey90: "#445873"
};
var baseTypography = {
    lineHeight: "1.5",
    textTransform: "none",
    letterSpacing: 0.2
};
var DEFAULT_TYPOGRAPHY = {
    title: __assign({}, baseTypography, { fontSize: 22, fontWeight: 600, opacity: 1 }),
    heading1: __assign({}, baseTypography, { fontSize: 13, fontWeight: 700, opacity: 1 }),
    heading2: __assign({}, baseTypography, { fontSize: 13, fontWeight: 700, opacity: 0.6 }),
    body: __assign({}, baseTypography, { fontSize: 13, fontWeight: 400, opacity: 1 }),
    small: __assign({}, baseTypography, { fontSize: 12, fontWeight: 400, opacity: 1 })
};
var DEFAULT_THEME = {
    colors: THEME_COLORS,
    typography: DEFAULT_TYPOGRAPHY,
    spacing: 12,
    baseZIndex: 0
};
exports.default = DEFAULT_THEME;
//# sourceMappingURL=theme.js.map