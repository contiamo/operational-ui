"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3-selection");
var d3_array_1 = require("d3-array");
var fp_1 = require("lodash/fp");
var d3_scale_1 = require("d3-scale");
exports.computeScale = function (range, ticks) {
    return d3_scale_1.scaleLinear()
        .range(range)
        .domain(d3_array_1.extent(ticks));
};
// Computes nice steps (for ticks) given a domain [start, stop] and a
// wanted number of ticks (number of ticks returned might differ
// by a few ticks)
exports.computeSteps = function (domain, range, spacing, minTicks) {
    var tickNumber = _this.computeTickNumber(range, spacing, minTicks);
    var span = domain[1] - domain[0];
    var step = Math.pow(10, Math.floor(Math.log(Math.abs(span) / tickNumber) / Math.LN10));
    if (span < 0) {
        step = step * -1;
    }
    var err = tickNumber / span * step;
    var errorMapper = [[err <= 0.15, 10], [err <= 0.35, 5], [err <= 0.75, 2], [true, 1]];
    var multiplier = fp_1.find(0)(errorMapper)[1];
    step *= multiplier;
    return [
        Math.floor(domain[0] / step) * step,
        Math.ceil(domain[1] / step) * step,
        step,
    ];
};
exports.computeTickNumber = function (range, tickSpacing, minTicks) {
    if (minTicks === void 0) { minTicks = 0; }
    var length = Math.abs(range[0]) + Math.abs(range[1]);
    return Math.max(Math.floor(length / tickSpacing), minTicks);
};
exports.computeTicks = function (steps) {
    var ticks = d3_array_1.range.apply(d3, steps);
    ticks.push(steps[1]);
    return ticks;
};
exports.computeDomain = function (data, start, end) {
    if (end < start) {
        throw new Error("Start value cannot be greater than end value.");
    }
    var extent = _this.guess(data);
    return [start || extent[0], end || extent[1]];
};
// Increase the extent by 5% on both sides (so that there's some space
// between the drawings and the borders of the chart), unless one of the ends
// equals 0
exports.extentCushion = function (extent) {
    var distance = extent[1] - extent[0];
    return [
        extent[0] !== 0 ? extent[0] - 0.05 * distance : extent[0],
        extent[1] !== 0 ? extent[1] + 0.05 * distance : extent[1],
    ];
};
// Guess start, end from data
exports.guess = function (data) {
    if (data === void 0) { data = []; }
    var extent = d3_array_1.extent(data);
    // If this axis is user configured but does not currently have any data,
    // we still need to guess some extent here - otherwise animations will blow up
    if (fp_1.isNil(extent[0])) {
        return [0, 100];
    }
    // Start and end are the same
    if (extent[0] === extent[1]) {
        var val = extent[0];
        // This is somewhat arbitrary but we have to come up with something...
        // We return here as no further processing (smart, cut, zero) is possible
        return val === 0
            ? [0, 100]
            : // Make sure axis has right direction
                val < 0 ? [2 * val, 0] : [0, 2 * val];
    }
    // Ensure domain includes zero
    extent[0] = extent[0] > 0 ? 0 : extent[0];
    extent[1] = extent[1] < 0 ? 0 : extent[1];
    return _this.extentCushion(extent);
};
exports.ruleClass = function (ruleValue, index, ticks) {
    return index === ticks.indexOf(0) ? "zero" : "";
};
// Formats the numbers on a quant axis and replaces the last tick with a unit tick, if provided.
exports.tickFormatter = function (step, unitTick, displayUnit) {
    var exp = -Math.floor(Math.log(step) / Math.LN10);
    var expMatch = 3 * Math.round(exp / 3);
    var expMax = Math.max(exp, expMatch);
    var suffix = { 0: "", 3: "k", 6: "m", 9: "bn" }[-expMatch];
    return suffix != null
        ? function (num) {
            if (num === unitTick) {
                return displayUnit;
            }
            var display = Math.round(num * Math.pow(10, expMax)) / +Math.pow(10, expMax - expMatch).toFixed(expMax - expMatch);
            return display === 0 ? display : display + suffix;
        }
        : function (num) {
            if (num === unitTick) {
                return displayUnit;
            }
            return num % 1 === 0 ? num : num.toFixed(2);
        };
};
//# sourceMappingURL=quant_axis_utils.js.map