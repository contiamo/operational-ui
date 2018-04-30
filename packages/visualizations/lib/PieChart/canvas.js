"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("../utils/event_catalog");
var d3 = require("d3-selection");
var styles = require("../utils/styles");
var PieChartCanvas = /** @class */ (function () {
    function PieChartCanvas(state, stateWriter, events, context) {
        this.elements = {};
        this.elMap = {};
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.chartContainer = this.renderChartContainer(context);
        this.renderLegend();
        this.drawingContainer = this.renderDrawingContainer();
        this.el = this.renderEl();
        this.renderShadows();
        this.renderDrawingGroup();
        this.renderFocusElements();
        this.stateWriter("elements", this.elements);
    }
    // Chart container
    PieChartCanvas.prototype.renderChartContainer = function (context) {
        var container = document.createElementNS(d3.namespaces["xhtml"], "div");
        context.appendChild(container);
        container.addEventListener("mouseenter", this.onMouseEnter.bind(this));
        container.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        container.addEventListener("click", this.onClick.bind(this));
        return d3.select(container).attr("class", styles.chartContainer);
    };
    PieChartCanvas.prototype.onMouseEnter = function () {
        this.events.emit(event_catalog_1.default.CHART.HOVER);
    };
    PieChartCanvas.prototype.onMouseLeave = function () {
        this.events.emit(event_catalog_1.default.CHART.OUT);
    };
    PieChartCanvas.prototype.onClick = function () {
        this.events.emit(event_catalog_1.default.CHART.CLICK);
    };
    // Legend
    PieChartCanvas.prototype.renderLegend = function () {
        var legendNode = document.createElementNS(d3.namespaces["xhtml"], "div");
        this.chartContainer.node().appendChild(legendNode);
        var legend = d3
            .select(legendNode)
            .attr("class", styles.legend + " " + styles.legendTopBottom + " left")
            .style("float", "left");
        this.elMap.legend = legend;
        this.stateWriter("legend", legend);
    };
    // Drawing container
    PieChartCanvas.prototype.renderDrawingContainer = function () {
        var drawingContainer = document.createElementNS(d3.namespaces["xhtml"], "div");
        this.chartContainer.node().appendChild(drawingContainer);
        return d3.select(drawingContainer).attr("class", styles.drawingContainer);
    };
    // El
    PieChartCanvas.prototype.renderEl = function () {
        var el = document.createElementNS(d3.namespaces["svg"], "svg");
        this.drawingContainer.node().appendChild(el);
        this.elMap.series = d3.select(el);
        return this.elMap.series;
    };
    // Defs
    PieChartCanvas.prototype.renderShadows = function () {
        this.elements.defs = this.el.append("defs");
        var shadow = this.elements.defs
            .append("filter")
            .attr("id", this.shadowDefinitionId())
            .attr("height", "130%");
        shadow
            .append("feGaussianBlur")
            .attr("in", "SourceAlpha")
            .attr("stdDeviation", "3");
        shadow
            .append("feOffset")
            .attr("dx", "2")
            .attr("dy", "2")
            .attr("result", "offsetblur");
        shadow
            .append("feComponentTransfer")
            .append("feFuncA")
            .attr("type", "linear")
            .attr("slope", "0.5");
        var shadowFeMerge = shadow.append("feMerge");
        shadowFeMerge.append("feMergeNode");
        shadowFeMerge.append("feMergeNode").attr("in", "SourceGraphic");
        this.stateWriter("shadowDefinitionId", this.shadowDefinitionId());
    };
    PieChartCanvas.prototype.prefixedId = function (id) {
        return this.state.current.get("config").uid + id;
    };
    PieChartCanvas.prototype.shadowDefinitionId = function () {
        return this.prefixedId("_shadow");
    };
    // Drawing group
    PieChartCanvas.prototype.renderDrawingGroup = function () {
        this.elements.drawing = this.el.append("svg:g").attr("class", "drawing");
    };
    // Focus elements
    PieChartCanvas.prototype.renderFocusElements = function () {
        this.elMap.focus = this.renderFocusLabel();
        this.elMap.componentFocus = this.renderComponentFocus();
    };
    PieChartCanvas.prototype.renderFocusLabel = function () {
        var focusEl = d3
            .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
            .attr("class", "" + styles.focusLegend)
            .style("visibility", "hidden");
        this.chartContainer.node().appendChild(focusEl.node());
        return focusEl;
    };
    PieChartCanvas.prototype.renderComponentFocus = function () {
        var focusEl = d3.select(document.createElementNS(d3.namespaces["xhtml"], "div")).attr("class", "component-focus");
        var ref = this.chartContainer.node();
        ref.insertBefore(focusEl.node(), ref.nextSibling);
        return focusEl;
    };
    PieChartCanvas.prototype.drawingContainerDims = function () {
        var config = this.state.current.get("config");
        var dims = {
            height: config.height - this.elMap.legend.node().offsetHeight,
            width: config.width,
        };
        this.stateWriter("drawingContainerDims", dims);
        return dims;
    };
    // Lifecycle
    PieChartCanvas.prototype.draw = function () {
        this.chartContainer.classed("hidden", this.state.current.get("config").hidden);
        this.stateWriter(["containerRect"], this.chartContainer.node().getBoundingClientRect());
        var config = this.state.current.get("config");
        var dims = this.drawingContainerDims();
        this.chartContainer.style("width", config.width + "px").style("height", config.height + "px");
        this.drawingContainer.style("width", dims.width + "px").style("height", dims.height + "px");
        this.el.style("width", dims.width + "px").style("height", dims.height + "px");
        this.stateWriter("drawingContainerRect", this.drawingContainer.node().getBoundingClientRect());
    };
    PieChartCanvas.prototype.remove = function () {
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
    PieChartCanvas.prototype.elementFor = function (component) {
        return this.elMap[component];
    };
    return PieChartCanvas;
}());
exports.default = PieChartCanvas;
//# sourceMappingURL=canvas.js.map