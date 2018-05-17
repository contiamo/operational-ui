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
    label: function (series, d) { return d.label || ""; },
};
var Flag = /** @class */ (function () {
    function Flag(state, events, el, data, options, series) {
        this.type = "flag";
        // Config
        this.axis = "x1";
        this.axisOffset = 10;
        this.axisPadding = 15;
        this.flagHeight = 10;
        this.flagWidth = 8;
        this.state = state;
        this.events = events;
        this.series = series;
        this.el = this.appendSeriesGroup(el);
        this.update(data, options);
    }
    // Public methods
    Flag.prototype.update = function (data, options) {
        var _this = this;
        this.options = options;
        this.assignAccessors(options.accessors);
        this.assignConfig(options.config);
        this.position = this.axis[0];
        this.data = fp_1.filter(function (d) { return _this.validate(_this.position === "x" ? _this.x(d) : _this.y(d)); })(data);
    };
    Flag.prototype.draw = function () {
        var _this = this;
        this.setAxisScales();
        var data = this.data;
        var attributes = fp_1.assign({ color: this.color })(this.getAttributes());
        var duration = this.state.current.get("config").duration;
        var groups = this.el.selectAll("g").data(data);
        groups.exit().remove();
        var enteringGroups = groups.enter().append("svg:g");
        // Lines
        enteringGroups.append("line").call(d3_utils_1.setLineAttributes, attributes);
        groups
            .merge(enteringGroups)
            .select("line")
            .call(d3_utils_1.setLineAttributes, attributes, duration);
        // Flags
        var flagAttributes = {
            stroke: this.color,
            fill: this.color,
            path: this.flagPath(attributes),
        };
        enteringGroups
            .append("svg:path")
            .attr("class", "flag")
            .call(d3_utils_1.setPathAttributes, flagAttributes);
        groups
            .merge(enteringGroups)
            .select("path.flag")
            .transition()
            .duration(duration)
            .call(d3_utils_1.setPathAttributes, flagAttributes);
        // Labels
        enteringGroups
            .append("svg:text")
            .style("fill", function (d) { return _this.color(d); })
            .text(function (d) { return _this.label(d); })
            .each(d3_utils_1.withD3Element(this.positionLabel(attributes).bind(this)));
        groups
            .merge(enteringGroups)
            .select("text")
            .style("fill", function (d) { return _this.color(d); })
            .text(function (d) { return _this.label(d); })
            .each(d3_utils_1.withD3Element(this.positionLabel(attributes).bind(this)));
        // Hoverable flags
        var hoverFlagAttributes = {
            fill: this.color,
            stroke: this.color,
            path: this.hoverFlagPath(attributes).bind(this),
        };
        enteringGroups
            .append("svg:path")
            .attr("class", "hover-flag")
            .on("mouseenter", d3_utils_1.withD3Element(this.onFlagHover(attributes).bind(this)))
            .on("mouseleave", d3_utils_1.withD3Element(this.onFlagLeave.bind(this)))
            .call(d3_utils_1.setPathAttributes, hoverFlagAttributes);
        groups
            .merge(enteringGroups)
            .select("path.hover-flag")
            .transition()
            .duration(duration)
            .call(d3_utils_1.setPathAttributes, hoverFlagAttributes);
    };
    Flag.prototype.close = function () {
        this.el.remove();
    };
    Flag.prototype.dataForAxis = function (axis) {
        return this.position === axis ? fp_1.compact(fp_1.map(this[axis])(this.data)) : [];
    };
    // Private methods
    Flag.prototype.validate = function (d) {
        return !!d || d === 0;
    };
    Flag.prototype.appendSeriesGroup = function (el) {
        return el.append("g").attr("class", "series:" + this.series.key() + " " + styles.flag);
    };
    Flag.prototype.setAxisScales = function () {
        this.scale = this.state.current.get("computed").axes.computed[this.axis].scale;
    };
    Flag.prototype.assignAccessors = function (customAccessors) {
        var _this = this;
        var accessors = fp_1.defaults(defaultAccessors)(customAccessors);
        this.x = this.series.x;
        this.y = this.series.y;
        this.color = function (d) { return accessors.color(_this.series, d); };
        this.description = function (d) { return accessors.description(_this.series, d); };
        this.direction = function (d) { return accessors.direction(_this.series, d); };
        this.label = function (d) { return accessors.label(_this.series, d); };
    };
    Flag.prototype.assignConfig = function (customConfig) {
        var _this = this;
        fp_1.forEach.convert({ cap: false })(function (value, key) {
            ;
            _this[key] = value;
        })(customConfig);
    };
    Flag.prototype.getAttributes = function () {
        var isXAxis = this.position === "x";
        var value = isXAxis ? this.x : this.y;
        var scale = this.scale;
        var drawingDims = this.state.current.get("computed").canvas.drawingDims;
        switch (this.axis) {
            case "x1":
                return {
                    x: function (d) { return scale(value(d)); },
                    y1: drawingDims.height,
                    y2: this.axisOffset,
                };
            case "x2":
                return {
                    x: function (d) { return scale(value(d)); },
                    y1: 0,
                    y2: drawingDims.height - this.axisOffset,
                };
            case "y1":
                return {
                    y: function (d) { return scale(value(d)); },
                    x1: 0,
                    x2: drawingDims.width - this.axisOffset,
                };
            case "y2":
                return {
                    y: function (d) { return scale(value(d)); },
                    x1: drawingDims.width,
                    x2: this.axisOffset,
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
            var coordinates = {
                x: isXAxis ? x : x + sign * _this.flagHeight,
                y: isXAxis ? y + sign * _this.flagHeight : y,
            };
            label
                .transition()
                .duration(_this.state.current.get("config").duration)
                .attr("x", coordinates.x)
                .attr("y", coordinates.y);
            var rotation = "rotate(" + (isXAxis ? -90 : 0) + ", " + coordinates.x + ", " + coordinates.y + ")";
            // Unless an event flag is at the top of the chart, move label to below the line.
            var dx = _this.axis[1] === "1" ? -dimensions.width : 0;
            var dy;
            switch (_this.position) {
                case "x":
                    dy = _this.direction(d) === "down" ? -dimensions.height / 2 : dimensions.height / 2;
                    break;
                case "y":
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
        var line;
        var sign;
        var tip;
        switch (this.position) {
            case "x":
                line = function (d) { return attributes.x(d) + (_this.direction(d) === "up" ? -1 : 1); };
                sign = attributes.y2 < attributes.y1 ? 1 : -1;
                tip = function (d) { return (_this.direction(d) === "down" ? line(d) - _this.flagWidth : line(d) + _this.flagWidth); };
                var y0_1 = attributes.y2;
                var y1_1 = y0_1 + sign * this.flagHeight / 2;
                var y2_1 = y0_1 + sign * this.flagHeight;
                return function (d) { return "M" + line(d) + ", " + y0_1 + " L" + tip(d) + ", " + y1_1 + " L" + line(d) + ", " + y2_1; };
            case "y":
                line = function (d) { return attributes.y(d); };
                sign = attributes.x2 < attributes.x1 ? 1 : -1;
                // If an event flag coincides with the x-axis, move the flag to the other side.
                tip = function (d) {
                    return line(d) === 0 || _this.direction(d) === "down" ? line(d) + _this.flagWidth : line(d) - _this.flagWidth;
                };
                var x0_1 = attributes.x2;
                var x1_1 = x0_1 + sign * this.flagHeight / 2;
                var x2_1 = x0_1 + sign * this.flagHeight;
                return function (d) { return "M" + x0_1 + ", " + line(d) + " L" + x1_1 + ", " + tip(d) + " L" + x2_1 + ", " + line(d) + " Z"; };
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
        var margin = function (axis) {
            return _this.state.current.get("computed").axes.margins[axis] || _this.state.current.get("config")[axis].margin;
        };
        return function (d) {
            var line = Math.round(attributes[_this.position](d));
            switch (_this.position) {
                case "y":
                    var dx = _this.axis === "y1"
                        ? -margin("y1") + (_this.axisPadding - width) / 2 + 1
                        : margin("y2") - width - (_this.axisPadding - width) / 2;
                    bottom = Math.max(line + height / 2, height);
                    left = attributes.x1 + dx;
                    break;
                default:
                    var dy = _this.axis === "x1"
                        ? margin("x1") - (_this.axisPadding - height) / 2
                        : height - margin("x2") + (_this.axisPadding - height) / 2;
                    bottom = attributes.y1 + dy;
                    left = line - width / 2;
            }
            var top = bottom - height;
            var middle = (top + bottom) / 2;
            var right = left + width;
            return "M" + left + "," + bottom + " L" + left + "," + top + " L" + right + "," + top + " L" + right + "," + middle + " L" + left + "," + middle;
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
                y: attributes.y ? attributes.y(d) : attributes.y2,
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