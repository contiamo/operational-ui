"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("../utils/event_catalog");
var d3 = require("d3-selection");
var styles = require("../utils/styles");
var fp_1 = require("lodash/fp");
var seriesElements = [
    ["area", "drawing_clip"],
    ["bars", "drawing_clip"],
    ["flag", "xyrules_clip"],
    ["line", "drawing_clip"],
    ["symbol", "xyrules_clip"],
    ["text", "yrules_clip"]
];
var axes = ["y", "x"];
var legends = [
    { position: "top", float: "left" },
    { position: "top", float: "right" },
    { position: "bottom", float: "left" }
];
var ChartCanvas = /** @class */ (function () {
    function ChartCanvas(state, stateWriter, events, context) {
        var _this = this;
        this.elements = {};
        this.elMap = {};
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.chartContainer = this.insertChartContainer(context);
        this.drawingContainer = this.insertDrawingContainer();
        this.insertLegends();
        this.el = this.insertEl();
        this.insertClipPaths();
        this.insertDrawingGroup();
        this.insertAxes();
        this.insertRules();
        this.insertSeriesDrawingGroups();
        this.insertFocusElements();
        this.stateWriter("elements", this.elements);
        this.events.on("margins:update", function (isXAxis) {
            _this.draw();
            _this.events.emit("margins:updated", isXAxis);
        });
    }
    // Chart container
    ChartCanvas.prototype.insertChartContainer = function (context) {
        var container = document.createElementNS(d3.namespaces["xhtml"], "div");
        context.appendChild(container);
        container.addEventListener("mouseenter", this.onMouseEnter.bind(this));
        container.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        container.addEventListener("click", this.onClick.bind(this));
        return d3.select(container).attr("class", styles.chartContainer);
    };
    ChartCanvas.prototype.onMouseEnter = function () {
        this.events.emit(event_catalog_1.default.CHART.MOUSEOVER);
    };
    ChartCanvas.prototype.onMouseLeave = function () {
        this.events.emit(event_catalog_1.default.CHART.MOUSEOUT);
    };
    ChartCanvas.prototype.onClick = function () {
        this.events.emit(event_catalog_1.default.CHART.CLICK);
    };
    // Legends
    ChartCanvas.prototype.insertLegends = function () {
        var _this = this;
        fp_1.forEach(function (options) {
            if (options.position === "top") {
                _this.insertLegendBefore(options);
            }
            else {
                _this.insertLegendAfter(options);
            }
        })(legends);
    };
    ChartCanvas.prototype.insertLegendBefore = function (options) {
        var legendNode = document.createElementNS(d3.namespaces["xhtml"], "div");
        var ref = this.drawingContainer.node();
        ref.parentNode.insertBefore(legendNode, ref);
        var legend = d3
            .select(legendNode)
            .attr("class", styles.legend + " " + styles.legendTopBottom + " " + options.float)
            .style("float", options.float);
        this.elMap["legend-" + options.position + "-" + options.float] = legend;
    };
    ChartCanvas.prototype.insertLegendAfter = function (options) {
        var legendNode = document.createElementNS(d3.namespaces["xhtml"], "div");
        this.chartContainer.node().appendChild(legendNode);
        var legend = d3
            .select(legendNode)
            .attr("class", styles.legend + " " + styles.legendTopBottom + " " + options.float)
            .style("float", options.float);
        this.elMap["legend-" + options.position + "-" + options.float] = legend;
    };
    ChartCanvas.prototype.legendHeight = function (position, float) {
        return this.state.current.get("computed").series.dataForLegends[position][float].length > 0
            ? this.elementFor("legend-" + position + "-" + float).node().offsetHeight
            : 0;
    };
    ChartCanvas.prototype.totalLegendHeight = function () {
        var topLegendHeight = Math.max(this.legendHeight("top", "left"), this.legendHeight("top", "right"));
        return topLegendHeight + this.legendHeight("bottom", "left");
    };
    // Drawing container
    ChartCanvas.prototype.insertDrawingContainer = function () {
        var drawingContainer = document.createElementNS(d3.namespaces["xhtml"], "div");
        this.chartContainer.node().appendChild(drawingContainer);
        return d3.select(drawingContainer).attr("class", styles.drawingContainer);
    };
    // El
    ChartCanvas.prototype.insertEl = function () {
        var el = document.createElementNS(d3.namespaces["svg"], "svg");
        this.drawingContainer.node().appendChild(el);
        this.elMap.series = d3.select(el);
        return this.elMap.series;
    };
    // Drawing group
    ChartCanvas.prototype.insertDrawingGroup = function () {
        this.elements.drawing = this.el.append("svg:g").attr("class", "drawing");
    };
    ChartCanvas.prototype.insertAxes = function () {
        var _this = this;
        fp_1.forEach(function (axis) {
            var axesGroup = _this.elements.drawing.append("svg:g").attr("class", axis + "-axes-group");
            _this.elements[axis + "Axes"] = axesGroup;
            _this.elMap[axis + "Axes"] = axesGroup;
        })(axes);
    };
    ChartCanvas.prototype.insertRules = function () {
        var _this = this;
        fp_1.forEach(function (axis) {
            var rulesGroup = _this.elements.drawing.append("svg:g").attr("class", axis + "-rules-group");
            _this.elements[axis + "Rules"] = rulesGroup;
            _this.elMap[axis + "Rules"] = rulesGroup;
        })(axes);
    };
    ChartCanvas.prototype.insertSeriesDrawingGroups = function () {
        var _this = this;
        var series = this.elements.drawing.append("svg:g").attr("class", "series-drawings-group");
        this.elements.series = fp_1.reduce(function (memo, se) {
            var renderer = se[0];
            var clip = se[1];
            memo[renderer] = series
                .append("svg:g")
                .attr("class", "series-" + renderer)
                .attr("clip-path", "url(#" + _this.state.current.get("config").uid + "_" + clip + ")");
            return memo;
        }, {})(seriesElements);
    };
    // Focus elements
    ChartCanvas.prototype.insertFocusElements = function () {
        this.elMap.focus = this.insertFocusLabel();
        this.elMap.componentFocus = this.insertComponentFocus();
    };
    ChartCanvas.prototype.insertFocusLabel = function () {
        var focusEl = d3
            .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
            .attr("class", "" + styles.focusLegend)
            .style("visibility", "hidden");
        this.chartContainer.node().appendChild(focusEl.node());
        return focusEl;
    };
    ChartCanvas.prototype.insertComponentFocus = function () {
        var focusEl = d3.select(document.createElementNS(d3.namespaces["xhtml"], "div")).attr("class", "component-focus");
        var ref = this.chartContainer.node();
        ref.insertBefore(focusEl.node(), ref.nextSibling);
        return focusEl;
    };
    // Clip paths
    ChartCanvas.prototype.insertClipPaths = function () {
        this.elements.defs = this.el.append("defs");
        this.insertDrawingClip();
        this.insertYRulesClip();
        this.insertXYRulesClip();
    };
    ChartCanvas.prototype.insertDrawingClip = function () {
        this.elements.defs
            .append("clipPath")
            .attr("class", "chart-clip-path")
            .attr("id", this.prefixedId("_drawing_clip"))
            .append("rect");
    };
    ChartCanvas.prototype.insertYRulesClip = function () {
        this.elements.defs
            .append("clipPath")
            .attr("class", "chart-clip-path")
            .attr("id", this.prefixedId("_yrules_clip"))
            .append("rect");
    };
    ChartCanvas.prototype.insertXYRulesClip = function () {
        this.elements.defs
            .append("clipPath")
            .attr("class", "chart-clip-path")
            .attr("id", this.prefixedId("_xyrules_clip"))
            .append("rect");
    };
    ChartCanvas.prototype.prefixedId = function (id) {
        return this.state.current.get("config").uid + id;
    };
    ChartCanvas.prototype.margin = function (axis) {
        var config = this.state.current.get("config");
        var margins = this.state.current.get("computed").axes.margins || {};
        return margins[axis] || config[axis].margin;
    };
    ChartCanvas.prototype.calculateDimensions = function () {
        this.calculateDrawingContainerDims();
        this.calculateDrawingDims();
    };
    ChartCanvas.prototype.calculateDrawingContainerDims = function () {
        var config = this.state.current.get("config");
        this.stateWriter("drawingContainerDims", {
            height: config.height - this.totalLegendHeight(),
            width: config.width
        });
    };
    ChartCanvas.prototype.calculateDrawingDims = function () {
        var drawingContainerDims = this.state.current.get("computed").canvas
            .drawingContainerDims;
        this.stateWriter("drawingDims", {
            width: drawingContainerDims.width - this.margin("y1") - this.margin("y2"),
            height: drawingContainerDims.height - this.margin("x1") - this.margin("x2")
        });
    };
    // Lifecycle
    ChartCanvas.prototype.draw = function () {
        this.calculateDimensions();
        this.chartContainer.classed("hidden", this.state.current.get("config").hidden);
        this.stateWriter(["containerRect"], this.chartContainer.node().getBoundingClientRect());
        var config = this.state.current.get("config");
        var dims = this.state.current.get("computed").canvas.drawingContainerDims;
        var drawingDims = this.state.current.get("computed").canvas.drawingDims;
        this.chartContainer.style("width", config.width + "px").style("height", config.height + "px");
        this.drawingContainer.style("width", dims.width + "px").style("height", dims.height + "px");
        this.el.style("width", dims.width + "px").style("height", dims.height + "px");
        this.elements.drawing.attr("transform", "translate(" + this.margin("y1") + ", " + this.margin("x2") + ")");
        this.stateWriter("drawingContainerRect", this.drawingContainer.node().getBoundingClientRect());
        this.elements.defs
            .select("#" + this.prefixedId("_drawing_clip") + " rect")
            .attr("width", drawingDims.width)
            .attr("height", drawingDims.height);
        this.elements.defs
            .select("#" + this.prefixedId("_yrules_clip") + " rect")
            .attr("width", dims.width)
            .attr("height", drawingDims.height)
            .attr("transform", "translate(" + -this.margin("y1") + ", 0)");
        this.elements.defs
            .select("#" + this.prefixedId("_xyrules_clip") + " rect")
            .attr("width", dims.width)
            .attr("height", dims.height)
            .attr("transform", "translate(" + -this.margin("y1") + ", " + -this.margin("x2") + ")");
    };
    ChartCanvas.prototype.remove = function () {
        this.chartContainer.node().removeEventListener("mouseenter", this.onMouseEnter.bind(this));
        this.chartContainer.node().removeEventListener("mouseleave", this.onMouseLeave.bind(this));
        this.chartContainer.node().removeEventListener("click", this.onClick.bind(this));
        this.elements = {};
        this.chartContainer.remove();
        this.chartContainer = undefined;
        this.el = undefined;
        this.elements = {};
        this.drawingContainer.remove();
        this.drawingContainer = undefined;
    };
    // Helper method
    ChartCanvas.prototype.elementFor = function (component) {
        return this.elMap[component];
    };
    return ChartCanvas;
}());
exports.default = ChartCanvas;
//# sourceMappingURL=canvas.js.map