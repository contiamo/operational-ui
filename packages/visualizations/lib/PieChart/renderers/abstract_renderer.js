"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("../../utils/event_catalog");
var fp_1 = require("lodash/fp");
require("d3-transition");
var d3_shape_1 = require("d3-shape");
var d3_interpolate_1 = require("d3-interpolate");
var d3_utils_1 = require("../../utils/d3_utils");
var styles = require("./styles");
// y is a step-function (with two x values resulting in the same y value)
// on the positive integer domain which is monotonic decreasing
var approxZero = function (y, initialX) {
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
// Accessors of series in prepared data
var dataKey = function (d) {
    return d.data.key;
};
var dataLabelValue = function (d) {
    return d.data.percentage ? d.data.percentage.toFixed(1) + "%" : undefined;
};
var AbstractRenderer = /** @class */ (function () {
    function AbstractRenderer(state, events, el, options) {
        this.computed = {};
        this.drawn = false;
        this.state = state;
        this.events = events;
        this.el = el.select("g.drawing");
        this.assignOptions(options);
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.HIGHLIGHT, this.highlightElement.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOVER, this.updateElementHover.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT, this.updateElementHover.bind(this));
        this.events.on(event_catalog_1.default.CHART.MOUSEOUT, this.updateElementHover.bind(this));
    }
    AbstractRenderer.prototype.assignOptions = function (options) {
        var _this = this;
        fp_1.forEach.convert({ cap: false })(function (option, key) {
            ;
            _this[key] = fp_1.isFunction(option) ? function (d) { return option(d); } : option;
        })(options);
    };
    AbstractRenderer.prototype.setData = function (data) {
        this.data = data;
    };
    AbstractRenderer.prototype.computeTotal = function () {
        var _this = this;
        this.total = fp_1.reduce(function (memo, datum) {
            var value = _this.value(datum);
            return memo + (value || 0);
        }, 0)(this.data);
    };
    AbstractRenderer.prototype.hasData = function () {
        return this.data.length > 0;
    };
    AbstractRenderer.prototype.draw = function () {
        this.compute();
        this.drawn ? this.updateDraw() : this.initialDraw();
    };
    AbstractRenderer.prototype.initialDraw = function () {
        // groups
        this.el.append("svg:g").attr("class", "arcs");
        this.el.append("svg:g").attr("class", styles.total);
        if (this.hasData()) {
            this.updateDraw();
        }
        this.drawn = true;
    };
    AbstractRenderer.prototype.updateDraw = function () {
        // Remove focus before updating chart
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT);
        // Center coordinate system
        this.el.attr("transform", this.translateString(this.computeTranslate()));
        // Arcs
        var arcs = this.el
            .select("g.arcs")
            .selectAll("g." + styles.arc)
            .data(this.computed.data, dataKey);
        this.exit(arcs);
        this.enterAndUpdate(arcs);
    };
    AbstractRenderer.prototype.exit = function (arcs) {
        var duration = this.state.current.get("config").duration;
        var exitingArcs = arcs.exit();
        exitingArcs
            .select("path")
            .transition()
            .duration(duration)
            .attrTween("d", this.removeArcTween.bind(this));
        exitingArcs
            .select("text." + styles.label)
            .transition()
            .duration(duration)
            .style("opacity", "1e6");
        exitingArcs.remove();
    };
    AbstractRenderer.prototype.enterAndUpdate = function (arcs) {
        var _this = this;
        var duration = this.state.current.get("config").duration;
        var n = 0;
        var enteringArcs = arcs
            .enter()
            .append("svg:g")
            .attr("class", styles.arc)
            .on("mouseenter", this.onMouseOver.bind(this));
        enteringArcs.append("svg:path").style("fill", function (d) { return _this.color(d.data); });
        enteringArcs
            .append("svg:text")
            .attr("class", styles.label)
            .attr("dy", 5)
            .style("text-anchor", "middle");
        arcs
            .merge(enteringArcs)
            .select("path")
            .transition()
            .duration(duration)
            .attrTween("d", this.arcTween.bind(this))
            .call(d3_utils_1.onTransitionEnd, this.onTransitionEnd.bind(this));
        arcs
            .merge(enteringArcs)
            .select("text." + styles.label)
            .transition()
            .duration(duration)
            .attr("transform", this.labelTranslate.bind(this))
            .text(dataLabelValue);
        this.updateTotal();
    };
    AbstractRenderer.prototype.onTransitionEnd = function () {
        return;
    };
    AbstractRenderer.prototype.updateTotal = function () {
        var _this = this;
        var duration = this.state.current.get("config").duration;
        var total = this.el
            .select("g." + styles.total)
            .selectAll("text")
            .data(this.centerDisplayString());
        total
            .exit()
            .style("font-size", "1px")
            .remove();
        var mergedTotal = total
            .enter()
            .append("svg:text")
            .attr("text-anchor", "middle")
            .merge(total)
            .text(function (d) { return d; });
        var node = mergedTotal.node();
        if (node) {
            var y = function (x) {
                mergedTotal.style("font-size", x + "px");
                // Text should fill half of available width (0.5 * diameter = radius)
                return _this.computed.inner - node.getBBox().width;
            };
            // start with min font size
            if (y(this.state.current.get("config").minTotalFontSize) < 0) {
                // Not enough room - do not show total
                total = total.data([]);
            }
            else {
                // change font size until bounding box is completely filled
                approxZero(y, this.state.current.get("config").minTotalFontSize);
                mergedTotal.attr("dy", this.totalYOffset());
            }
        }
    };
    AbstractRenderer.prototype.updateElementHover = function (datapoint) {
        if (!this.drawn) {
            return;
        }
        var arcs = this.el.select("g.arcs").selectAll("g");
        var filterFocused = function (d) {
            return datapoint.d && datapoint.d.data && dataKey(d) === dataKey(datapoint.d);
        }, filterUnFocused = function (d) {
            return datapoint.d && datapoint.d.data ? dataKey(d) !== dataKey(datapoint.d) : true;
        };
        arcs
            .filter(filterFocused)
            .select("path")
            .attr("d", this.computed.arcOver)
            .attr("filter", "url(#" + this.state.current.get("computed").canvas.shadowDefinitionId + ")");
        arcs
            .filter(filterUnFocused)
            .select("path")
            .attr("d", this.computed.arc)
            .attr("filter", null);
    };
    AbstractRenderer.prototype.onMouseOver = function (d) {
        var centroid = this.translateBack(this.computed.arc.centroid(d));
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOVER, { d: d, focusPoint: { centroid: centroid } });
    };
    AbstractRenderer.prototype.highlightElement = function (key) {
        var d = fp_1.find(function (datum) { return dataKey(datum) === key; })(this.computed.data);
        this.onMouseOver(d);
    };
    AbstractRenderer.prototype.checkData = function () {
        return;
    };
    AbstractRenderer.prototype.angleValue = function (d) {
        return this.value(d);
    };
    // Compute
    AbstractRenderer.prototype.compute = function () {
        this.previous = this.computed;
        var d = {};
        // We cannot draw a pie chart with no series or only series that have the value 0
        if (!this.hasData()) {
            this.computed.data = [];
            return;
        }
        this.checkData();
        var startAngle;
        var endAngle;
        _a = this.angleRange(), startAngle = _a[0], endAngle = _a[1];
        d.layout = d3_shape_1.pie()
            .sort(null)
            .value(this.angleValue.bind(this))
            .startAngle(startAngle)
            .endAngle(endAngle);
        d.total = this.totalForPercentages();
        this.computed = d;
        this.previous = fp_1.defaults(this.computed)(this.previous);
        // data should not become part of this.previous in first computation
        this.computed.data = d.layout(this.data);
        this.calculatePercentages(d.total);
        this.computeArcs();
        var _a;
    };
    AbstractRenderer.prototype.calculatePercentages = function (total) {
        var _this = this;
        fp_1.forEach(function (datum) {
            datum.percentage = _this.value(datum) / total * 100;
        })(this.data);
    };
    AbstractRenderer.prototype.computeArcs = function (scale) {
        var computed = this.computed;
        var drawingDims = this.state.current.get("computed").canvas.drawingContainerDims;
        computed.r = this.computeOuter(drawingDims.width, drawingDims.height, scale);
        computed.inner = this.computeInner(computed.r);
        computed.rHover = this.hoverOuter(computed.r);
        computed.innerHover = Math.max(computed.inner - 1, 0);
        computed.arc = d3_shape_1.arc()
            .innerRadius(computed.inner)
            .outerRadius(computed.r);
        computed.arcOver = d3_shape_1.arc()
            .innerRadius(computed.innerHover)
            .outerRadius(computed.rHover);
    };
    // Calculation of outer radius
    AbstractRenderer.prototype.computeOuter = function (width, height, scaleFactor) {
        return Math.min(width, height) / 2 - this.state.current.get("config").outerBorderMargin;
    };
    // Calculation of inner radius
    AbstractRenderer.prototype.computeInner = function (outerRadius) {
        var config = this.state.current.get("config"), width = outerRadius - config.minInnerRadius;
        // If there isn't enough space, don't render inner circle
        return width < config.minWidth ? 0 : outerRadius - Math.min(width, config.maxWidth);
    };
    AbstractRenderer.prototype.hoverOuter = function (radius) {
        return radius + 1;
    };
    // Translate back to 0,0 in top left
    AbstractRenderer.prototype.translateBack = function (point) {
        var currentTranslation = this.currentTranslation;
        return [point[0] + currentTranslation[0], point[1] + currentTranslation[1]];
    };
    AbstractRenderer.prototype.removeArcTween = function (d, i) {
        var _this = this;
        var s0;
        var e0;
        s0 = e0 = this.angleRange()[1];
        var f = d3_interpolate_1.interpolateObject({ endAngle: d.endAngle, startAngle: d.startAngle }, { endAngle: e0, startAngle: s0 });
        return function (t) { return _this.computed.arc(f(t)); };
    };
    AbstractRenderer.prototype.labelTranslate = function (d) {
        return this.translateString(this.computed.arc.centroid(d));
    };
    AbstractRenderer.prototype.translateString = function (values) {
        return "translate(" + values.join(", ") + ")";
    };
    AbstractRenderer.prototype.dataForLegend = function () {
        var _this = this;
        return fp_1.map(function (datum) {
            return {
                label: _this.key(datum),
                color: _this.color(datum)
            };
        })(this.data);
    };
    // Remove & clean up
    AbstractRenderer.prototype.remove = function () {
        if (this.drawn) {
            this.el.remove();
            this.drawn = false;
        }
    };
    return AbstractRenderer;
}());
exports.default = AbstractRenderer;
//# sourceMappingURL=abstract_renderer.js.map