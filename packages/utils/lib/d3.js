"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Modifies a d3 event handler function to include the d3 element
 * from context as a second argument, passing any remaining ones
 * from the spread.
 */
exports.handleWithD3Element = function (handler) {
    return function (datum) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        handler.apply(void 0, [datum, this].concat(args));
    };
};
//# sourceMappingURL=d3.js.map