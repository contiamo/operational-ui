"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_handler_1 = require("./data_handler");
var event_catalog_1 = require("../utils/event_catalog");
var fp_1 = require("lodash/fp");
var styles = require("./styles");
// d3 imports
var d3 = require("d3-selection");
require("d3-transition");
var d3_interpolate_1 = require("d3-interpolate");
var d3_shape_1 = require("d3-shape");
var d3_scale_1 = require("d3-scale");
var d3_utils_1 = require("../utils/d3_utils");
var arrowPath = "M-5 0 L0 -5 L5 0 M-4 -5 L0 -9 L4 -5 M-3 -10 L0 -13 L3 -10";
var spaceForArrow = 20;
var Renderer = /** @class */ (function () {
    function Renderer(state, stateWriter, events, el) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
        this.dataHandler = new data_handler_1.default(state, stateWriter);
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.CLICK, this.onClick.bind(this));
    }
    Renderer.prototype.draw = function () {
        this.compute();
        // Remove focus and truncation markers before updating chart
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT);
        this.removeTruncationArrows();
        var arcs = this.el
            .select("g.arcs")
            .attr("transform", this.translate())
            .selectAll("path." + styles.arc)
            .data(this.data, fp_1.get("id"));
        var config = this.state.current.get("config");
        this.exit(arcs, config.duration, document.hidden || config.disableAnimations);
        this.enterAndUpdate(arcs, config.duration, document.hidden || config.disableAnimations);
    };
    Renderer.prototype.exit = function (arcs, duration, disableAnimations) {
        disableAnimations
            ? arcs.exit().remove()
            : arcs
                .exit()
                .transition()
                .duration(duration)
                .attrTween("d", this.removeArcTween.bind(this))
                .style("opacity", 1e-6)
                .call(d3_utils_1.onTransitionEnd, this.updateZoom.bind(this))
                .remove();
    };
    Renderer.prototype.updateZoom = function () {
        var matchers = this.state.current.get("config").zoomNode;
        var zoomNode = fp_1.find(function (d) {
            return fp_1.every(fp_1.identity)(fp_1.reduce(function (memo, matcher) {
                memo.push(d.data[matcher] === matchers[matcher]);
                return memo;
            }, [])(fp_1.keys(matchers)));
        })(this.data);
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.CLICK, { d: zoomNode });
    };
    Renderer.prototype.isFirstLevelChild = function (d) {
        return d.parent === (this.zoomNode || this.dataHandler.topNode);
    };
    Renderer.prototype.arcClass = function (d) {
        var parentClass = !d.parent ? "parent" : "";
        var zoomClass = d.zoomable ? "zoomable" : "";
        var emptyClass = d.data.empty && this.isFirstLevelChild(d) ? "empty" : "";
        return styles.arc + " " + parentClass + " " + zoomClass + " " + emptyClass;
    };
    Renderer.prototype.enterAndUpdate = function (arcs, duration, disableAnimations) {
        var _this = this;
        var updatingArcs = arcs
            .enter()
            .append("svg:path")
            .merge(arcs)
            .attr("class", this.arcClass.bind(this))
            .style("fill", fp_1.get("color"))
            .on("mouseenter", d3_utils_1.withD3Element(this.onMouseOver.bind(this)))
            .on("click", function (d) { return _this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.CLICK, { d: d, force: true }); });
        if (disableAnimations) {
            updatingArcs.attr("d", this.arc.bind(this));
            this.updateTruncationArrows();
        }
        else {
            updatingArcs
                .transition()
                .duration(duration)
                .attrTween("d", this.arcTween.bind(this))
                .call(d3_utils_1.onTransitionEnd, this.updateTruncationArrows.bind(this));
        }
    };
    // Computations
    Renderer.prototype.compute = function () {
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
            .startAngle(this.startAngle.bind(this))
            .endAngle(this.endAngle.bind(this))
            .innerRadius(this.innerRadius.bind(this))
            .outerRadius(this.outerRadius.bind(this));
        this.previous = this.data;
        this.data = this.dataHandler.prepareData();
    };
    Renderer.prototype.startAngle = function (d) {
        var minAngle = Math.asin(1 / this.radiusScale(d.y0)) || 0;
        var strokeAdjustment = d.data.empty ? minAngle : 0;
        return this.angleScale(d.x0) + strokeAdjustment;
    };
    Renderer.prototype.endAngle = function (d) {
        // Set a minimum segment angle so that the segment can always be seen,
        // UNLESS the segment is not a descendant of the top or zoomed node (i.e. should not be visible)
        var show = fp_1.findIndex(this.isEqual(this.zoomNode || this.dataHandler.topNode))(d.ancestors()) > -1;
        var minAngle = show ? Math.asin(1 / this.radiusScale(d.y0)) || 0 : 0;
        var strokeAdjustment = d.data.empty ? -minAngle : 0;
        return Math.max(this.angleScale(d.x0) + minAngle, Math.min(2 * Math.PI, this.angleScale(d.x1))) + strokeAdjustment;
    };
    Renderer.prototype.innerRadius = function (d) {
        var strokeAdjustment = d.data.empty ? 1 : 0;
        return this.radiusScale(d.y0) + strokeAdjustment;
    };
    Renderer.prototype.outerRadius = function (d) {
        var strokeAdjustment = d.data.empty ? 1 : 0;
        return this.radiusScale(d.y1) - strokeAdjustment;
    };
    // Center elements within drawing container
    Renderer.prototype.translate = function () {
        var drawingDims = this.state.current.get("computed").canvas.drawingDims;
        this.currentTranslation = [drawingDims.width / 2, drawingDims.height / 2];
        return "translate(" + this.currentTranslation.join(", ") + ")";
    };
    // Translate back to 0,0 in top left, for focus labels
    Renderer.prototype.translateBack = function (point) {
        var currentTranslation = this.currentTranslation;
        return [point[0] + currentTranslation[0], point[1] + currentTranslation[1]];
    };
    // Helper functions for finding / filtering / comparing nodes
    Renderer.prototype.isEqual = function (d1) {
        var _this = this;
        return function (d2) {
            return Boolean(d1) && Boolean(d2) && fp_1.every(fp_1.identity)([d1.name === d2.name, _this.isSibling(d1)(d2)]);
        };
    };
    Renderer.prototype.isSibling = function (d1) {
        return function (d2) {
            if (!d1.parent && !d2.parent) {
                return true;
            }
            return d1.parent && d2.parent && fp_1.every(fp_1.identity)([d1.depth === d2.depth, d1.parent.name === d2.parent.name]);
        };
    };
    Renderer.prototype.findSiblings = function (data, d) {
        return fp_1.filter(this.isSibling(d))(data);
    };
    Renderer.prototype.findAncestor = function (data, d) {
        if (!d) {
            return;
        }
        var parent = fp_1.find(this.isEqual(d.parent))(data);
        return parent || this.findAncestor(data, d.parent);
    };
    Renderer.prototype.findDatum = function (data, d) {
        return fp_1.find(this.isEqual(d))(data);
    };
    // Arc interpolations for entering segments
    Renderer.prototype.arcTween = function (d) {
        var _this = this;
        var previousData = this.previous || [], 
        // old version of same datum
        old = fp_1.find(this.isEqual(d))(previousData), 
        // nearest ancestor that already exists
        oldParent = this.findAncestor(previousData.concat([this.dataHandler.topNode]), d);
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
            // find siblings - same parent, same depth
            var siblings = this.findSiblings(this.data, d);
            var siblingIndex = fp_1.findIndex(this.isEqual(d))(siblings);
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
        var f = d3_interpolate_1.interpolateObject({ x0: x0, x1: x1, y0: y0, y1: y1 }, d);
        return function (t) { return _this.arc(f(t)); };
    };
    // Arc interpolations for exiting segments
    Renderer.prototype.removeArcTween = function (d) {
        var _this = this;
        var oldSiblings = this.findSiblings(this.previous || [], d);
        var currentSiblings = this.findSiblings(this.data, d);
        var oldSiblingIndex = fp_1.findIndex(this.isEqual(d))(oldSiblings);
        var oldPrecedingSibling = fp_1.filter
            .convert({ cap: false })(function (sibling, i) {
            return i < oldSiblingIndex && !!_this.findDatum(currentSiblings, sibling);
        })(oldSiblings)
            .pop();
        var precedingSibling = this.findDatum(this.data, oldPrecedingSibling);
        var parent = this.findAncestor(this.data.concat([this.dataHandler.topNode]), d);
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
        var f = d3_interpolate_1.interpolateObject({ x0: x, x1: x }, d);
        return function (t) { return _this.arc(f(1 - t)); };
    };
    // Event handlers
    Renderer.prototype.onClick = function (payload) {
        var _this = this;
        // Don't allow zooming on last child
        if (payload.d && !payload.d.children) {
            return;
        }
        var zoomNode = payload.d || this.dataHandler.topNode;
        // If the center node is clicked, zoom out by one level
        if (zoomNode === this.zoomNode && payload && payload.force) {
            this.zoomOut(payload);
            return;
        }
        // Set new scale domains
        var config = this.state.current.get("config");
        var maxChildRadius = 0;
        var truncated = false;
        fp_1.forEach(function (child) {
            if (child.depth - zoomNode.depth <= _this.state.current.get("config").maxRings) {
                maxChildRadius = Math.max(maxChildRadius, child.y1);
            }
            else {
                truncated = true;
            }
        })(zoomNode.descendants());
        // If any paths are truncated, reduce radius scale range to allow space for arrow markers
        this.radiusScale.range([0, this.radius - (truncated ? config.arrowOffset + spaceForArrow : 0)]);
        // Angle and radius domains
        var angleDomain = d3_interpolate_1.interpolate(this.angleScale.domain(), [zoomNode.x0, zoomNode.x1]);
        var radiusDomain = d3_interpolate_1.interpolate(this.radiusScale.domain(), [zoomNode.y0, maxChildRadius]);
        // Save new inner radius to facilitate sizing and positioning of root label
        this.radiusScale.domain(radiusDomain(1));
        var innerRadius = this.radiusScale(zoomNode.y1);
        this.stateWriter("innerRadius", innerRadius);
        // If the sunburst is not zoomed in and the root node is fully surrounded by children,
        // make the radius of the central white circle equal to the inner radius of the first ring,
        // to avoid an extra grey ring around the root node.
        var totalRootChildValue = fp_1.reduce(function (memo, child) {
            return memo + child.value;
        }, 0)(this.dataHandler.topNode.children);
        var isSurrounded = zoomNode === this.dataHandler.topNode && zoomNode.value === totalRootChildValue;
        d3_utils_1.transitionIfVisible(this.el.select("circle." + styles.centerCircle), config.duration).attr("r", innerRadius * (isSurrounded ? 1 : config.centerCircleRadius));
        // If no payload has been sent (resetting zoom) and the chart hasn't already been zoomed
        // (occurs when no zoom config is passed in from the outside)
        // no need to do anything.
        if (!this.zoomNode && (!payload.d || payload.d === this.dataHandler.topNode)) {
            return;
        }
        this.zoomNode = zoomNode;
        this.stateWriter("zoomNode", this.zoomNode);
        this.removeTruncationArrows();
        var paths = this.el
            .selectAll("path." + styles.arc)
            .attr("pointer-events", "none")
            .classed("zoomed", function (datum) { return datum === _this.zoomNode; })
            .classed("empty", function (datum) { return datum.data.empty && _this.isFirstLevelChild(datum); })
            .each(d3_utils_1.withD3Element(function (datum, el) {
            d3.select(el).attr("pointer-events", null);
        }));
        if (document.hidden) {
            this.angleScale.domain(angleDomain(1));
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
            })
                .call(d3_utils_1.onTransitionEnd, this.updateTruncationArrows.bind(this));
        }
    };
    Renderer.prototype.zoomOut = function (payload) {
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.CLICK, { d: payload.d.parent });
    };
    Renderer.prototype.onMouseOver = function (d, el) {
        if (d === this.zoomNode) {
            return;
        }
        if (d.data.empty && !this.isFirstLevelChild(d)) {
            return;
        }
        var centroid = this.translateBack(this.arc.centroid(d));
        var hideLabel = d3.select(el).classed(styles.arrow);
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOVER, { d: d, hideLabel: hideLabel, focusPoint: { centroid: centroid } });
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
    // Arrows to denote path truncation
    Renderer.prototype.removeTruncationArrows = function () {
        this.el
            .select("g.arrows")
            .selectAll("path")
            .remove();
    };
    Renderer.prototype.arrowTransformation = function (d) {
        var radAngle = d3_interpolate_1.interpolate(this.angleScale(d.x0), this.angleScale(d.x1))(0.5);
        var degAngle = radAngle * 180 / Math.PI;
        var r = this.radiusScale(d.y1) + this.state.current.get("config").arrowOffset;
        return "translate(0, " + -r + ") rotate(" + degAngle + " 0 " + r + ")";
    };
    Renderer.prototype.updateTruncationArrows = function () {
        var _this = this;
        var centerNode = this.zoomNode || this.dataHandler.topNode, config = this.state.current.get("config");
        var data = fp_1.map(fp_1.get("parent"))(fp_1.filter(function (d) {
            return d.depth - centerNode.depth > config.maxRings && d.parent.depth - centerNode.depth <= config.maxRings;
        })(this.data));
        var arrows = this.el
            .select("g.arrows")
            .attr("transform", this.translate())
            .selectAll("path." + styles.arrow)
            .data(data, fp_1.get("name"));
        arrows.exit().remove();
        arrows
            .enter()
            .append("svg:path")
            .attr("class", styles.arrow)
            .merge(arrows)
            .attr("d", arrowPath)
            .on("mouseenter", d3_utils_1.withD3Element(this.onMouseOver.bind(this)))
            .on("click", function (d) { return _this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.CLICK, { d: d, force: true }); })
            .attr("transform", this.arrowTransformation.bind(this));
    };
    return Renderer;
}());
exports.default = Renderer;
//# sourceMappingURL=renderer.js.map