"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_handler_1 = require("./state_handler");
var event_bus_1 = require("./event_bus");
var fp_1 = require("lodash/fp");
var Facade = /** @class */ (function () {
    function Facade(context) {
        this.__disposed = false;
        this.context = context;
        this.state = new state_handler_1.default(this.defaultState());
        this.events = new event_bus_1.default();
        this.insertCanvas();
        this.initializeComponents();
        this.initializeSeries();
    }
    Facade.prototype.baseDefaultState = function () {
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
            computed: {}
        };
    };
    Facade.prototype.defaultState = function () {
        return fp_1.merge(this.baseDefaultState())({
            data: this.defaultData(),
            config: this.defaultConfig(),
            accessors: this.defaultAccessors(),
            computed: this.defaultComputed(),
        });
    };
    Facade.prototype.defaultData = function () {
        return {};
    };
    Facade.prototype.defaultConfig = function () {
        return {};
    };
    Facade.prototype.defaultAccessors = function () {
        return {};
    };
    Facade.prototype.defaultComputed = function () {
        return {};
    };
    Facade.prototype.initializeComponents = function () { };
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
    // Close / cleanup
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