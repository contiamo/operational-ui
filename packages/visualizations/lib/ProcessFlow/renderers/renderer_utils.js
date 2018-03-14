"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var d3_scale_1 = require("d3-scale");
exports.sizeScale = function (range, data) {
    var sizes = fp_1.map(function (el) { return el.size(); })(data);
    return d3_scale_1.scaleLinear()
        .domain([0, Math.max.apply(Math, sizes)])
        .range(range);
};
exports.filterByMatchers = function (matchers) {
    return function (d) {
        return fp_1.every.convert({ cap: false })(function (value, matcher) {
            return fp_1.invoke(matcher)(d) === value;
        })(matchers);
    };
};
exports.exitGroups = function (groups) {
    groups
        .exit()
        .on("mouseenter", null)
        .on("mouseleave", null)
        .remove();
};
//# sourceMappingURL=renderer_utils.js.map