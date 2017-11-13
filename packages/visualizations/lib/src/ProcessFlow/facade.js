"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_facade_1 = require("../utils/abstract_facade");
var canvas_1 = require("./canvas");
var series_1 = require("./series");
var focus_1 = require("./focus");
var event_catalog_1 = require("../utils/event_catalog");
var ProcessFlow = /** @class */ (function (_super) {
    __extends(ProcessFlow, _super);
    function ProcessFlow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProcessFlow.prototype.defaultConfig = function () {
        return {
            borderColor: "#fff",
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
            verticalNodeSpacing: 100,
            width: Infinity
        };
    };
    ProcessFlow.prototype.defaultAccessors = function () {
        return {
            data: {
                nodes: function (d) { return d.nodes; },
                journeys: function (d) { return d.journeys; }
            }
        };
    };
    ProcessFlow.prototype.defaultComputed = function () {
        return {
            canvas: {},
            focus: {},
            series: {},
        };
    };
    ProcessFlow.prototype.visualizationName = function () {
        return "processflow";
    };
    ProcessFlow.prototype.insertCanvas = function () {
        this.canvas = new canvas_1.default(this.state.readOnly(), this.state.computedWriter(["canvas"]), this.events, this.context);
    };
    ProcessFlow.prototype.initializeComponents = function () {
        this.components = {
            focus: new focus_1.default(this.state.readOnly(), this.state.computedWriter(["focus"]), this.events, this.canvas.elementFor("focus")),
        };
    };
    ProcessFlow.prototype.initializeSeries = function () {
        this.series = new series_1.default(this.state.readOnly(), this.state.computedWriter(["series"]), this.events, this.canvas.elementFor("series"));
    };
    ProcessFlow.prototype.draw = function () {
        this.state.captureState();
        this.series.prepareData();
        this.canvas.draw();
        this.series.draw();
        this.drawn = true;
        this.dirty = false;
        var focusElement = this.state.config().focusElement;
        if (focusElement) {
            this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.HIGHLIGHT, focusElement);
        }
        else {
            this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.OUT);
        }
        return this.canvas.elementFor("series").node();
    };
    return ProcessFlow;
}(abstract_facade_1.default));
exports.default = ProcessFlow;
//# sourceMappingURL=facade.js.map