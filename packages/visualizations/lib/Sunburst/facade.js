"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("./canvas");
var renderer_1 = require("./renderer");
var breadcrumb_1 = require("./breadcrumb");
var root_label_1 = require("./root_label");
var focus_1 = require("./focus");
var event_catalog_1 = require("../utils/event_catalog");
var state_handler_1 = require("../utils/state_handler");
var event_bus_1 = require("../utils/event_bus");
var fp_1 = require("lodash/fp");
var Facade = /** @class */ (function () {
    function Facade(context) {
        var _this = this;
        this.__disposed = false;
        this.findNode = function (matchers) {
            return fp_1.find(function (d) {
                return fp_1.every.convert({ cap: false })(function (value, key) {
                    return d[key] || d.data[key] === value;
                })(matchers);
            })(_this.state.readOnly().current.get("computed").renderer.data);
        };
        this.context = context;
        this.events = new event_bus_1.default();
        this.state = this.insertState();
        this.canvas = this.insertCanvas();
        this.components = this.insertComponents();
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
            arrowMarkerSize: 15,
            centerCircleRadius: 0.9,
            duration: 1e3,
            height: 500,
            hidden: false,
            maxRings: 10,
            numberFormatter: function (x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); },
            outerBorderMargin: 1,
            suppressAnimation: false,
            sort: true,
            uid: fp_1.uniqueId("sunburst"),
            visualizationName: "sunburst",
            width: 500
        };
    };
    Facade.prototype.initialAccessors = function () {
        return {
            data: {
                data: function (data) { return data; }
            },
            series: {
                color: function (d) { return d.color; },
                name: function (d) { return d.name || ""; },
                value: function (d) { return d.value; }
            }
        };
    };
    Facade.prototype.initialComputed = function () {
        return {
            canvas: {},
            focus: {},
            renderer: {}
        };
    };
    Facade.prototype.insertCanvas = function () {
        return new canvas_1.default(this.state.readOnly(), this.state.computedWriter(["canvas"]), this.events, this.context);
    };
    Facade.prototype.insertComponents = function () {
        return {
            breadcrumb: new breadcrumb_1.default(this.state.readOnly(), this.state.computedWriter(["breadcrumb"]), this.events, this.canvas.elementFor("breadcrumb")),
            focus: new focus_1.default(this.state.readOnly(), this.state.computedWriter(["focus"]), this.events, this.canvas.elementFor("focus")),
            renderer: new renderer_1.default(this.state.readOnly(), this.state.computedWriter(["renderer"]), this.events, this.canvas.elementFor("series")),
            rootLabel: new root_label_1.default(this.state.readOnly(), this.state.computedWriter(["rootLabel"]), this.events, this.canvas.elementFor("rootLabel"))
        };
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
        this.canvas.draw();
        this.components.renderer.draw();
        var zoomMatchers = this.state.config().zoomNode;
        var zoomNode = zoomMatchers ? this.findNode(zoomMatchers) : undefined;
        zoomNode
            ? this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.CLICK, { d: zoomNode })
            : this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.CLICK);
        return this.canvas.elementFor("series").node();
    };
    Facade.prototype.close = function () {
        if (this.__disposed) {
            return;
        }
        this.__disposed = true;
        this.canvas.remove();
        this.events.removeAll();
        this.context.innerHTML = "";
    };
    return Facade;
}());
exports.default = Facade;
//# sourceMappingURL=facade.js.map