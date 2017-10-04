"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_handler_1 = require("./state_handler");
var event_bus_1 = require("./event_bus");
var $ = require("jquery");
require("../styles/styles.less");
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
    AbstractChart.prototype.hasData = function () {
        return this.state.hasData();
    };
    // Clear all data (does not render, need to call "#draw")
    AbstractChart.prototype.clear = function () {
        this.data({});
    };
    //@TODO implement
    AbstractChart.prototype.redraw = function (drawAll) { };
    AbstractChart.prototype.resize = function (width, height) {
        this.config({ width: width, height: height });
        if (!this.drawn) {
            return;
        }
        if (this.dirty) {
            this.draw();
        }
    };
    // Focus
    // Date Axes
    AbstractChart.prototype.focusDate = function (date, periodUnit) {
        return;
    };
    // Ordinal Axes
    AbstractChart.prototype.focusElement = function () {
        return;
    };
    AbstractChart.prototype.focusClear = function () {
        return;
    };
    // Hide / show
    AbstractChart.prototype.hide = function () {
        $(this.context).hide();
    };
    AbstractChart.prototype.show = function () {
        $(this.context).show();
    };
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