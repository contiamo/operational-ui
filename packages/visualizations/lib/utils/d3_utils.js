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
    if (!func) {
        return;
    }
    if (selection.empty()) {
        func();
        return;
    }
    var n = 0;
    return selection.each(function () { return (n = n + 1); }).on("end", function () {
        n = n - 1;
        if (n < 1) {
            func();
        }
    });
};
var transitionOrSelection = function (selection, duration) {
    return duration != null ? selection.transition().duration(duration) : selection;
};
exports.setPathAttributes = function (selection, attributes, duration, onEnd) {
    var elements = duration
        ? transitionOrSelection(selection, duration).attrTween("d", attributes.path)
        : transitionOrSelection(selection).attr("d", attributes.path);
    elements
        .style("fill", attributes.fill)
        .style("stroke", attributes.stroke)
        .style("opacity", attributes.opacity)
        .call(exports.onTransitionEnd, onEnd);
};
exports.setTextAttributes = function (selection, attributes, duration, onEnd) {
    transitionOrSelection(selection, duration)
        .attr("x", attributes.x)
        .attr("y", attributes.y)
        .attr("dx", attributes.dx)
        .attr("dy", attributes.dy)
        .style("text-anchor", attributes.textAnchor)
        .attr("transform", attributes.transform)
        .text(attributes.text)
        .style("opacity", attributes.opacity || 1)
        .call(exports.onTransitionEnd, onEnd);
};
exports.setLineAttributes = function (selection, attributes, duration) {
    transitionOrSelection(selection, duration)
        .style("stroke", attributes.color)
        .attr("x1", attributes.x || attributes.x1)
        .attr("x2", attributes.x || attributes.x2)
        .attr("y1", attributes.y || attributes.y1)
        .attr("y2", attributes.y || attributes.y2);
};
exports.setRectAttributes = function (selection, attributes, duration) {
    transitionOrSelection(selection, duration)
        .attr("x", attributes.x)
        .attr("y", attributes.y)
        .attr("width", attributes.width)
        .attr("height", attributes.height)
        .style("fill", attributes.color)
        .style("stroke", attributes.stroke);
};
//# sourceMappingURL=d3_utils.js.map