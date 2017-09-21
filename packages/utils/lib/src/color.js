"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colorCalculator = require("tinycolor2");
function hexOrColor(color) {
    /*
        Allow for named colors from the theme, AND hex codes.
        Test for #f00b4r, or just #foo. If it doesn't match,
        check for a named color in the theme.
  
        Usage: hexOrColor("MY COLOR LOL")("#foob47") where the
        first argument is a string that could possibly be a hex code.
        If it IS a hex code, use it. If not, use the hex code in the
        returned function.
      */
    var hexRegEx = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i, isColorACodeOrHex = hexRegEx.test(color);
    return function (fallback) { return isColorACodeOrHex ? color : fallback; };
}
exports.hexOrColor = hexOrColor;
var readableTextColor = function (background) { return function (workingColors) {
    return colorCalculator.mostReadable(background, workingColors).toHexString();
}; }, darken = function (color) { return function (percentage) {
    return colorCalculator(color).darken(percentage).toString();
}; };
exports.readableTextColor = readableTextColor;
exports.darken = darken;
//# sourceMappingURL=color.js.map