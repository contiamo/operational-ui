"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3-selection");
var event_catalog_1 = require("../utils/event_catalog");
var styles = require("../utils/styles");
var fp_1 = require("lodash/fp");
var ProcessFlowCanvas = /** @class */ (function () {
    function ProcessFlowCanvas(state, stateWriter, events, context) {
        this.elMap = {};
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.chartContainer = this.insertChartContainer(context);
        this.el = this.insertEl();
        this.insertFocus();
        this.appendDrawingGroups();
    }
    // Chart container
    ProcessFlowCanvas.prototype.insertChartContainer = function (context) {
        var container = document.createElementNS(d3.namespaces["xhtml"], "div");
        context.appendChild(container);
        return d3.select(container).attr("class", styles.chartContainer);
    };
    // El
    ProcessFlowCanvas.prototype.insertEl = function () {
        var el = document.createElementNS(d3.namespaces["svg"], "svg");
        el.addEventListener("mouseenter", this.onMouseEnter.bind(this));
        el.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        el.addEventListener("click", this.onClick.bind(this));
        this.chartContainer.node().appendChild(el);
        this.stateWriter("elRect", el.getBoundingClientRect());
        this.elMap.series = d3.select(el);
        return d3.select(el);
    };
    ProcessFlowCanvas.prototype.onMouseEnter = function () {
        this.events.emit(event_catalog_1.default.CHART.MOUSEOVER);
    };
    ProcessFlowCanvas.prototype.onMouseLeave = function () {
        this.events.emit(event_catalog_1.default.CHART.MOUSEOUT);
    };
    ProcessFlowCanvas.prototype.onClick = function () {
        this.events.emit(event_catalog_1.default.CHART.CLICK);
    };
    // Focus
    ProcessFlowCanvas.prototype.insertFocus = function () {
        var focus = d3
            .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
            .attr("class", "" + styles.focusLegend)
            .style("visibility", "hidden");
        this.chartContainer.node().appendChild(focus.node());
        this.elMap.focus = focus;
    };
    // Drawing groups
    ProcessFlowCanvas.prototype.appendDrawingGroups = function () {
        var _this = this;
        fp_1.forEach(function (group) {
            _this.el.append("svg:g").attr("class", group + "-group");
        })(["links", "nodes"]);
    };
    // Lifecycle
    ProcessFlowCanvas.prototype.draw = function () {
        this.chartContainer.classed("hidden", this.state.current.get("config").hidden);
        this.stateWriter(["containerRect"], this.chartContainer.node().getBoundingClientRect());
    };
    ProcessFlowCanvas.prototype.remove = function () {
        this.el.node().removeEventListener("mouseenter", this.onMouseEnter.bind(this));
        this.el.node().removeEventListener("mouseleave", this.onMouseLeave.bind(this));
        this.el.node().removeEventListener("click", this.onClick.bind(this));
        this.chartContainer.remove();
        this.chartContainer = undefined;
        this.el = undefined;
    };
    // Helper method
    ProcessFlowCanvas.prototype.elementFor = function (component) {
        return this.elMap[component];
    };
    return ProcessFlowCanvas;
}());
exports.default = ProcessFlowCanvas;
//# sourceMappingURL=canvas.js.map