"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_handler_1 = require("./state_handler");
var event_bus_1 = require("./event_bus");
var AbstractChart = /** @class */ (function () {
    function AbstractChart(context) {
        this.drawn = false;
        this.dirty = false;
        this.context = context;
        this.state = new state_handler_1.default(this.defaultConfig());
        this.events = new event_bus_1.default();
        this.insertCanvas();
        this.initializeComponents();
        this.initializeSeries();
    }
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
        this.events.off(event, handler);
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
    // // Hide / show
    // hide(): void {
    //   $(this.context).hide()
    // }
    // show(): void {
    //   $(this.context).show()
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