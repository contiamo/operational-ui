"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quant_axis_1 = require("../axes/quant_axis");
var time_axis_1 = require("../axes/time_axis");
var categorical_axis_1 = require("../axes/categorical_axis");
var Axis = /** @class */ (function () {
    function Axis(state, stateWriter, events, el, type, position) {
        switch (type) {
            case "quant":
                return new quant_axis_1.default(state, stateWriter, events, el, position);
            case "time":
                return new time_axis_1.default(state, stateWriter, events, el, position);
            case "categorical":
                return new categorical_axis_1.default(state, stateWriter, events, el, position);
            default:
                throw new Error("Invalid axis type " + type);
        }
    }
    return Axis;
}());
exports.default = Axis;
//# sourceMappingURL=axis.js.map