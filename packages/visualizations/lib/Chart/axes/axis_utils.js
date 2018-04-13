"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3_utils_1 = require("../../utils/d3_utils");
var fp_1 = require("lodash/fp");
var styles = require("./styles");
var moment = require("moment");
exports.axisPosition = function (position, drawingDims) {
    switch (position) {
        case "x1":
            return [0, drawingDims.height];
        case "x2":
            return [0, 0];
        case "y1":
            return [0, 0];
        case "y2":
            return [drawingDims.width, 0];
    }
};
exports.insertElements = function (el, position, drawingDims) {
    var axisGroup = el
        .append("svg:g")
        .attr("class", "axis quant-axis " + position)
        .attr("transform", "translate(" + exports.axisPosition(position, drawingDims).join(",") + ")");
    // Background rect for component hover
    axisGroup.append("svg:rect").attr("class", styles.componentRect);
    // Border
    axisGroup
        .append("svg:line")
        .attr("class", styles.border)
        .call(d3_utils_1.setLineAttributes, { x1: 0, x2: 0, y1: 0, y2: 0 });
    return axisGroup;
};
exports.computeRange = function (config, computed, position) {
    var computedAxes = computed.axes.margins || {};
    var margin = function (axis) {
        return fp_1.includes(axis)(computed.axes.requiredAxes) ? computedAxes[axis] || config[axis].margin : 0;
    };
    return position[0] === "x"
        ? [0, computed.canvas.drawingDims.width]
        : [computed.canvas.drawingDims.height, margin("x2") || config[position].minTopOffsetTopTick];
};
exports.computeRequiredMargin = function (axis, computedMargins, config, position) {
    var requiredMargin = config.margin;
    if (position[0] === "x") {
        return requiredMargin;
    }
    var axisWidth = axis.node().getBBox().width;
    return Math.max(requiredMargin, Math.ceil(axisWidth) + config.outerPadding);
};
exports.alignAxes = function (axes) {
    if (fp_1.keys(axes).length !== 2) {
        return;
    }
    var axesTypes = fp_1.flow(fp_1.values, fp_1.map(fp_1.get("type")), fp_1.uniqBy(String))(axes);
    if (axesTypes.length > 1 || axesTypes[0] === "categorical") {
        throw new Error("Axes of types " + axesTypes.join(", ") + " cannot be aligned");
    }
    axesTypes[0] === "time" ? alignTimeAxes(axes) : alignQuantAxes(axes);
};
var alignTimeAxes = function (axes) {
    var computed = fp_1.mapValues(function (axis) {
        return axis.computeInitial();
    })(axes);
    var axisKeys = fp_1.keys(computed);
    var intervalOne = axes[axisKeys[0]].interval;
    var intervalTwo = axes[axisKeys[1]].interval;
    if (intervalOne !== intervalTwo) {
        throw new Error("Time axes must have the same interval");
    }
    var ticksInDomainOne = computed[axisKeys[0]].ticksInDomain;
    var ticksInDomainTwo = computed[axisKeys[1]].ticksInDomain;
    if (ticksInDomainOne.length === ticksInDomainTwo.length) {
        return;
    }
    if (ticksInDomainOne.length < ticksInDomainTwo.length) {
        fp_1.times(function () {
            ticksInDomainOne.push(moment(fp_1.last(ticksInDomainOne))
                .add(1, intervalOne)
                .toDate());
        })(ticksInDomainTwo.length - ticksInDomainOne.length);
    }
    else {
        fp_1.times(function () {
            ticksInDomainTwo.push(moment(fp_1.last(ticksInDomainTwo))
                .add(1, intervalTwo)
                .toDate());
        })(ticksInDomainOne.length - ticksInDomainTwo.length);
    }
    computed[axisKeys[0]].ticksInDomain = ticksInDomainOne;
    computed[axisKeys[1]].ticksInDomain = ticksInDomainTwo;
    fp_1.forEach.convert({ cap: false })(function (axis, key) {
        axis.computeAligned(computed[key]);
    })(axes);
};
var alignQuantAxes = function (axes) {
    var computed = fp_1.mapValues(function (axis) {
        return axis.computeInitial();
    })(axes);
    var axisKeys = fp_1.keys(computed);
    var stepsOne = computed[axisKeys[0]].steps;
    var stepsTwo = computed[axisKeys[1]].steps;
    alignSteps(stepsOne, stepsTwo);
    computed[axisKeys[0]].steps = stepsOne;
    computed[axisKeys[1]].steps = stepsTwo;
    fp_1.forEach.convert({ cap: false })(function (axis, key) {
        axis.computeAligned(computed[key]);
    })(axes);
};
var alignSteps = function (one, two) {
    var zeroOne = containsZero(one);
    var zeroTwo = containsZero(two);
    if (zeroOne && zeroTwo) {
        var max = [Math.max(zeroOne[0], zeroTwo[0]), Math.max(zeroOne[1], zeroTwo[1])];
        one[0] = one[0] - (max[0] - zeroOne[0]) * one[2];
        one[1] = one[1] + (max[1] - zeroOne[1]) * one[2];
        two[0] = two[0] - (max[0] - zeroTwo[0]) * two[2];
        two[1] = two[1] + (max[1] - zeroTwo[1]) * two[2];
    }
    else {
        var stepsL = (one[1] - one[0]) / one[2];
        var stepsR = (two[1] - two[0]) / two[2];
        var stepsDiff = stepsL - stepsR;
        if (stepsDiff > 0) {
            two[0] = two[0] - Math.floor(stepsDiff / 2) * two[2];
            two[1] = two[1] + Math.ceil(stepsDiff / 2) * two[2];
        }
        else if (stepsDiff < 0) {
            one[0] = one[0] + Math.ceil(stepsDiff / 2) * one[2];
            one[1] = one[1] - Math.floor(stepsDiff / 2) * one[2];
        }
    }
};
var containsZero = function (step) {
    return step[0] <= 0 && step[1] >= 0 ? [Math.abs(step[0] / step[2]), step[1] / step[2]] : undefined;
};
exports.positionBackgroundRect = function (el, duration) {
    // Position background rect only once axis has finished transitioning.
    setTimeout(function () {
        // Remove current background rect attributes so they do not affect the group dimension calculation.
        el.selectAll("rect." + styles.componentRect).call(d3_utils_1.setRectAttributes, {});
        // Position background rect
        var group = el.node().getBoundingClientRect();
        var rect = el.selectAll("rect").node().getBoundingClientRect();
        el.selectAll("rect").call(d3_utils_1.setRectAttributes, {
            x: group.left - rect.left,
            y: group.top - rect.top,
            width: group.width,
            height: group.height
        });
    }, duration);
};
//# sourceMappingURL=axis_utils.js.map