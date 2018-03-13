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
var utils_1 = require("@operational/utils");
var theme_1 = require("@operational/theme");
var SunburstFacade = /** @class */ (function () {
    function SunburstFacade(context) {
        var _this = this;
        this.__disposed = false;
        this.customColorAccessor = false;
        this.findNode = function (matchers) {
            return fp_1.find(function (d) {
                return fp_1.every.convert({ cap: false })(function (value, key) {
                    return (d.data[key] || d[key]) === value;
                })(matchers);
            })(_this.state.readOnly().current.get("computed").renderer.data);
        };
        this.context = context;
        this.events = new event_bus_1.default();
        this.state = this.insertState();
        this.canvas = this.insertCanvas();
        this.components = this.insertComponents();
    }
    SunburstFacade.prototype.insertState = function () {
        return new state_handler_1.default({
            data: {},
            config: this.initialConfig(),
            accessors: this.initialAccessors(),
            computed: this.initialComputed()
        });
    };
    SunburstFacade.prototype.initialConfig = function () {
        return {
            arrowOffset: 10,
            centerCircleRadius: 0.9,
            disableAnimations: false,
            duration: 1e3,
            height: 500,
            hidden: false,
            maxRings: 10,
            numberFormatter: function (x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); },
            outerBorderMargin: 1,
            palette: theme_1.operational.colors.visualizationPalette,
            propagateColors: true,
            sort: true,
            uid: fp_1.uniqueId("sunburst"),
            visualizationName: "sunburst",
            width: 500
        };
    };
    SunburstFacade.prototype.defaultColorAssigner = function (palette) {
        return utils_1.colorAssigner(palette);
    };
    SunburstFacade.prototype.initialAccessors = function () {
        var assignColors = this.defaultColorAssigner(this.initialConfig().palette);
        return {
            data: {
                data: function (data) { return data; }
            },
            series: {
                color: function (d) { return assignColors(d.name); },
                name: function (d) { return d.name || ""; },
                value: function (d) { return d.value; }
            }
        };
    };
    SunburstFacade.prototype.initialComputed = function () {
        return {
            canvas: {},
            focus: {},
            renderer: {}
        };
    };
    SunburstFacade.prototype.insertCanvas = function () {
        return new canvas_1.default(this.state.readOnly(), this.state.computedWriter(["canvas"]), this.events, this.context);
    };
    SunburstFacade.prototype.insertComponents = function () {
        return {
            breadcrumb: new breadcrumb_1.default(this.state.readOnly(), this.state.computedWriter(["breadcrumb"]), this.events, this.canvas.elementFor("breadcrumb")),
            focus: new focus_1.default(this.state.readOnly(), this.state.computedWriter(["focus"]), this.events, this.canvas.elementFor("focus")),
            renderer: new renderer_1.default(this.state.readOnly(), this.state.computedWriter(["renderer"]), this.events, this.canvas.elementFor("series")),
            rootLabel: new root_label_1.default(this.state.readOnly(), this.state.computedWriter(["rootLabel"]), this.events, this.canvas.elementFor("rootLabel"))
        };
    };
    SunburstFacade.prototype.data = function (data) {
        return this.state.data(data);
    };
    SunburstFacade.prototype.config = function (config) {
        if (config.palette && !this.customColorAccessor) {
            var assignColors_1 = this.defaultColorAssigner(config.palette);
            this.accessors("series", {
                color: function (d) { return assignColors_1(d.name, d.color); }
            });
        }
        return this.state.config(config);
    };
    SunburstFacade.prototype.accessors = function (type, accessors) {
        if (type === "series" && fp_1.has("color")(accessors)) {
            this.customColorAccessor = true;
        }
        return this.state.accessors(type, accessors);
    };
    SunburstFacade.prototype.on = function (event, handler) {
        this.events.on(event, handler);
    };
    SunburstFacade.prototype.off = function (event, handler) {
        this.events.removeListener(event, handler);
    };
    SunburstFacade.prototype.draw = function () {
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
    SunburstFacade.prototype.close = function () {
        if (this.__disposed) {
            return;
        }
        this.__disposed = true;
        this.canvas.remove();
        this.events.removeAll();
        this.context.innerHTML = "";
    };
    return SunburstFacade;
}());
exports.default = SunburstFacade;
//# sourceMappingURL=facade.js.map