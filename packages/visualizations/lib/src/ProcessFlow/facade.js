"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("./canvas");
var series_1 = require("./series");
var focus_1 = require("./focus");
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
        return new state_handler_1.default({
            data: {},
            config: this.initialConfig(),
            accessors: this.initialAccessors(),
            computed: this.initialComputed(),
        });
    };
    Facade.prototype.initialConfig = function () {
        return {
            borderColor: "#fff",
            duration: 1e3,
            height: Infinity,
            hidden: false,
            highlightColor: "#1499CE",
            horizontalNodeSpacing: 100,
            labelOffset: 2,
            linkBorderWidth: 4,
            maxLinkWidth: 8,
            maxNodeSize: 1500,
            minLinkWidth: 1,
            minNodeSize: 100,
            nodeBorderWidth: 10,
            showLinkFocusLabels: true,
            showNodeFocusLabels: true,
            uid: fp_1.uniqueId("processflow"),
            verticalNodeSpacing: 100,
            visualizationName: "processflow",
            width: Infinity
        };
    };
    Facade.prototype.initialAccessors = function () {
        return {
            data: {
                nodes: function (d) { return d.nodes; },
                journeys: function (d) { return d.journeys; }
            },
            node: {
                color: function (d) { return d.color || "#fff"; },
                shape: function (d) { return d.shape || "squareDiamond"; },
                size: function (d) { return d.size || 1; },
                stroke: function (d) { return d.stroke || "#000"; },
                id: function (d) { return d.id || fp_1.uniqueId("node"); },
                label: function (d) { return d.label || d.id || ""; },
                labelPosition: function (d) { return d.labelPosition || "right"; },
            },
            link: {
                dash: function (d) { return d.dash || "0"; },
                label: function (d) { return d.label || d.source.label() + " → " + d.target.label() || ""; },
                size: function (d) { return d.size || 1; },
                stroke: function (d) { return d.stroke || "#bbb"; },
                source: function (d) { return d.source; },
                sourceId: function (d) { return d.sourceId; },
                target: function (d) { return d.target; },
                targetId: function (d) { return d.targetId; },
            },
        };
    };
    Facade.prototype.initialComputed = function () {
        return {
            canvas: {},
            focus: {},
            series: {},
        };
    };
    Facade.prototype.insertCanvas = function () {
        return new canvas_1.default(this.state.readOnly(), this.state.computedWriter(["canvas"]), this.events, this.context);
    };
    Facade.prototype.insertComponents = function () {
        return {
            focus: new focus_1.default(this.state.readOnly(), this.state.computedWriter(["focus"]), this.events, this.canvas.elementFor("focus")),
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
        this.series.prepareData();
        this.canvas.draw();
        this.series.draw();
        var focusElement = this.state.config().focusElement;
        focusElement
            ? this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.HIGHLIGHT, focusElement)
            : this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.OUT);
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