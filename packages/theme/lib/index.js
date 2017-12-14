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
var colors = {
    brand: "#000000",
    info: "#1499CE",
    success: "#00b34d",
    warning: "#FFAE00",
    error: "#DE1A1A",
    white: "#FFFFFF",
    black: "#000000",
    gray10: "#F8F8F8",
    gray20: "#e8e8e8",
    gray30: "#D0D0D0",
    gray40: "#C6C6C6",
    gray50: "#BBBBBB",
    gray60: "#999999",
    gray70: "#808080",
    gray80: "#747474",
    gray90: "#444444",
    background: "#F1F1F1",
    bodyText: "#555f61",
    cardBackground: "#FFFFFF",
    border: "#dadada",
    emphasizedText: "#373d3f",
    lightText: "#969696",
    linkText: "#1499CE",
    sidenavBackground: "#393939",
    separator: "#f2f2f2",
    secondarySeparator: "#f8f8f8"
};
var baseTypography = {
    lineHeight: "1.5",
    textTransform: "none",
    letterSpacing: "normal"
};
var typography = {
    title: __assign({}, baseTypography, { fontSize: 22, fontWeight: 600 }),
    heading1: __assign({}, baseTypography, { fontSize: 13, fontWeight: 700, color: "#373d3f" }),
    heading2: __assign({}, baseTypography, { fontSize: 13, fontWeight: 600, textTransform: "uppercase", color: "#969696", "&::before": {
            content: "» "
        } }),
    body: __assign({}, baseTypography, { fontSize: 13, fontWeight: 400 }),
    small: __assign({}, baseTypography, { fontSize: 12, fontWeight: 400 })
};
var shadows = {
    pressed: "inset 0 1px 1px rgba(0,0,0,0.15)",
    card: "0px 1px 2px #d3d1d1",
    focus: "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(82,168,236,.6)",
    popup: "0 3px 12px rgba(0, 0, 0, .14)"
};
var operational = {
    typography: typography,
    shadows: shadows,
    colors: colors,
    spacing: 12,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    baseZIndex: 0
};
exports.operational = operational;
//# sourceMappingURL=index.js.map