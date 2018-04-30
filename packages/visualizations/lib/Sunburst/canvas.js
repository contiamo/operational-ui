"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("../utils/event_catalog");
var d3 = require("d3-selection");
var styles = require("../utils/styles");
var localStyles = require("./styles");
var SunburstCanvas = /** @class */ (function () {
    function SunburstCanvas(state, stateWriter, events, context) {
        this.elMap = {};
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.chartContainer = this.renderChartContainer(context);
        this.breadcrumb = this.renderBreadcrumb();
        this.el = this.renderEl();
        this.rootLabel = this.renderRootLabel();
        this.renderFocus();
    }
    // Chart container
    SunburstCanvas.prototype.renderChartContainer = function (context) {
        var container = document.createElementNS(d3.namespaces["xhtml"], "div");
        context.appendChild(container);
        return d3.select(container).attr("class", styles.chartContainer);
    };
    // Breadcrumb
    SunburstCanvas.prototype.renderBreadcrumb = function () {
        var el = document.createElementNS(d3.namespaces["xhtml"], "div");
        this.chartContainer.node().appendChild(el);
        this.elMap.breadcrumb = d3.select(el).attr("class", localStyles.breadcrumb);
        return this.elMap.breadcrumb;
    };
    // El
    SunburstCanvas.prototype.renderEl = function () {
        var elNode = document.createElementNS(d3.namespaces["svg"], "svg");
        elNode.addEventListener("mouseenter", this.onMouseEnter.bind(this));
        elNode.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        elNode.addEventListener("click", this.onClick.bind(this));
        this.chartContainer.node().appendChild(elNode);
        var el = d3.select(elNode);
        el.append("svg:g").attr("class", "arcs");
        el.append("svg:g").attr("class", "arrows");
        el.append("circle").attr("class", localStyles.centerCircle);
        this.elMap.series = el;
        return el;
    };
    SunburstCanvas.prototype.onMouseEnter = function () {
        this.events.emit(event_catalog_1.default.CHART.MOUSEOVER);
    };
    SunburstCanvas.prototype.onMouseLeave = function () {
        this.events.emit(event_catalog_1.default.CHART.MOUSEOUT);
    };
    SunburstCanvas.prototype.onClick = function () {
        this.events.emit(event_catalog_1.default.CHART.CLICK);
    };
    // Root label
    SunburstCanvas.prototype.renderRootLabel = function () {
        var el = d3
            .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
            .attr("class", localStyles.rootLabel)
            .html("<span class='value'></span><br><span class='name'></span>");
        this.chartContainer.node().appendChild(el.node());
        this.elMap.rootLabel = el;
        return el;
    };
    // FocusElement
    SunburstCanvas.prototype.renderFocus = function () {
        var focus = d3
            .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
            .attr("class", "" + styles.focusLegend)
            .style("visibility", "hidden");
        this.chartContainer.node().appendChild(focus.node());
        this.elMap.focus = focus;
        return focus;
    };
    SunburstCanvas.prototype.drawingDims = function () {
        var config = this.state.current.get("config");
        var dims = {
            width: config.width,
            height: config.height - this.breadcrumb.node().getBoundingClientRect().height,
        };
        this.stateWriter("drawingDims", dims);
        return dims;
    };
    // Lifecycle
    SunburstCanvas.prototype.draw = function () {
        var config = this.state.current.get("config"), drawingDims = this.drawingDims();
        this.chartContainer
            .style("visibility", this.state.current.get("config").hidden ? "hidden" : "visible")
            .style("width", config.width + "px")
            .style("height", config.height + "px");
        this.el.style("width", drawingDims.width + "px").style("height", drawingDims.height + "px");
        this.el
            .select("circle." + localStyles.centerCircle)
            .attr("cx", drawingDims.width / 2)
            .attr("cy", drawingDims.height / 2);
        this.stateWriter(["containerRect"], this.chartContainer.node().getBoundingClientRect());
    };
    SunburstCanvas.prototype.remove = function () {
        this.el.node().removeEventListener("mouseenter", this.onMouseEnter.bind(this));
        this.el.node().removeEventListener("mouseleave", this.onMouseLeave.bind(this));
        this.el.node().removeEventListener("click", this.onClick.bind(this));
    };
    // Helper method
    SunburstCanvas.prototype.elementFor = function (component) {
        return this.elMap[component];
    };
    return SunburstCanvas;
}());
exports.default = SunburstCanvas;
//# sourceMappingURL=canvas.js.map