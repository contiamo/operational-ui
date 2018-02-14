"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withD3Element = function (func) {
    return function (datum) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return func.apply(void 0, [datum, this].concat(args));
    };
};
// Only animates transitions if the document can be seen
// N.B. can only be used if no attribute interpolation required
exports.transitionIfVisible = function (selection, duration) {
    return document.hidden ? selection : selection.transition().duration(duration);
};
exports.onTransitionEnd = function (selection, func) {
    var n = 0;
    return selection
        .each(function () { return (n = n + 1); })
        .on("end", function () {
        n = n - 1;
        if (n < 1) {
            func();
        }
    });
};
//# sourceMappingURL=d3_utils.js.map