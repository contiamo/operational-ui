"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("./canvas");
var series_1 = require("./series");
var focus_1 = require("./focus");
var legend_1 = require("./legend");
var event_catalog_1 = require("../utils/event_catalog");
var state_handler_1 = require("../utils/state_handler");
var event_bus_1 = require("../utils/event_bus");
var fp_1 = require("lodash/fp");
var Facade = /** @class */ (function () {
    function Facade(context) {
        this.__disposed = false;
        this.context = context;
        this.events = new event_bus_1.default();
        this.state = this.insertState();
        this.canvas = this.insertCanvas();
        this.components = this.insertComponents();
        this.series = this.insertSeries();
    }
    Facade.prototype.insertState = function () {
        return new state_handler_1.StateHandler({
            data: {},
            config: this.initialConfig(),
            accessors: this.initialAccessors(),
            computed: this.initialComputed()
        });
    };
    Facade.prototype.initialConfig = function () {
        return {
            duration: 1e3,
            height: 500,
            hidden: false,
            legend: true,
            maxWidth: 100,
            maxLegendRatio: 1 / 2,
            maxLegendWidth: 200,
            maxTotalFontSize: 80,
            minChartWithLegend: 50,
            minWidth: 30,
            minInnerRadius: 30,
            minLegendWidth: 50,
            minTotalFontSize: 11,
            numberFormatter: function (x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); },
            outerBorderMargin: 1,
            showComponentFocus: true,
            uid: fp_1.uniqueId("piechart"),
            visualizationName: "piechart",
            width: 500
        };
    };
    Facade.prototype.initialAccessors = function () {
        return {
            data: {
                data: function (d) { return d.data; }
            },
            series: {
                name: function (d) { return d.name || ""; },
                renderAs: function (d) { return d.renderAs; }
            }
        };
    };
    Facade.prototype.initialComputed = function () {
        return {
            canvas: {},
            focus: {},
            series: {}
        };
    };
    Facade.prototype.insertCanvas = function () {
        return new canvas_1.default(this.state.readOnly(), this.state.computedWriter(["canvas"]), this.events, this.context);
    };
    Facade.prototype.insertComponents = function () {
        return {
            legend: new legend_1.default(this.state.readOnly(), this.state.computedWriter(["legend"]), this.events, this.canvas.elementFor("legends").top.left, { position: "top", float: "left" }),
            focus: new focus_1.default(this.state.readOnly(), this.state.computedWriter(["focus"]), this.events, this.canvas.elementFor("focus"))
        };
    };
    Facade.prototype.insertSeries = function () {
        return new series_1.default(this.state.readOnly(), this.state.computedWriter(["series"]), this.events, this.canvas.elementFor("series"));
    };
    Facade.prototype.data = function (data) {
        return this.state.data(data);
    };
    Facade.prototype.config = function (config) {
        return this.state.config(config);
    };
    Facade.prototype.accessors = function (type, accessors) {
        return this.state.accessors(type, accessors);
    };
    Facade.prototype.on = function (event, handler) {
        this.events.on(event, handler);
    };
    Facade.prototype.off = function (event, handler) {
        this.events.removeListener(event, handler);
    };
    Facade.prototype.draw = function () {
        this.state.captureState();
        this.series.initializeSeries();
        this.components.legend.draw();
        this.canvas.draw();
        this.series.draw();
        var focusElement = this.state.config().focusElement;
        !fp_1.isEmpty(focusElement)
            ? this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.HIGHLIGHT, focusElement)
            : this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.OUT);
        return this.canvas.elementFor("series").node();
    };
    Facade.prototype.close = function () {
        if (this.__disposed) {
            return;
        }
        this.__disposed = true;
        this.events.removeAll();
        this.context.innerHTML = "";
    };
    return Facade;
}());
exports.default = Facade;
//# sourceMappingURL=facade.js.map