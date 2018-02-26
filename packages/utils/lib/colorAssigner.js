"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorAssigner = function (palette) {
    if (palette.length === 0) {
        throw new Error("No color palette defined");
    }
    var assigned = {};
    var usedColors = [];
    var getColor = function (key) {
        return assigned[key];
    };
    var nextColor = function () {
        // Count how many times each colour has been used
        var usageCount = palette.reduce(function (memo, color) {
            memo[color] = 0;
            return memo;
        }, {});
        usedColors.forEach(function (color) {
            usageCount[color] += 1;
        });
        var min = palette.reduce(function (memo, color) {
            memo = memo ? Math.min(memo, usageCount[color]) : usageCount[color];
            return memo;
        }, undefined);
        // Find a color with the minimum usage count
        return palette.find(function (color) {
            return usageCount[color] === min;
        });
    };
    var addAssignment = function (key, color) {
        assigned[key] = color;
        usedColors.push(color);
        return color;
    };
    var assignColor = function (key, color) {
        // @TODO color must be a hex
        return addAssignment(key, color || nextColor());
    };
    return function (key, color) {
        return getColor(key) || assignColor(key, color);
    };
};
//# sourceMappingURL=colorAssigner.js.map