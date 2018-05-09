"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepFunction = function (element, availableWidth) {
    return function (x) {
        element.style("font-size", x + "px");
        return availableWidth - element.node().getBoundingClientRect().width;
    };
};
// y is a step-function (with two x values resulting in the same y value)
// on the positive integer domain which is monotonic decreasing
exports.approxZero = function (y, initialX) {
    // make sure to get points with different y value
    var p0 = { x: initialX, y: y(initialX) };
    var p1 = { x: initialX + 2, y: y(initialX + 2) };
    // Solve for 0
    var m = (p0.y - p1.y) / (p0.x - p1.x);
    var xZero = -p0.y / m + p0.x;
    // Find nearest integer value for x that has y > 0
    var xInt = Math.round(xZero);
    for (var i = 0; i <= 10; i = i + 1) {
        if (y(xInt) <= 0) {
            xInt = xInt - 1;
        }
    }
    return xInt;
};
//# sourceMappingURL=font_sizing_utils.js.map