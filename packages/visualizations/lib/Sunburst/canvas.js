"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("../utils/event_catalog");
var d3 = require("d3-selection");
var styles = require("../utils/styles");
var localStyles = require("./styles");
var Canvas = /** @class */ (function () {
    function Canvas(state, stateWriter, events, context) {
        this.elements = {};
        this.elMap = {};
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.container = this.insertContainer(context);
        this.breadcrumb = this.insertBreadcrumb();
        this.el = this.insertEl();
        this.rootLabel = this.insertRootLabel();
        this.listenToMouseOver();
        this.insertFocusElements();
        this.stateWriter("elements", this.elements);
    }
    Canvas.prototype.insertContainer = function (context) {
        var container = d3
            .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
            .attr("class", "" + styles.chartContainer);
        context.appendChild(container.node());
        return container;
    };
    Canvas.prototype.insertBreadcrumb = function () {
        var el = d3
            .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
            .attr("class", localStyles.breadcrumb);
        this.container.node().appendChild(el.node());
        this.elMap.breadcrumb = el;
        return el;
    };
    Canvas.prototype.insertEl = function () {
        var el = d3.select(document.createElementNS(d3.namespaces["svg"], "svg"));
        this.container.node().appendChild(el.node());
        this.elMap.series = el;
        return el;
    };
    Canvas.prototype.insertRootLabel = function () {
        var el = d3
            .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
            .attr("class", localStyles.rootLabel)
            .html("<span class='value'></span><br><span class='name'></span>");
        this.container.node().appendChild(el.node());
        this.elMap.rootLabel = el;
        return el;
    };
    Canvas.prototype.prefixedId = function (id) {
        return this.state.current.get("config").uid + id;
    };
    Canvas.prototype.insertFocusElements = function () {
        var main = this.insertFocusLabel();
        var component = this.insertComponentFocus();
        this.elMap.focus = { main: main, component: component };
    };
    Canvas.prototype.insertFocusLabel = function () {
        var focusEl = d3
            .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
            .attr("class", "" + styles.focusLegend)
            .style("visibility", "hidden");
        this.container.node().appendChild(focusEl.node());
        return focusEl;
    };
    Canvas.prototype.insertComponentFocus = function () {
        var focusEl = d3.select(document.createElementNS(d3.namespaces["xhtml"], "div")).attr("class", "component-focus");
        var ref = this.container.node();
        ref.insertBefore(focusEl.node(), ref.nextSibling);
        return focusEl;
    };
    Canvas.prototype.onMouseEnter = function () {
        this.events.emit(event_catalog_1.default.CHART.MOUSEOVER);
        this.trackMouseMove();
    };
    Canvas.prototype.onMouseLeave = function () {
        this.events.emit(event_catalog_1.default.CHART.MOUSEOUT);
        this.stopMouseMove();
    };
    Canvas.prototype.onClick = function () {
        this.events.emit(event_catalog_1.default.CHART.CLICK);
    };
    Canvas.prototype.listenToMouseOver = function () {
        this.el.node().addEventListener("mouseenter", this.onMouseEnter.bind(this));
        this.el.node().addEventListener("mouseleave", this.onMouseLeave.bind(this));
        this.el.node().addEventListener("click", this.onClick.bind(this));
    };
    Canvas.prototype.elementFor = function (component) {
        return this.elMap[component];
    };
    Canvas.prototype.trackMouseMove = function () {
        return;
    };
    Canvas.prototype.stopMouseMove = function () {
        return;
    };
    Canvas.prototype.drawingDims = function () {
        var config = this.state.current.get("config");
        var dims = {
            width: config.width,
            height: config.height - this.breadcrumb.node().getBoundingClientRect().height
        };
        this.stateWriter("drawingDims", dims);
        return dims;
    };
    Canvas.prototype.draw = function () {
        var config = this.state.current.get("config"), drawingDims = this.drawingDims();
        this.container
            .classed("hidden", this.state.current.get("config").hidden)
            .style("width", config.width + "px")
            .style("height", config.height + "px");
        this.el.style("width", drawingDims.width + "px").style("height", drawingDims.height + "px");
        this.stateWriter(["containerRect"], this.container.node().getBoundingClientRect());
    };
    Canvas.prototype.remove = function () {
        this.el.node().removeEventListener("mouseenter", this.onMouseEnter.bind(this));
        this.el.node().removeEventListener("mouseleave", this.onMouseLeave.bind(this));
        this.el.node().removeEventListener("click", this.onClick.bind(this));
    };
    return Canvas;
}());
exports.default = Canvas;
//# sourceMappingURL=canvas.js.map