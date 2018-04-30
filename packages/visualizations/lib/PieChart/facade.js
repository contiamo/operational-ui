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
var theme_1 = require("@operational/theme");
var PieChartFacade = /** @class */ (function () {
    function PieChartFacade(context) {
        this.__disposed = false;
        this.context = context;
        this.events = new event_bus_1.default();
        this.state = this.insertState();
        this.canvas = this.insertCanvas();
        this.components = this.insertComponents();
        this.series = this.insertSeries();
    }
    PieChartFacade.prototype.insertState = function () {
        return new state_handler_1.default({
            data: {},
            config: this.initialConfig(),
            accessors: this.initialAccessors(),
            computed: this.initialComputed()
        });
    };
    PieChartFacade.prototype.initialConfig = function () {
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
            palette: theme_1.operational.colors.visualizationPalette,
            showComponentFocus: false,
            uid: fp_1.uniqueId("piechart"),
            visualizationName: "piechart",
            width: 500
        };
    };
    PieChartFacade.prototype.initialAccessors = function () {
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
    PieChartFacade.prototype.initialComputed = function () {
        return {
            canvas: {},
            focus: {},
            series: {}
        };
    };
    PieChartFacade.prototype.insertCanvas = function () {
        return new canvas_1.default(this.state.readOnly(), this.state.computedWriter(["canvas"]), this.events, this.context);
    };
    PieChartFacade.prototype.insertComponents = function () {
        return {
            legend: new legend_1.default(this.state.readOnly(), this.state.computedWriter(["legend"]), this.events, this.canvas.elementFor("legend")),
            focus: new focus_1.default(this.state.readOnly(), this.state.computedWriter(["focus"]), this.events, {
                main: this.canvas.elementFor("focus"),
                component: this.canvas.elementFor("componentFocus")
            })
        };
    };
    PieChartFacade.prototype.insertSeries = function () {
        return new series_1.default(this.state.readOnly(), this.state.computedWriter(["series"]), this.events, this.canvas.elementFor("series"));
    };
    PieChartFacade.prototype.data = function (data) {
        return this.state.data(data);
    };
    PieChartFacade.prototype.config = function (config) {
        return this.state.config(config);
    };
    PieChartFacade.prototype.accessors = function (type, accessors) {
        return this.state.accessors(type, accessors);
    };
    PieChartFacade.prototype.on = function (event, handler) {
        this.events.on(event, handler);
    };
    PieChartFacade.prototype.off = function (event, handler) {
        this.events.removeListener(event, handler);
    };
    PieChartFacade.prototype.draw = function () {
        this.state.captureState();
        this.series.assignData();
        this.components.legend.draw();
        this.canvas.draw();
        this.series.draw();
        var focusElement = this.state.config().focusElement;
        !fp_1.isEmpty(focusElement)
            ? this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.HIGHLIGHT, focusElement)
            : this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT);
        return this.canvas.elementFor("series").node();
    };
    PieChartFacade.prototype.close = function () {
        if (this.__disposed) {
            return;
        }
        this.__disposed = true;
        this.events.removeAll();
        this.context.innerHTML = "";
    };
    return PieChartFacade;
}());
exports.default = PieChartFacade;
//# sourceMappingURL=facade.js.map