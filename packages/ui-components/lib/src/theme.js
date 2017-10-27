"use strict";
// Type definitions
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Default theme definition
var palette = {
    info: "#1499CE",
    success: "#00b34d",
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
var usageColors = {
    bodyText: "#555f61",
    lightText: "#969696",
    emphasizedText: "#373d3f",
    contentBorder: "#dadada",
    bodyBackground: "#F1F1F1",
    cardBackground: palette.white,
    contentSeparatorLine: "#f2f2f2",
    subContentSeparatorLine: "#f8f8f8"
};
var colors = {
    palette: palette,
    usage: usageColors
};
var baseTypography = {
    lineHeight: "1.5",
    textTransform: "none",
    letterSpacing: "normal"
};
var typography = {
    title: __assign({}, baseTypography, { fontSize: 22, fontWeight: 600 }),
    heading1: __assign({}, baseTypography, { fontSize: 13, fontWeight: 700, color: usageColors.emphasizedText }),
    heading2: __assign({}, baseTypography, { fontSize: 13, fontWeight: 600, textTransform: "uppercase", color: usageColors.lightText, "&::before": {
            content: "» "
        } }),
    body: __assign({}, baseTypography, { fontSize: 13, fontWeight: 400 }),
    small: __assign({}, baseTypography, { fontSize: 12, fontWeight: 400 })
};
var shadows = {
    pressed: "inset 0 1px 1px rgba(0,0,0,0.15)",
    card: "0px 1px 2px #d3d1d1"
};
var defaultTheme = {
    typography: typography,
    shadows: shadows,
    colors: colors,
    spacing: 12,
    baseZIndex: 0
};
exports.default = defaultTheme;
//# sourceMappingURL=theme.js.map