"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3-selection");
var fp_1 = require("lodash/fp");
var AbstractCanvas = /** @class */ (function () {
    function AbstractCanvas(state, stateWriter, events, context) {
        this.elements = {};
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.insertContainer(context);
        this.insertEl();
        this.createInitialElements();
        // this.listenToMouseOver()
    }
    AbstractCanvas.prototype.insertContainer = function (context) {
        this.container = d3
            .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
            .attr("class", "chart-container clearfix");
        context.appendChild(this.container.node());
    };
    AbstractCanvas.prototype.insertEl = function () {
        this.el = this.createEl();
        // this.stateWriter("el", this.el)
        this.container.node().appendChild(this.el.node());
    };
    AbstractCanvas.prototype.insertFocusLabel = function () {
        this.focusEl = d3.select(document.createElementNS(d3.namespaces["xhtml"], "div")).attr("class", "focus-legend");
        // this.stateWriter("focusEl", this.focusEl)
        this.container.node().appendChild(this.focusEl.node());
    };
    AbstractCanvas.prototype.createInitialElements = function () {
        return;
    };
    AbstractCanvas.prototype.elementFor = function (component) {
        var elMap = {
            series: this.el,
            focus: this.focusEl,
        };
        return elMap[component];
    };
    // prefixedId(id: string): string {
    //   return this.state.uid + id
    // }
    //
    // listenToMouseOver(): void {
    //   let el: d3.Selection<Node> = this.mouseOverElement()
    //   if (el) {
    //     $(el.node())
    //       .on(
    //         "mouseenter",
    //         _.bind(function(): void {
    //           this.state.trigger(Events.CHART.HOVER)
    //           this.trackMouseMove()
    //         }, this),
    //       )
    //       .on(
    //         "mouseleave",
    //         _.bind(function(): void {
    //           this.state.trigger(Events.CHART.OUT)
    //           this.stopMouseMove()
    //         }, this),
    //       )
    //       .on(
    //         "mouseclick",
    //         _.bind(function(): void {
    //           this.state.trigger(Events.CHART.CLICK)
    //         }, this),
    //       )
    //   }
    // }
    AbstractCanvas.prototype.rootElement = function () {
        return this.container.node();
    };
    // abstract mouseOverElement(): d3.Selection<Node>
    //
    // trackMouseMove(): void {
    //   return
    // }
    //
    // stopMouseMove(): void {
    //   return
    // }
    AbstractCanvas.prototype.seriesElements = function () {
        return [];
    };
    AbstractCanvas.prototype.insertSeries = function () {
        var _this = this;
        var that = this;
        return fp_1.reduce(function (memo, se) {
            var renderer = fp_1.isArray(se) ? se[0] : se;
            memo[renderer] = _this.elements.series[renderer].append("svg:g");
            return memo;
        }, {})(this.seriesElements());
    };
    // insertElement(name: string, element: d3.Selection<Node>): void {
    //   this.elements[name].node().appendChild(element.node())
    // }
    //
    // insertFocus(element: d3.Selection<Node>): void {
    //   let ref: Node = this.el.node()
    //   ref.parentNode.appendChild(element.node())
    // }
    //
    // insertComponentFocus(element: d3.Selection<Node>): void {
    //   let ref: Node = this.container.node()
    //   ref.insertBefore(element.node(), ref.nextSibling)
    // }
    //
    // toggleSmall(value?: boolean): void {
    //   this.el.classed(this.state.options.smallClass, value)
    // }
    AbstractCanvas.prototype.draw = function () {
        var config = this.state.current.get("config");
        this.container.style("width", config.width + "px").style("height", config.height + "px");
        this.el.style("width", config.width + "px").style("height", config.height + "px");
        this.el
            .select("marker#arrow")
            .attr("fill", config.arrowFill)
            .attr("stroke", config.linkStroke);
    };
    AbstractCanvas.prototype.margin = function (side) {
        return parseInt(this.el.style("margin-" + side), 10) || 0;
    };
    AbstractCanvas.prototype.resize = function (computed) {
        return this.draw();
    };
    AbstractCanvas.prototype.remove = function () {
        // $(this.mouseOverElement().node()).off()
        this.elements = {};
        this.container.remove();
        this.container = undefined;
        this.el = undefined;
    };
    return AbstractCanvas;
}());
exports.default = AbstractCanvas;
//# sourceMappingURL=abstract_canvas.js.map