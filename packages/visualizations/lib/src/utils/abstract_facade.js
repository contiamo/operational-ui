"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_handler_1 = require("./state_handler");
var event_bus_1 = require("./event_bus");
var fp_1 = require("lodash/fp");
var AbstractChart = /** @class */ (function () {
    function AbstractChart(context) {
        this.drawn = false;
        this.dirty = false;
        this.context = context;
        this.state = new state_handler_1.default(this.defaultState());
        this.events = new event_bus_1.default();
        this.insertCanvas();
        this.initializeComponents();
        this.initializeSeries();
    }
    AbstractChart.prototype.baseDefaultState = function () {
        return {
            data: {},
            config: {
                duration: 1e3,
                height: 1000,
                uid: fp_1.uniqueId(this.visualizationName()),
                visualizationName: this.visualizationName(),
                width: 500,
            },
            accessors: {},
            computed: {
                series: {},
                canvas: {},
            }
        };
    };
    AbstractChart.prototype.defaultState = function () {
        return fp_1.merge(this.baseDefaultState())({
            data: this.defaultData(),
            config: this.defaultConfig(),
            accessors: this.defaultAccessors(),
            computed: this.defaultComputed(),
        });
    };
    AbstractChart.prototype.defaultData = function () {
        return {};
    };
    AbstractChart.prototype.defaultConfig = function () {
        return {};
    };
    AbstractChart.prototype.defaultAccessors = function () {
        return {};
    };
    AbstractChart.prototype.defaultComputed = function () {
        return {};
    };
    AbstractChart.prototype.initializeComponents = function () { };
    AbstractChart.prototype.data = function (data) {
        this.dirty = true;
        return this.state.data(data);
    };
    AbstractChart.prototype.config = function (config) {
        this.dirty = true;
        return this.state.config(config);
    };
    AbstractChart.prototype.accessors = function (type, accessors) {
        this.dirty = true;
        return this.state.accessors(type, accessors);
    };
    AbstractChart.prototype.on = function (event, handler) {
        this.events.on(event, handler);
    };
    AbstractChart.prototype.off = function (event, handler) {
        this.events.removeListener(event, handler);
    };
    //@TODO implement
    AbstractChart.prototype.redraw = function (drawAll) { };
    // resize(width: number, height: number): void {
    //   this.config({ width: width, height: height })
    //   if (!this.drawn) {
    //     return
    //   }
    //   if (this.dirty) {
    //     this.draw()
    //   }
    // }
    // // Focus
    // // Date Axes
    // focusDate(date: Date, periodUnit: string): void {
    //   return
    // }
    // // Ordinal Axes
    // focusElement(): void {
    //   return
    // }
    // focusClear(): void {
    //   return
    // }
    // Close / cleanup
    AbstractChart.prototype.close = function () {
        if (this.__disposed) {
            return;
        }
        this.__disposed = true;
        // this.state.close();
        // this.trigger("close");
        // this.off();
    };
    return AbstractChart;
}());
exports.default = AbstractChart;
//# sourceMappingURL=abstract_facade.js.map