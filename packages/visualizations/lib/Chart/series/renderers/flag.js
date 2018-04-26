"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var styles = require("./styles");
var fp_1 = require("lodash/fp");
var d3_utils_1 = require("../../../utils/d3_utils");
var d3 = require("d3-selection");
var event_catalog_1 = require("../../../utils/event_catalog");
var defaultAccessors = {
    color: function (series, d) { return d.color || series.legendColor(); },
    description: function (series, d) { return d.description || ""; },
    direction: function (series, d) { return d.direction || "up"; },
    label: function (series, d) { return d.label || ""; }
};
var Flag = /** @class */ (function () {
    function Flag(state, events, el, data, options, series) {
        this.type = "flag";
        this.state = state;
        this.events = events;
        this.series = series;
        this.axis = this.series.axis();
        this.position = this.axis[0];
        this.el = this.appendSeriesGroup(el);
        this.update(data, options);
    }
    // Public methods
    Flag.prototype.update = function (data, options) {
        this.options = options;
        this.assignAccessors(options.accessors);
        this.data = data;
    };
    Flag.prototype.draw = function () {
        var _this = this;
        this.setAxisScales();
        var data = this.data;
        var attributes = this.getAttributes();
        var flagPath = this.flagPath(attributes);
        var hoverFlagPath = this.hoverFlagPath(attributes).bind(this);
        // @TODO add mapping function?
        var groups = this.el.selectAll("g").data(data);
        groups.exit().remove();
        var enterGroups = groups.enter().append("svg:g");
        // Lines
        enterGroups.append("svg:line");
        groups
            .merge(enterGroups)
            .selectAll("line")
            .attr("x1", attributes.x || attributes.x1)
            .attr("x2", attributes.x || attributes.x2)
            .attr("y1", attributes.y || attributes.y1)
            .attr("y2", attributes.y || attributes.y2)
            .attr("stroke", function (d) { return _this.color(d); });
        // Flags
        enterGroups.append("svg:path").attr("class", "flag");
        groups
            .merge(enterGroups)
            .selectAll("path.flag")
            .attr("fill", function (d) { return _this.color(d); })
            .attr("stroke", function (d) { return _this.color(d); })
            .attr("d", flagPath);
        // Labels
        enterGroups.append("svg:text");
        groups
            .merge(enterGroups)
            .selectAll("text")
            .style("fill", function (d) { return _this.color(d); })
            .text(function (d) { return _this.label(d); })
            .each(d3_utils_1.withD3Element(this.positionLabel(attributes).bind(this)));
        // Hoverable flags
        enterGroups
            .append("svg:path")
            .attr("class", "hover-flag")
            .on("mouseenter", d3_utils_1.withD3Element(this.onFlagHover(attributes).bind(this)))
            .on("mouseleave", d3_utils_1.withD3Element(this.onFlagLeave.bind(this)));
        groups
            .merge(enterGroups)
            .selectAll("path.hover-flag")
            .style("fill", function (d) { return _this.color(d); })
            .style("stroke", function (d) { return _this.color(d); })
            .attr("d", hoverFlagPath);
    };
    Flag.prototype.close = function () {
        this.el.remove();
    };
    Flag.prototype.dataForAxis = function (axis) {
        return this.position === axis ? fp_1.compact(fp_1.map(this[axis])(this.data)) : [];
    };
    // Private methods
    Flag.prototype.appendSeriesGroup = function (el) {
        return el.append("g").attr("class", "series:" + this.series.key() + " " + styles.flag);
    };
    Flag.prototype.setAxisScales = function () {
        this.scale = this.state.current.get("computed").axes.computed[this.axis].scale;
    };
    Flag.prototype.assignAccessors = function (customAccessors) {
        var _this = this;
        var axisAcessors = this.state.current.get("accessors").renderer;
        var accessors = fp_1.defaults(fp_1.merge(defaultAccessors)(axisAcessors))(customAccessors);
        this.x = function (d) { return accessors.x(_this.series, d); };
        this.y = function (d) { return accessors.y(_this.series, d); };
        this.color = function (d) { return accessors.color(_this.series, d); };
        this.description = function (d) { return accessors.description(_this.series, d); };
        this.direction = function (d) { return accessors.direction(_this.series, d); };
        this.label = function (d) { return accessors.label(_this.series, d); };
    };
    Flag.prototype.getAttributes = function () {
        var isXAxis = this.position === "x";
        var value = isXAxis ? this.x : this.y;
        var scale = this.scale;
        var drawingDims = this.state.current.get("computed").canvas.drawingDims;
        var offset = this.state.current.get("config").eventFlagAxisOffset;
        switch (this.axis) {
            case "x1":
                return {
                    x: function (d) { return scale(value(d)); },
                    y1: drawingDims.height,
                    y2: offset
                };
            case "x2":
                return {
                    x: function (d) { return scale(value(d)); },
                    y1: 0,
                    y2: drawingDims.height - offset
                };
            case "y1":
                return {
                    y: function (d) { return scale(value(d)); },
                    x1: 0,
                    x2: drawingDims.width - offset
                };
            case "y2":
                return {
                    y: function (d) { return scale(value(d)); },
                    x1: drawingDims.width,
                    x2: offset
                };
            default:
                return {};
        }
    };
    Flag.prototype.positionLabel = function (attributes) {
        var _this = this;
        return function (d, el) {
            var label = d3.select(el).attr("transform", "rotate(0)"); // Undo any previous rotation before calculating label dimensions.
            var dimensions = el.getBoundingClientRect();
            var x = attributes.x ? attributes.x(d) : attributes.x2;
            var y = attributes.y ? attributes.y(d) : attributes.y2;
            var isXAxis = _this.position === "x";
            var sign = isXAxis ? (attributes.y2 < attributes.y1 ? 1 : -1) : attributes.x2 < attributes.x1 ? 1 : -1;
            var flagHeight = _this.state.current.get("config").flagHeight;
            var coordinates = {
                x: isXAxis ? x : x + sign * flagHeight,
                y: isXAxis ? y + sign * flagHeight : y
            };
            label
                .attr("x", coordinates.x)
                .attr("y", coordinates.y)
                .attr("dy", "0.35em"); // @TODO move to styles
            var rotation = "rotate(" + (isXAxis ? -90 : 0) + ", " + coordinates.x + ", " + coordinates.y + ")";
            // Unless an event flag is at the top of the chart, move label to below the line.
            var dx = _this.axis[1] === "1" ? -dimensions.width : 0;
            var dy;
            switch (_this.axis) {
                case "x1":
                    dy = _this.direction(d) === "down" ? -dimensions.height / 2 : dimensions.height / 2;
                    break;
                case "x2":
                    dy = _this.direction(d) === "down" ? -dimensions.height / 2 : dimensions.height / 2;
                    break;
                case "y1":
                    dy = _this.direction(d) === "down" || coordinates.y === 0 ? dimensions.height / 2 : -dimensions.height / 2;
                    break;
                case "y2":
                    dy = _this.direction(d) === "down" || coordinates.y === 0 ? dimensions.height / 2 : -dimensions.height / 2;
                    break;
                default:
                    throw new Error("Invalid axis name " + _this.axis + ".");
            }
            var translation = "translate(" + dx + ", " + dy + ")";
            label.attr("transform", rotation + " " + translation);
        };
    };
    Flag.prototype.flagPath = function (attributes) {
        var _this = this;
        var flagWidth = this.state.current.get("config").flagWidth;
        var flagHeight = this.state.current.get("config").flagHeight;
        var line;
        var sign;
        var tip;
        switch (this.position) {
            case "x":
                line = function (d) { return attributes.x(d) + (_this.direction(d) === "up" ? -1 : 1); };
                sign = attributes.y2 < attributes.y1 ? 1 : -1;
                tip = function (d) { return (_this.direction(d) === "down" ? line(d) - flagWidth : line(d) + flagWidth); };
                var y0_1 = attributes.y2;
                var y1_1 = y0_1 + sign * flagHeight / 2;
                var y2_1 = y0_1 + sign * flagHeight;
                return function (d) { return "M" + line(d) + "," + y0_1 + "L" + tip(d) + "," + y1_1 + "L" + line(d) + "," + y2_1; };
            case "y":
                line = function (d) { return attributes.y(d); };
                sign = attributes.x2 < attributes.x1 ? 1 : -1;
                // If an event flag coincides with the x-axis, move the flag to the other side.
                tip = function (d) { return (line(d) === 0 || _this.direction(d) === "down" ? line(d) + flagWidth : line(d) - flagWidth); };
                var x0_1 = attributes.x2;
                var x1_1 = x0_1 + sign * flagHeight / 2;
                var x2_1 = x0_1 + sign * flagHeight;
                return function (d) { return "M" + x0_1 + "," + line(d) + "L" + x1_1 + "," + tip(d) + "L" + x2_1 + "," + line(d) + "Z"; };
            default:
                throw new Error("Invalid axis name '" + this.axis + "'.");
        }
    };
    Flag.prototype.hoverFlagPath = function (attributes) {
        var _this = this;
        var height = 12;
        var width = 8;
        var bottom;
        var left;
        var axisPadding = this.state.current.get("config").axisPaddingForFlags;
        var margin = function (axis) {
            return _this.state.current.get("computed").axes.margins[axis] || _this.state.current.get("config")[axis].margin;
        };
        return function (d) {
            var line = Math.round(attributes[_this.position](d));
            switch (_this.position) {
                case "y":
                    var dx = _this.axis === "y1"
                        ? -margin("y1") + (axisPadding - width) / 2 + 1
                        : margin("y2") - width - (axisPadding - width) / 2;
                    bottom = Math.max(line + height / 2, height);
                    left = attributes.x1 + dx;
                    break;
                default:
                    var dy = _this.axis === "x1"
                        ? margin("x1") - (axisPadding - height) / 2
                        : height - margin("x2") + (axisPadding - height) / 2;
                    bottom = attributes.y1 + dy;
                    left = line - width / 2;
            }
            var top = bottom - height;
            var middle = (top + bottom) / 2;
            var right = left + width;
            return "M" + left + "," + bottom + "L" + left + "," + top + "L" + right + "," + top + "L" + right + "," + middle + "L" + left + "," + middle;
        };
    };
    Flag.prototype.onFlagHover = function (attributes) {
        var _this = this;
        return function (d, el) {
            d3.select(el.parentNode).classed("hover", true);
            var focusPoint = {
                axisOrientation: _this.axis[0],
                color: _this.color(d),
                // @TODO access axis formatter, format datum
                datum: _this.axis[0] === "x" ? _this.x(d) : _this.y(d),
                description: _this.description(d),
                x: attributes.x ? attributes.x(d) : attributes.x2,
                y: attributes.y ? attributes.y(d) : attributes.y2
            };
            // @TODO check if this is still required / what it does?
            // focusPoint.name = this.axis.type !== "quant" ? focusPoint.datum + ": " + options.name : options.name + ": " + focusPoint.datum
            _this.events.emit(event_catalog_1.default.FOCUS.FLAG.HOVER, focusPoint);
        };
    };
    Flag.prototype.onFlagLeave = function (d, el) {
        d3.select(el.parentNode).classed("hover", false);
        this.events.emit(event_catalog_1.default.FOCUS.FLAG.OUT);
    };
    return Flag;
}());
exports.default = Flag;
//# sourceMappingURL=flag.js.map