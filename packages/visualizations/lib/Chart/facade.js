"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("./canvas");
var series_manager_1 = require("./series_manager");
var legend_manager_1 = require("./legend_manager");
var axes_manager_1 = require("./axes_manager");
var event_catalog_1 = require("../utils/event_catalog");
var state_handler_1 = require("../utils/state_handler");
var event_bus_1 = require("../utils/event_bus");
var utils_1 = require("@operational/utils");
var theme_1 = require("@operational/theme");
var fp_1 = require("lodash/fp");
var xAxisConfig = {
    margin: 14,
    minTicks: 2,
    noAxisMargin: 3,
    tickSpacing: 65,
    outerPadding: 3
};
var yAxisConfig = {
    margin: 34,
    minTicks: 4,
    minTopOffsetTopTick: 21,
    noAxisMargin: 21,
    tickSpacing: 40,
    outerPadding: 3
};
var ChartFacade = /** @class */ (function () {
    function ChartFacade(context) {
        this.__disposed = false;
        this.context = context;
        this.events = new event_bus_1.default();
        this.state = this.insertState();
        this.canvas = this.insertCanvas();
        this.components = this.insertComponents();
        this.series = this.insertSeries();
    }
    ChartFacade.prototype.insertState = function () {
        return new state_handler_1.default({
            data: {},
            config: this.initialConfig(),
            accessors: this.initialAccessors(),
            computed: this.initialComputed()
        });
    };
    // @TODO check which of these are actually needed
    ChartFacade.prototype.initialConfig = function () {
        return {
            axisPaddingForFlags: 15,
            barLineThickness: 2,
            dateFocusLabelMargin: 20,
            duration: 1e3,
            durationCollapse: 0.33,
            durationRedraw: 0.67,
            elementFocusLabelMargin: 7,
            eventFlagAxisOffset: 10,
            flagHeight: 10,
            flagWidth: 8,
            focusDateOptions: ["label", "line", "points"],
            focusOnHover: true,
            height: 500,
            hidden: false,
            // @TODO improve naming
            innerBarPadding: 2,
            innerBarPaddingCategorical: 0.2,
            legend: true,
            maxBarWidthRatio: 1 / 3,
            maxLabelWidth: 250,
            maxLegendRatio: 1 / 2,
            maxLegendWidth: 200,
            minBarTickWidth: {
                ord: 13
            },
            minBarWidth: 3,
            minChartWithLegend: 100,
            minLegendWidth: 50,
            numberFormatter: function (x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); },
            outerBarPadding: 10,
            palette: theme_1.operational.colors.visualizationPalette,
            showComponentFocus: true,
            targetLineColor: "#999",
            textlabels: {
                offset: 2,
                rotate: {
                    horizontal: 0,
                    vertical: -60
                }
            },
            timeAxisPriority: ["x1", "x2", "y1", "y2"],
            uid: fp_1.uniqueId("chart"),
            visualizationName: "chart",
            width: 500,
            x1: fp_1.assign({ tickOffset: 12 })(xAxisConfig),
            x2: fp_1.assign({ tickOffset: -4 })(xAxisConfig),
            y1: fp_1.assign({ tickOffset: -4 })(yAxisConfig),
            y2: fp_1.assign({ tickOffset: 4 })(yAxisConfig)
        };
    };
    ChartFacade.prototype.defaultColorAssigner = function (palette) {
        return utils_1.colorAssigner(palette);
    };
    ChartFacade.prototype.initialAccessors = function () {
        var assignColors = this.defaultColorAssigner(this.initialConfig().palette);
        return {
            data: {
                series: function (d) { return d.series; },
                axes: function (d) { return d.axes; }
            },
            series: {
                data: function (d) { return d.data; },
                hide: function (d) { return false; },
                hideInLegend: function (d) { return false; },
                key: function (d) { return d.key || fp_1.uniqueId("key"); },
                legendColor: function (d) { return assignColors(d.key); },
                legendName: function (d) { return d.name || d.key || ""; },
                renderAs: function (d) { return d.renderAs; },
                unit: function (d) { return d.unit || ""; },
                axis: function (d) { return d.axis || "x1"; },
                xAxis: function (d) { return d.xAxis || "x1"; },
                yAxis: function (d) { return d.yAxis || "y1"; }
            },
            renderer: {
                x: function (series, d) { return d.x; },
                y: function (series, d) { return d.y; }
            }
        };
    };
    ChartFacade.prototype.initialComputed = function () {
        return {
            axes: {},
            canvas: {},
            focus: {},
            series: {}
        };
    };
    ChartFacade.prototype.insertCanvas = function () {
        return new canvas_1.default(this.state.readOnly(), this.state.computedWriter(["canvas"]), this.events, this.context);
    };
    // @TODO
    ChartFacade.prototype.insertComponents = function () {
        // Components {
        return {
            legends: new legend_manager_1.default(this.state.readOnly(), this.state.computedWriter(["legend"]), this.events, {
                top: {
                    left: this.canvas.elementFor("legend-top-left"),
                    right: this.canvas.elementFor("legend-top-right")
                },
                bottom: {
                    left: this.canvas.elementFor("legend-bottom-left")
                }
            }),
            axes: new axes_manager_1.default(this.state.readOnly(), this.state.computedWriter("axes"), this.events, {
                xAxes: this.canvas.elementFor("xAxes"),
                xRules: this.canvas.elementFor("xRules"),
                yAxes: this.canvas.elementFor("yAxes"),
                yRules: this.canvas.elementFor("yRules")
            })
            // focus: new ChartFocus(this.state.readOnly(), this.state.computedWriter(["focus"]), this.events, {
            //   main: this.canvas.elementFor("focus"),
            //   component: this.canvas.elementFor("componentFocus")
            // })
        };
    };
    ChartFacade.prototype.insertSeries = function () {
        return new series_manager_1.default(this.state.readOnly(), this.state.computedWriter(["series"]), this.events, this.canvas.elementFor("series"));
    };
    ChartFacade.prototype.data = function (data) {
        return this.state.data(data);
    };
    ChartFacade.prototype.config = function (config) {
        if (config.palette && !this.customColorAccessor) {
            var assignColors_1 = this.defaultColorAssigner(config.palette);
            this.accessors("series", {
                legendColor: function (d) { return assignColors_1(d.key); }
            });
        }
        return this.state.config(config);
    };
    ChartFacade.prototype.accessors = function (type, accessors) {
        if (type === "series" && fp_1.has("legendColor")(accessors)) {
            this.customColorAccessor = true;
        }
        return this.state.accessors(type, accessors);
    };
    ChartFacade.prototype.on = function (event, handler) {
        this.events.on(event, handler);
    };
    ChartFacade.prototype.off = function (event, handler) {
        this.events.removeListener(event, handler);
    };
    ChartFacade.prototype.draw = function () {
        this.state.captureState();
        this.series.assignData();
        this.components.legends.draw();
        this.components.axes.updateMargins();
        this.canvas.draw();
        this.components.axes.draw();
        this.series.draw();
        var focusElement = this.state.config().focusElement;
        !fp_1.isEmpty(focusElement)
            ? this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.HIGHLIGHT, focusElement)
            : this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.OUT);
        return this.canvas.elementFor("series").node();
    };
    ChartFacade.prototype.close = function () {
        if (this.__disposed) {
            return;
        }
        this.__disposed = true;
        this.events.removeAll();
        this.context.innerHTML = "";
    };
    return ChartFacade;
}());
exports.default = ChartFacade;
//# sourceMappingURL=facade.js.map