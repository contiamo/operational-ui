"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colorCalculator = require("tinycolor2");
var getBrightestColor = function (colors) {
    return colors.reduce(function (acc, curr) {
        if (curr.l > acc.l) {
            return curr;
        }
        return acc;
    });
};
exports.readableTextColor = function (backgroundColor, workingColors) {
    var backgroundHsl = colorCalculator(backgroundColor).toHsl();
    var workingColorHsls = workingColors.map(function (color) { return colorCalculator(color).toHsl(); });
    // For reasonably saturated colors on the bright side, still pick the lightest color.
    if (backgroundHsl.s > 0.4 && backgroundHsl.l < 0.75) {
        return colorCalculator(getBrightestColor(workingColorHsls)).toHexString();
    }
    return colorCalculator.mostReadable(backgroundColor, workingColors).toHexString();
};
exports.darken = function (color, percentage) {
    return colorCalculator(color)
        .darken(percentage)
        .toString();
};
exports.lighten = function (color, percentage) {
    return colorCalculator(color)
        .lighten(percentage)
        .toString();
};
exports.getBrightness = function (color) {
    var c = colorCalculator(color);
    return c.getBrightness();
};
exports.setBrightness = function (color, targetBrightness) {
    var c = colorCalculator(color);
    var brightness = c.getBrightness();
    return c.brighten(targetBrightness / brightness * 100 - 100).toString();
};
exports.transparentize = function (color) { return function (percentage) {
    return (function (_a) {
        var r = _a.r, g = _a.g, b = _a.b;
        return "rgba(" + r + ", " + g + ", " + b + ", " + 255 * (100 - percentage) / 100 + ")";
    })(colorCalculator(color).toRgb());
}; };
//# sourceMappingURL=color.js.map