"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("../utils/event_catalog");
var fp_1 = require("lodash/fp");
var d3 = require("d3-selection");
var d3_interpolate_1 = require("d3-interpolate");
require("d3-transition");
var d3_shape_1 = require("d3-shape");
var d3_interpolate_2 = require("d3-interpolate");
var d3_scale_1 = require("d3-scale");
var d3_hierarchy_1 = require("d3-hierarchy");
var styles = require("./styles");
var d3_utils_1 = require("../utils/d3_utils");
// // Accessors of series in prepared data
// function dataKey(d: TDatum): string {
//   return d.data.key
// }
var Renderer = /** @class */ (function () {
    function Renderer(state, stateWriter, events, el) {
        this.computed = {};
        this.drawn = false;
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
        this.assignAccessors();
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.CLICK, this.onClick.bind(this));
        // this.events.on(Events.FOCUS.ELEMENT.HIGHLIGHT, this.highlightElement.bind(this))
        // this.events.on(Events.FOCUS.ELEMENT.MOUSEOVER, this.updateElementHover.bind(this))
        // this.events.on(Events.FOCUS.ELEMENT.MOUSEOUT, this.updateElementHover.bind(this))
        // this.events.on(Events.CHART.MOUSEOUT, this.updateElementHover.bind(this))
    }
    Renderer.prototype.assignAccessors = function () {
        var _this = this;
        var accessors = this.state.current.get("accessors").series;
        fp_1.forEach.convert({ cap: false })(function (accessor, key) {
            ;
            _this[key] = accessor;
        })(accessors);
    };
    Renderer.prototype.hasData = function () {
        return this.data.length > 0;
    };
    Renderer.prototype.draw = function () {
        this.compute();
        this.drawn ? this.updateDraw() : this.initialDraw();
    };
    Renderer.prototype.initialDraw = function () {
        // groups
        this.el.append("svg:g").attr("class", "arcs");
        if (this.hasData()) {
            this.updateDraw();
        }
        this.drawn = true;
    };
    Renderer.prototype.updateDraw = function () {
        var _this = this;
        // Remove focus before updating chart
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT);
        // Arcs
        var arcs = this.el
            .select("g.arcs")
            .attr("transform", this.translateString(this.computeTranslate()))
            .selectAll("path." + styles.arc)
            .data(this.data, function (d) { return _this.name(d.data); });
        var duration = this.state.current.get("config").duration;
        this.exit(arcs, duration);
        this.enterAndUpdate(arcs, duration);
    };
    Renderer.prototype.exit = function (arcs, duration) {
        arcs
            .exit()
            .select("path." + styles.arc)
            .transition()
            .duration(duration)
            .attrTween("d", this.removeArcTween.bind(this))
            .remove();
    };
    Renderer.prototype.enterAndUpdate = function (arcs, duration) {
        var _this = this;
        arcs
            .enter()
            .append("svg:path")
            .attr("class", function (d) { return styles.arc + " " + (!d.parent ? "parent" : "") + " " + (d.zoomable ? "zoomable" : ""); })
            .style("fill", function (d) { return _this.color(d.data); })
            .style("stroke", "#fff")
            .on("mouseenter", d3_utils_1.withD3Element(this.onMouseOver.bind(this)))
            .on("click", function (d) { return _this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.CLICK, { d: d, force: true }); })
            .merge(arcs)
            .transition()
            .duration(duration)
            .attrTween("d", this.arcTween.bind(this));
    };
    Renderer.prototype.onClick = function (payload) {
        var _this = this;
        var zoomNode = payload.d || this.topNode;
        // Don't allow zooming on last child
        if (!zoomNode.children) {
            return;
        }
        // If the center node is clicked, zoom out
        if (zoomNode === this.zoomNode && payload && payload.force) {
            this.zoomOut(payload);
            return;
        }
        // Set new scale domains
        var angleDomain = d3_interpolate_1.interpolate(this.angleScale.domain(), [zoomNode.x0, zoomNode.x1]), radiusDomain = d3_interpolate_1.interpolate(this.radiusScale.domain(), [zoomNode.y0, 1]);
        // Save new inner radius to facilitate sizing and positioning of center content
        var innerRadius = this.radiusScale.domain([zoomNode.y0, 1])(zoomNode.y1);
        this.stateWriter("innerRadius", innerRadius);
        // If no payload has been sent (resetting zoom) and the chart hasn't already been zoomed
        // (occurs when no zoom config is passed in from the outside)
        // no need to do anything.
        if (!this.zoomNode && !payload.d) {
            return;
        }
        this.zoomNode = zoomNode;
        this.stateWriter("zoomNode", this.zoomNode);
        this.el
            .selectAll("path")
            .attr("pointer-events", "none")
            .style("fill", function (datum) { return (datum === _this.zoomNode ? "#fff" : _this.color(datum.data)); })
            .style("stroke", function (datum) { return (datum === _this.zoomNode ? _this.color(datum.data) : "#fff"); })
            .classed("zoomed", function (datum) { return datum === _this.zoomNode; })
            .transition()
            .duration(this.state.current.get("config").duration)
            .each(d3_utils_1.withD3Element(function (datum, el) {
            d3.select(el).attr("pointer-events", null);
        }))
            .tween("scale", function () {
            return function (t) {
                _this.angleScale.domain(angleDomain(t));
                _this.radiusScale.domain(radiusDomain(t));
            };
        })
            .attrTween("d", function (datum) {
            return function () { return _this.arc(datum); };
        });
    };
    Renderer.prototype.zoomOut = function (payload) {
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.CLICK, { d: payload.d.parent });
    };
    Renderer.prototype.onMouseOver = function (d, el) {
        if (d === this.zoomNode) {
            return;
        }
        var centroid = this.translateBack(this.arc.centroid(d));
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOVER, { d: d, focusPoint: { centroid: centroid } });
        this.mouseOverDatum = d;
        this.highlightPath(d, el);
    };
    Renderer.prototype.highlightPath = function (d, el) {
        var _this = this;
        var percentage = Number((100 * d.value / this.total).toPrecision(3));
        var percentageString = percentage + "%";
        if (percentage < 0.1) {
            percentageString = "< 0.1%";
        }
        this.el.select("span.percentage").text(percentageString);
        this.el.select("div.explanation").style("visibility", "");
        var sequenceArray = d.ancestors().reverse();
        sequenceArray.shift(); // remove root node from the array
        // Fade all the segments (leave inner circle as is).
        this.el
            .selectAll("path." + styles.arc)
            .filter(function (d) { return d !== _this.zoomNode; })
            .style("opacity", 0.3);
        // Then highlight only those that are an ancestor of the current segment.
        this.el
            .selectAll("path." + styles.arc)
            .filter(function (d) { return sequenceArray.indexOf(d) >= 0 && d !== _this.zoomNode; })
            .style("opacity", 1);
        d3.select(el).on("mouseleave", this.onMouseLeave.bind(this)(d, el));
    };
    Renderer.prototype.onMouseLeave = function (d, el) {
        var _this = this;
        return function () {
            if (_this.mouseOverDatum !== d) {
                return;
            }
            _this.mouseOverDatum = null;
            // Remove focus label
            _this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT);
            _this.el
                .selectAll("path." + styles.arc)
                .filter(function (d) { return d !== _this.zoomNode; })
                .style("opacity", 1);
            _this.el.select("div.explanation").style("visibility", "hidden");
        };
    };
    // highlightElement(key: string): void {
    //   const d: TDatum = find((datum: TDatum): boolean => dataKey(datum) === key)(this.computed.data)
    //   this.onMouseOver(d)
    // }
    // // Compute
    Renderer.prototype.compute = function () {
        var _this = this;
        var drawingDims = this.state.current.get("computed").canvas.drawingDims;
        this.radius = Math.min(drawingDims.width, drawingDims.height) / 2 - this.state.current.get("config").outerBorderMargin;
        this.angleScale = d3_scale_1.scaleLinear().range([0, 2 * Math.PI]);
        this.radiusScale = d3_scale_1.scaleLinear().range([0, this.radius]);
        this.arc = d3_shape_1.arc()
            .startAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, _this.angleScale(d.x0))); })
            .endAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, _this.angleScale(d.x1))); })
            .innerRadius(function (d) { return Math.max(0, _this.radiusScale(d.y0)); })
            .outerRadius(function (d) { return Math.max(0, _this.radiusScale(d.y1)); });
        this.prepareData();
        this.previous = this.computed;
        this.computed = this.data;
    };
    Renderer.prototype.prepareData = function () {
        var hierarchyData = d3_hierarchy_1.hierarchy(this.state.current.get("data").data)
            .sum(this.value)
            .each(this.assignColors.bind(this))
            .sort(function (a, b) { return b.value - a.value; });
        this.total = hierarchyData.value;
        this.topNode = d3_hierarchy_1.partition()(hierarchyData)
            .descendants()
            .find(function (d) { return d.depth === 0; });
        this.stateWriter("topNode", this.topNode);
        this.data = d3_hierarchy_1.partition()(hierarchyData)
            .descendants()
            .filter(function (d) { return d.parent; })
            .reverse();
        fp_1.forEach(function (d) {
            d.zoomable = !!d.children;
        })(this.data);
        this.stateWriter("data", this.data);
    };
    Renderer.prototype.assignColors = function (node) {
        if (node.parent && !this.color(node.data)) {
            node.data.color = this.color(node.parent.data);
        }
    };
    Renderer.prototype.hoverOuter = function (radius) {
        return radius + 1;
    };
    Renderer.prototype.computeTranslate = function () {
        var drawingDims = this.state.current.get("computed").canvas.drawingDims;
        this.currentTranslation = [drawingDims.width / 2, drawingDims.height / 2];
        return this.currentTranslation;
    };
    // Translate back to 0,0 in top left
    Renderer.prototype.translateBack = function (point) {
        var currentTranslation = this.currentTranslation;
        return [point[0] + currentTranslation[0], point[1] + currentTranslation[1]];
    };
    Renderer.prototype.arcTween = function (d) {
        var _this = this;
        var previousData = this.previous.data || [], old = fp_1.find(function (datum) { return datum.index === d.index; })(previousData), previous = fp_1.find(function (datum) { return datum.index === d.index - 1; })(previousData), last = previousData[previousData.length - 1];
        var s0;
        var e0;
        if (old) {
            s0 = old.x0;
            e0 = old.x1;
        }
        else if (!old && previous) {
            s0 = previous.x1;
            e0 = previous.x1;
        }
        else if (!previous && previousData.length > 0) {
            s0 = last.x1;
            e0 = last.x1;
        }
        else {
            s0 = 0;
            e0 = 0;
        }
        var f = d3_interpolate_2.interpolateObject({ x0: s0, x1: e0, y0: 0, y1: 0 }, { x0: d.x0, x1: d.x1, y0: d.y0, y1: d.y1 });
        return function (t) { return _this.arc(f(t)); };
    };
    Renderer.prototype.removeArcTween = function (d, i) {
        var _this = this;
        var s0;
        var e0;
        s0 = e0 = 2 * Math.PI;
        var f = d3_interpolate_2.interpolateObject({ x0: d.x0, x1: d.x1, y0: d.y0, y1: d.y1 }, { x0: s0, x1: e0, y0: 0, y1: 0 });
        return function (t) { return _this.arc(f(t)); };
    };
    Renderer.prototype.labelTranslate = function (d) {
        return this.translateString(this.computed.arc.centroid(d));
    };
    Renderer.prototype.translateString = function (values) {
        return "translate(" + values.join(", ") + ")";
    };
    return Renderer;
}());
exports.default = Renderer;
//# sourceMappingURL=renderer.js.map