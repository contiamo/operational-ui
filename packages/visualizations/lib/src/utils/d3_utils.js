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
//# sourceMappingURL=d3_utils.js.map