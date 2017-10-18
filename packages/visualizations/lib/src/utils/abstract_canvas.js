"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("./event_catalog");
var d3 = require("d3-selection");
var fp_1 = require("lodash/fp");
var styles = require("../styles/styles");
var AbstractCanvas = /** @class */ (function () {
    function AbstractCanvas(state, stateWriter, events, context) {
        this.elements = {};
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.insertContainer(context);
        this.insertEl();
        this.createInitialElements();
        this.listenToMouseOver();
    }
    AbstractCanvas.prototype.insertContainer = function (context) {
        this.container = d3
            .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
            .attr("class", styles.chartContainer + " clearfix");
        context.appendChild(this.container.node());
    };
    AbstractCanvas.prototype.insertEl = function () {
        this.el = this.createEl();
        this.container.node().appendChild(this.el.node());
    };
    AbstractCanvas.prototype.insertFocusLabel = function () {
        this.focusEl = d3
            .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
            .attr("class", styles.focusLegend + " clearfix")
            .style("visibility", "hidden");
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
    AbstractCanvas.prototype.prefixedId = function (id) {
        return this.state.current.get("config").uid + id;
    };
    AbstractCanvas.prototype.listenToMouseOver = function () {
        var _this = this;
        var el = this.mouseOverElement();
        if (el) {
            el.node()
                .addEventListener("mouseenter", (function () {
                _this.events.emit(event_catalog_1.default.CHART.HOVER);
                _this.trackMouseMove();
            }));
            el.node()
                .addEventListener("mouseleave", (function () {
                _this.events.emit(event_catalog_1.default.CHART.OUT);
                _this.stopMouseMove();
            }));
            el.node()
                .addEventListener("click", (function () {
                _this.events.emit(event_catalog_1.default.CHART.CLICK);
            }));
        }
    };
    AbstractCanvas.prototype.rootElement = function () {
        return this.container.node();
    };
    AbstractCanvas.prototype.trackMouseMove = function () {
        return;
    };
    AbstractCanvas.prototype.stopMouseMove = function () {
        return;
    };
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
    AbstractCanvas.prototype.draw = function () {
        var config = this.state.current.get("config");
        this.container.style("width", config.width + "px").style("height", config.height + "px");
        this.el.style("width", config.width + "px").style("height", config.height + "px");
        this.el
            .select("marker#arrow")
            .attr("fill", config.arrowFill)
            .attr("stroke", config.linkStroke);
        this.container.classed("hidden", this.state.current.get("config").hidden);
    };
    AbstractCanvas.prototype.margin = function (side) {
        return parseInt(this.el.style("margin-" + side), 10) || 0;
    };
    AbstractCanvas.prototype.resize = function (computed) {
        return this.draw();
    };
    AbstractCanvas.prototype.remove = function () {
        var el = this.mouseOverElement();
        if (el) {
            el.node().removeEventListener("mouseenter");
            el.node().removeEventListener("mouseleave");
            el.node().removeEventListener("click");
        }
        this.elements = {};
        this.container.remove();
        this.container = undefined;
        this.el = undefined;
    };
    return AbstractCanvas;
}());
exports.default = AbstractCanvas;
//# sourceMappingURL=abstract_canvas.js.map