"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var styles = require("./styles");
var d3_selection_1 = require("d3-selection");
var d3_shape_1 = require("d3-shape");
var d3_interpolate_1 = require("d3-interpolate");
var utils_1 = require("@operational/utils");
var d3_utils_1 = require("../../utils/d3_utils");
var font_sizing_utils_1 = require("../../utils/font_sizing_utils");
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
    enteringArcs.append("svg:rect").attr("class", styles.labelBackground);
    enteringArcs.append("svg:text").attr("class", styles.label);
};
exports.updateBackgroundRects = function (updatingArcs, centroid) {
    updatingArcs.each(d3_utils_1.withD3Element(function (d, el) {
        var element = d3_selection_1.select(el);
        var textDimensions = element.select("text").node().getBBox();
        var transform = [centroid(d)[0] + textDimensions.x, centroid(d)[1] + textDimensions.y];
        element
            .select("rect")
            .attr("width", textDimensions.width)
            .attr("height", textDimensions.height)
            .attr("transform", exports.translateString(transform));
    }));
};
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
        var y = font_sizing_utils_1.stepFunction(mergedTotal, options.innerRadius);
        // start with min font size
        if (y(options.minTotalFontSize) < 0) {
            // Not enough room - do not show total
            total = total.data([]);
        }
        else {
            // change font size until bounding box is completely filled or max font size is reached
            mergedTotal.style("font-size", Math.min(options.maxTotalFontSize, font_sizing_utils_1.approxZero(y, options.minTotalFontSize)) + "px");
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