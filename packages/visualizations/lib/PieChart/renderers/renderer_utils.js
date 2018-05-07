"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var styles = require("./styles");
var d3_shape_1 = require("d3-shape");
var d3_interpolate_1 = require("d3-interpolate");
var utils_1 = require("@operational/utils");
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
exports.assignOptions = function (ctx, options) {
    fp_1.forEach.convert({ cap: false })(function (option, key) {
        if (key !== "accessors") {
            ;
            ctx[key] = option;
        }
    })(options);
    exports.assignAccessors(ctx, options.accessors);
};
exports.defaultAccessors = function (ctx) {
    var assignColor = utils_1.colorAssigner(ctx.state.current.get("config").palette);
    return {
        value: function (d) { return d.value; },
        key: function (d) { return d.key; },
        color: function (d) { return (d.unfilled ? undefined : assignColor(ctx.key(d))); },
    };
};
exports.assignAccessors = function (ctx, customAccessors) {
    var accessors = fp_1.defaults(exports.defaultAccessors(ctx))(customAccessors);
    fp_1.forEach.convert({ cap: false })(function (option, key) {
        ;
        ctx[key] = function (d) { return option(d.data || d); };
    })(accessors);
};
// Establish coordinate system with 0,0 being the center of the width, height rectangle
exports.computeTranslate = function (drawingDims, yOffset) {
    if (yOffset === void 0) { yOffset = 0; }
    return [drawingDims.width / 2, (drawingDims.height + yOffset) / 2];
};
// Translate back to 0,0 in top left
exports.translateBack = function (point, currentTranslation) {
    return [point[0] + currentTranslation[0], point[1] + currentTranslation[1]];
};
exports.textAttributes = function (computed) {
    return {
        transform: function (d) { return exports.translateString(computed.arcOver.centroid(d)); },
        text: exports.percentageString,
        textAnchor: "middle",
    };
};
exports.percentageString = function (d) {
    return d.data.percentage ? d.data.percentage.toFixed(1) + "%" : null;
};
exports.translateString = function (values) {
    return "translate(" + values.join(", ") + ")";
};
exports.createArcGroups = function (el, data, key) {
    return el
        .select("g.arcs")
        .selectAll("g." + styles.arc)
        .data(data, key);
};
exports.exitArcs = function (arcs, duration, path) {
    var exitingArcs = arcs.exit();
    exitingArcs
        .transition()
        .duration(duration)
        .select("path")
        .attrTween("d", path);
    exitingArcs
        .transition()
        .duration(duration)
        .select("text." + styles.label)
        .style("opacity", "1e6");
    exitingArcs.remove();
};
exports.enterArcs = function (arcs, mouseOverHandler, mouseOutHandler) {
    var enteringArcs = arcs
        .enter()
        .append("svg:g")
        .attr("class", styles.arc)
        .on("mouseenter", mouseOverHandler)
        .on("mouseout", mouseOutHandler);
    enteringArcs.append("svg:path");
    enteringArcs.append("svg:text").attr("class", styles.label);
};
// @TODO move last 3 parameters into object
exports.updateTotal = function (el, label, duration, options) {
    var total = el
        .select("g." + styles.total)
        .selectAll("text")
        .data([label]);
    total
        .exit()
        .style("font-size", "1px")
        .remove();
    var mergedTotal = total
        .enter()
        .append("svg:text")
        .attr("text-anchor", "middle")
        .merge(total)
        .text(String);
    var node = mergedTotal.node();
    if (node) {
        var y = function (x) {
            mergedTotal.style("font-size", x + "px");
            // Text should fill half of available width (0.5 * diameter = radius)
            return options.innerRadius - node.getBBox().width;
        };
        // start with min font size
        if (y(options.minTotalFontSize) < 0) {
            // Not enough room - do not show total
            total = total.data([]);
        }
        else {
            // change font size until bounding box is completely filled
            // @TODO CHECK THIS
            mergedTotal.style("font-size", exports.approxZero(y, options.minTotalFontSize) + "px");
            mergedTotal.attr("dy", options.yOffset);
        }
    }
};
exports.computeTotal = function (data, valueAccessor) {
    return fp_1.reduce(function (memo, datum) {
        var value = valueAccessor(datum);
        return memo + (value || 0);
    }, 0)(data);
};
exports.calculatePercentages = function (data, valueAccessor, total) {
    fp_1.forEach(function (datum) {
        datum.percentage = valueAccessor(datum) / total * 100;
    })(data);
};
exports.layout = function (valueAccessor, angleRange) {
    return d3_shape_1.pie()
        .sort(null)
        .value(valueAccessor)
        .startAngle(angleRange[0])
        .endAngle(angleRange[1]);
};
exports.removeArcTween = function (computed, angleRange) {
    return function (d, i) {
        var innerRadius = computed.rInner;
        var outerRadius = computed.r;
        var f = d3_interpolate_1.interpolateObject({ endAngle: d.endAngle, startAngle: d.startAngle }, { innerRadius: innerRadius, outerRadius: outerRadius, endAngle: angleRange[1], startAngle: angleRange[1] });
        return function (t) { return computed.arc(f(t)); };
    };
};
exports.updateFilteredPathAttributes = function (selection, filterFunc, path, arcInfo) {
    if (arcInfo === void 0) { arcInfo = {}; }
    selection
        .filter(filterFunc)
        .select("path")
        .attr("d", path);
};
//# sourceMappingURL=renderer_utils.js.map