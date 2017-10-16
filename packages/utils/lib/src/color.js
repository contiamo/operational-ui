"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colorCalculator = require("tinycolor2");
var hexOrColor = function (color) {
    /*
        Allow for named colors from the theme, AND hex codes.
        Test for #f00b4r, or just #foo. If it doesn't match,
        check for a named color in the theme.
  
        Usage: hexOrColor("MY COLOR LOL")("#foob47") where the
        first argument is a string that could possibly be a hex code.
        If it IS a hex code, use it. If not, use the hex code in the
        returned function.
      */
    var hexRegEx = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    var isColorACodeOrHex = hexRegEx.test(color);
    return function (fallback) { return (isColorACodeOrHex ? color : fallback); };
};
exports.hexOrColor = hexOrColor;
var getBrightestColor = function (colors) {
    return colors.reduce(function (acc, curr) {
        if (curr.l > acc.l) {
            return curr;
        }
        return acc;
    });
};
var readableTextColor = function (background) { return function (workingColors) {
    var backgroundHsl = colorCalculator(background).toHsl();
    var workingColorHsls = workingColors.map(function (color) { return colorCalculator(color).toHsl(); });
    // For reasonably saturated colors on the bright side, still pick the lightest color.
    if (backgroundHsl.s > 0.4 && backgroundHsl.l < 0.75) {
        return colorCalculator(getBrightestColor(workingColorHsls)).toHexString();
    }
    return colorCalculator.mostReadable(background, workingColors).toHexString();
}; };
exports.readableTextColor = readableTextColor;
var darken = function (color) { return function (percentage) {
    return colorCalculator(color)
        .darken(percentage)
        .toString();
}; };
exports.darken = darken;
var lighten = function (color) { return function (percentage) {
    return colorCalculator(color)
        .lighten(percentage)
        .toString();
}; };
exports.lighten = lighten;
var transparentize = function (color) { return function (percentage) {
    return (function (_a) {
        var r = _a.r, g = _a.g, b = _a.b;
        return "rgba(" + r + ", " + g + ", " + b + ", " + 255 * (100 - percentage) / 100 + ")";
    })(colorCalculator(color).toRgb());
}; };
exports.transparentize = transparentize;
//# sourceMappingURL=color.js.map