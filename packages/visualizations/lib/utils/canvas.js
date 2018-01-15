"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("./event_catalog");
var d3 = require("d3-selection");
var styles = require("./styles");
var Canvas = /** @class */ (function () {
    function Canvas(state, stateWriter, events, context) {
        this.elements = {};
        this.elMap = {};
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.container = this.insertContainer(context);
        this.el = this.insertEl();
        this.listenToMouseOver();
    }
    Canvas.prototype.insertContainer = function (context) {
        var container = d3
            .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
            .attr("class", "" + styles.chartContainer);
        context.appendChild(container.node());
        return container;
    };
    Canvas.prototype.insertEl = function () {
        var el = this.createEl();
        this.container.node().appendChild(el.node());
        this.elMap.series = el;
        return el;
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
        var el = this.mouseOverElement();
        if (el) {
            el.node().addEventListener("mouseenter", this.onMouseEnter.bind(this));
            el.node().addEventListener("mouseleave", this.onMouseLeave.bind(this));
            el.node().addEventListener("click", this.onClick.bind(this));
        }
    };
    Canvas.prototype.elementFor = function (component) {
        return this.elMap[component];
    };
    Canvas.prototype.prefixedId = function (id) {
        return this.state.current.get("config").uid + id;
    };
    Canvas.prototype.shadowDefinitionId = function () {
        return this.prefixedId("_shadow");
    };
    Canvas.prototype.trackMouseMove = function () {
        return;
    };
    Canvas.prototype.stopMouseMove = function () {
        return;
    };
    Canvas.prototype.draw = function () {
        this.container.classed("hidden", this.state.current.get("config").hidden);
        this.stateWriter(["containerRect"], this.container.node().getBoundingClientRect());
    };
    Canvas.prototype.remove = function () {
        var el = this.mouseOverElement();
        if (el) {
            el.node().removeEventListener("mouseenter", this.onMouseEnter.bind(this));
            el.node().removeEventListener("mouseleave", this.onMouseLeave.bind(this));
            el.node().removeEventListener("click", this.onClick.bind(this));
        }
        this.elements = {};
        this.container.remove();
        this.container = undefined;
        this.el = undefined;
    };
    return Canvas;
}());
exports.default = Canvas;
//# sourceMappingURL=canvas.js.map