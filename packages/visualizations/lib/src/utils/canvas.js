"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("./event_catalog");
var d3 = require("d3-selection");
var fp_1 = require("lodash/fp");
var styles = require("../styles/styles");
var Canvas = /** @class */ (function () {
    function Canvas(state, stateWriter, events, context) {
        this.elements = {};
        this.elMap = {};
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.insertContainer(context);
        this.insertEl();
        this.createInitialElements();
        this.listenToMouseOver();
    }
    Canvas.prototype.insertContainer = function (context) {
        this.container = d3
            .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
            .attr("class", "" + styles.chartContainer);
        context.appendChild(this.container.node());
    };
    Canvas.prototype.insertEl = function () {
        this.el = this.createEl();
        this.container.node().appendChild(this.el.node());
        this.elMap.series = this.el;
    };
    Canvas.prototype.insertFocusLabel = function () {
        this.focusEl = d3
            .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
            .attr("class", "" + styles.focusLegend)
            .style("visibility", "hidden");
        this.container.node().appendChild(this.focusEl.node());
        this.elMap.focus = this.focusEl;
    };
    Canvas.prototype.createInitialElements = function () {
        return;
    };
    Canvas.prototype.elementFor = function (component) {
        return this.elMap[component];
    };
    Canvas.prototype.prefixedId = function (id) {
        return this.state.current.get("config").uid + id;
    };
    Canvas.prototype.listenToMouseOver = function () {
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
    Canvas.prototype.rootElement = function () {
        return this.container.node();
    };
    Canvas.prototype.trackMouseMove = function () {
        return;
    };
    Canvas.prototype.stopMouseMove = function () {
        return;
    };
    Canvas.prototype.seriesElements = function () {
        return [];
    };
    Canvas.prototype.insertSeries = function () {
        var _this = this;
        var that = this;
        return fp_1.reduce(function (memo, se) {
            var renderer = fp_1.isArray(se) ? se[0] : se;
            memo[renderer] = _this.elements.series[renderer].append("svg:g");
            return memo;
        }, {})(this.seriesElements());
    };
    Canvas.prototype.draw = function () {
        var config = this.state.current.get("config");
        this.container.style("width", config.width + "px").style("height", config.height + "px");
        this.el.style("width", config.width + "px").style("height", config.height + "px");
        this.container.classed("hidden", config.hidden);
    };
    Canvas.prototype.margin = function (side) {
        return parseInt(this.el.style("margin-" + side), 10) || 0;
    };
    Canvas.prototype.resize = function (computed) {
        return this.draw();
    };
    Canvas.prototype.remove = function () {
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
    return Canvas;
}());
exports.default = Canvas;
//# sourceMappingURL=canvas.js.map