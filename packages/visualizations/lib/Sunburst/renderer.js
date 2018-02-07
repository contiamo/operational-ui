"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("../utils/event_catalog");
var fp_1 = require("lodash/fp");
var styles = require("./styles");
var d3_utils_1 = require("../utils/d3_utils");
// d3 imports
var d3 = require("d3-selection");
var d3_interpolate_1 = require("d3-interpolate");
require("d3-transition");
var d3_shape_1 = require("d3-shape");
var d3_interpolate_2 = require("d3-interpolate");
var d3_scale_1 = require("d3-scale");
var d3_hierarchy_1 = require("d3-hierarchy");
var Renderer = /** @class */ (function () {
    function Renderer(state, stateWriter, events, el) {
        this.drawn = false;
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
        this.assignAccessors();
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.CLICK, this.onClick.bind(this));
    }
    Renderer.prototype.assignAccessors = function () {
        var _this = this;
        var accessors = this.state.current.get("accessors").series;
        // In prepared data, original data is saved in d.data, so accessors need to be modified accordingly
        fp_1.forEach.convert({ cap: false })(function (accessor, key) {
            ;
            _this[key] = function (d) { return (d.data ? accessor(d.data) : accessor(d)); };
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
        this.el.append("circle").attr("class", styles.centerCircle);
        if (this.hasData()) {
            this.updateDraw();
        }
        this.drawn = true;
    };
    Renderer.prototype.updateDraw = function () {
        // Remove focus before updating chart
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT);
        var drawingDims = this.state.current.get("computed").canvas.drawingDims;
        this.el
            .select("circle." + styles.centerCircle)
            .attr("cx", drawingDims.width / 2)
            .attr("cy", drawingDims.height / 2);
        // Arcs
        var arcs = this.el
            .select("g.arcs")
            .attr("transform", this.translateString(this.computeTranslate()))
            .selectAll("path." + styles.arc)
            .data(this.data, this.name);
        var duration = this.state.current.get("config").duration;
        this.exit(arcs, duration, document.hidden);
        this.enterAndUpdate(arcs, duration, document.hidden);
    };
    Renderer.prototype.exit = function (arcs, duration, hidden) {
        var exitingArcs = hidden
            ? arcs.exit()
            : arcs
                .exit()
                .transition()
                .duration(duration)
                .attrTween("d", this.removeArcTween.bind(this));
        exitingArcs.remove();
    };
    Renderer.prototype.enterAndUpdate = function (arcs, duration, hidden) {
        var _this = this;
        var updatingArcs = arcs
            .enter()
            .append("svg:path")
            .style("fill", this.color)
            .style("stroke", "#fff")
            .on("mouseenter", d3_utils_1.withD3Element(this.onMouseOver.bind(this)))
            .on("click", function (d) { return _this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.CLICK, { d: d, force: true }); })
            .merge(arcs)
            .attr("class", function (d) { return styles.arc + " " + (!d.parent ? "parent" : "") + " " + (d.zoomable ? "zoomable" : ""); });
        if (hidden) {
            updatingArcs.attr("d", this.arc.bind(this));
        }
        else {
            updatingArcs
                .transition()
                .duration(duration)
                .attrTween("d", this.arcTween.bind(this));
        }
    };
    Renderer.prototype.onClick = function (payload) {
        var _this = this;
        // Don't allow zooming on last child
        if (payload.d && !payload.d.children) {
            return;
        }
        var zoomNode = payload.d || this.topNode;
        // If the center node is clicked, zoom out
        if (zoomNode === this.zoomNode && payload && payload.force) {
            this.zoomOut(payload);
            return;
        }
        // Set new scale domains
        var config = this.state.current.get("config"), maxChildRadius = fp_1.reduce(function (memo, child) {
            return child.depth - zoomNode.depth <= _this.state.current.get("config").maxRings
                ? Math.max(memo, child.y1)
                : memo;
        }, 0)(zoomNode.descendants()), angleDomain = d3_interpolate_1.interpolate(this.angleScale.domain(), [zoomNode.x0, zoomNode.x1]), radiusDomain = d3_interpolate_1.interpolate(this.radiusScale.domain(), [zoomNode.y0, maxChildRadius]);
        // Save new inner radius to facilitate sizing and positioning of root label
        var innerRadius = this.radiusScale.domain([zoomNode.y0, maxChildRadius])(zoomNode.y1);
        this.stateWriter("innerRadius", innerRadius);
        // If the sunburst is not zoomed in and the root node is fully surrounded by children,
        // make the radius of the central white circle equal to the inner radius of the first ring,
        // to avoid an extra grey ring around the root node.
        var totalRootChildValue = fp_1.reduce(function (memo, child) {
            return (memo += child.value);
        }, 0)(this.topNode.children);
        var rootIsSurrounded = zoomNode === this.topNode && zoomNode.value === totalRootChildValue;
        d3_utils_1.transitionIfVisible(this.el.select("circle." + styles.centerCircle), config.duration).attr("r", rootIsSurrounded ? innerRadius : innerRadius * config.centerCircleRadius);
        // If no payload has been sent (resetting zoom) and the chart hasn't already been zoomed
        // (occurs when no zoom config is passed in from the outside)
        // no need to do anything.
        if (!this.zoomNode && !payload.d) {
            return;
        }
        this.zoomNode = zoomNode;
        this.stateWriter("zoomNode", this.zoomNode);
        var paths = this.el
            .selectAll("path")
            .attr("pointer-events", "none")
            .classed("zoomed", function (datum) { return datum === _this.zoomNode; })
            .each(d3_utils_1.withD3Element(function (datum, el) {
            d3.select(el).attr("pointer-events", null);
        }));
        if (document.hidden) {
            this.angleScale.domain(angleDomain(1));
            this.radiusScale.domain(radiusDomain(1));
            paths.attr("d", this.arc.bind(this));
        }
        else {
            paths
                .transition()
                .duration(config.duration)
                .tween("scale", function () {
                return function (t) {
                    _this.angleScale.domain(angleDomain(t));
                    _this.radiusScale.domain(radiusDomain(t));
                };
            })
                .attrTween("d", function (datum) {
                return function () { return _this.arc(datum); };
            });
        }
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
        var sequenceArray = d.ancestors();
        sequenceArray.pop(); // remove root node from the array
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
    // Compute
    Renderer.prototype.compute = function () {
        var _this = this;
        var drawingDims = this.state.current.get("computed").canvas.drawingDims;
        this.radius =
            Math.min(drawingDims.width, drawingDims.height) / 2 - this.state.current.get("config").outerBorderMargin;
        this.angleScale = d3_scale_1.scaleLinear()
            .clamp(true)
            .range([0, 2 * Math.PI]);
        this.radiusScale = d3_scale_1.scaleLinear()
            .clamp(true)
            .range([0, this.radius]);
        this.arc = d3_shape_1.arc()
            .startAngle(function (d) { return _this.angleScale(d.x0); })
            .endAngle(this.endAngle.bind(this))
            .innerRadius(function (d) { return _this.radiusScale(d.y0); })
            .outerRadius(function (d) { return _this.radiusScale(d.y1); });
        this.previous = this.data;
        this.prepareData();
    };
    Renderer.prototype.endAngle = function (d) {
        var _this = this;
        // Set a minimum segment angle so that the segment can always be seen,
        // UNLESS the segment is not the child of the top or zoomed node (i.e. should not be visible)
        var show = fp_1.findIndex(function (datum) { return _this.isEqual(_this.zoomNode || _this.topNode, datum); })(d.ancestors()) > -1;
        var minAngle = show ? Math.asin(1 / this.radiusScale(d.y0)) || 0 : 0;
        return Math.max(this.angleScale(d.x0) + minAngle, Math.min(2 * Math.PI, this.angleScale(d.x1)));
    };
    Renderer.prototype.checkDataValidity = function () {
        // All data points must have a value assigned
        var noValueData = fp_1.filter(function (d) { return !d.value; })(this.data);
        if (noValueData.length > 0) {
            throw new Error("The following nodes do not have values: " + fp_1.map(this.name)(noValueData));
        }
        // Parent nodes cannot be smaller than the sum of their children
        var childrenExceedParent = fp_1.filter(function (d) {
            return d.value < fp_1.reduce(function (sum, child) { return sum += child.value; }, 0)(d.children);
        })(this.data);
        if (childrenExceedParent.length > 0) {
            throw new Error("The following nodes are smaller than the sum of their child nodes: " + fp_1.map(this.name)(childrenExceedParent));
        }
    };
    Renderer.prototype.prepareData = function () {
        var data = this.state.current.get("accessors").data.data(this.state.current.get("data")) || {};
        var sortingFunction = this.state.current.get("config").sort
            ? function (a, b) { return b.value - a.value; }
            : undefined;
        var hierarchyData = d3_hierarchy_1.hierarchy(data)
            .each(this.assignColors.bind(this))
            .sort(sortingFunction);
        this.total = hierarchyData.value;
        this.topNode = d3_hierarchy_1.partition()(hierarchyData)
            .descendants()
            .find(function (d) { return d.depth === 0; });
        this.stateWriter("topNode", this.topNode);
        this.data = d3_hierarchy_1.partition()(hierarchyData)
            .descendants()
            .filter(function (d) { return !fp_1.isEmpty(d.data); });
        this.checkDataValidity();
        fp_1.forEach(function (d) {
            d.zoomable = d.parent && !!d.children;
        })(this.data);
        this.stateWriter("data", this.data);
    };
    Renderer.prototype.assignColors = function (node) {
        if (node.parent && !this.color(node)) {
            node.data.color = this.color(node.parent);
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
    Renderer.prototype.isSibling = function (d1, d2) {
        if (!d1.parent && !d2.parent) {
            return true;
        }
        if (!d1.parent || !d2.parent) {
            return false;
        }
        return fp_1.every(fp_1.identity)([d1.depth === d2.depth, this.name(d1.parent) === this.name(d2.parent)]);
    };
    Renderer.prototype.isEqual = function (d1, d2) {
        if (!d1 || !d2) {
            return false;
        }
        return fp_1.every(fp_1.identity)([this.name(d1) === this.name(d2), this.isSibling(d1, d2)]);
    };
    Renderer.prototype.findSiblings = function (data, d) {
        var _this = this;
        return fp_1.filter(function (datum) { return _this.isSibling(datum, d); })(data);
    };
    Renderer.prototype.findAncestor = function (data, d) {
        var _this = this;
        if (!d) {
            return;
        }
        var parent = fp_1.find(function (datum) { return _this.isEqual(datum, d.parent); })(data);
        return parent || this.findAncestor(data, d.parent);
    };
    Renderer.prototype.findDatum = function (data, d) {
        var _this = this;
        return fp_1.find(function (datum) { return _this.isEqual(datum, d); })(data);
    };
    Renderer.prototype.arcTween = function (d) {
        var _this = this;
        var previousData = this.previous || [], 
        // old version of same datum
        old = fp_1.find(function (datum) { return _this.isEqual(datum, d); })(previousData), 
        // nearest ancestor that already exists
        oldParent = this.findAncestor(previousData.concat([this.topNode]), d);
        var x0;
        var x1;
        var y0;
        var y1;
        if (old) {
            x0 = old.x0;
            x1 = old.x1;
            y0 = old.y0;
            y1 = old.y1;
        }
        else if (!old && oldParent) {
            //find siblings - same parent, same depth
            var siblings = this.findSiblings(this.data, d);
            var siblingIndex = fp_1.findIndex(function (datum) { return _this.isEqual(datum, d); })(siblings);
            var oldPrecedingSibling = this.findDatum(previousData, siblings[siblingIndex - 1]);
            x0 = oldPrecedingSibling ? oldPrecedingSibling.x1 : oldParent.x0;
            x1 = oldPrecedingSibling ? oldPrecedingSibling.x1 : oldParent.x0;
            y0 = d.y0;
            y1 = d.y1;
        }
        else if (!old && !oldParent) {
            x0 = 0;
            x1 = 0;
            y0 = d.y0;
            y1 = d.y1;
        }
        var f = d3_interpolate_2.interpolateObject({ x0: x0, x1: x1, y0: y0, y1: y1 }, d);
        return function (t) { return _this.arc(f(t)); };
    };
    Renderer.prototype.removeArcTween = function (d) {
        var _this = this;
        var oldSiblings = this.findSiblings(this.previous || [], d);
        var currentSiblings = this.findSiblings(this.data, d);
        var oldSiblingIndex = fp_1.findIndex(function (datum) { return _this.isEqual(datum, d); })(oldSiblings);
        var oldPrecedingSibling = fp_1.filter
            .convert({ cap: false })(function (sibling, i) {
            return i < oldSiblingIndex && !!_this.findDatum(currentSiblings, sibling);
        })(oldSiblings)
            .pop();
        var precedingSibling = this.findDatum(this.data, oldPrecedingSibling);
        var parent = this.findAncestor(this.data.concat([this.topNode]), d);
        var x;
        if (precedingSibling) {
            x = precedingSibling.x1;
        }
        else if (parent) {
            x = parent.x0;
        }
        else {
            x = 0;
        }
        var f = d3_interpolate_2.interpolateObject({ x0: x, x1: x }, d);
        return function (t) { return _this.arc(f(1 - t)); };
    };
    Renderer.prototype.labelTranslate = function (d) {
        return this.translateString(this.arc.centroid(d));
    };
    Renderer.prototype.translateString = function (values) {
        return "translate(" + values.join(", ") + ")";
    };
    return Renderer;
}());
exports.default = Renderer;
//# sourceMappingURL=renderer.js.map