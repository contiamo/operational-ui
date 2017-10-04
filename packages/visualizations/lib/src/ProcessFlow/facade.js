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
var Facade = /** @class */ (function (_super) {
    __extends(Facade, _super);
    function Facade() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Facade.prototype.defaultConfig = function () {
        return {
            data: {},
            config: {
                width: 500,
                height: 1000,
                maxNodeSize: 1500,
                maxLinkWidth: 15,
                labelOffset: 5,
                labelPadding: 5,
                linkStroke: "#aaa",
                visualizationName: "processflow",
                arrowFill: "#ccc",
            },
            accessors: {
                journeys: {
                    data: function (d) { return d.journeys; },
                },
                nodes: {
                    data: function (d) { return d.nodes; },
                    color: function (d) { return d.color; },
                },
            },
            computed: {
                series: {},
                canvas: {},
            },
        };
    };
    Facade.prototype.insertCanvas = function () {
        this.canvas = new canvas_1.default(this.state.readOnly(), this.state.writer(["canvas"]), this.events, this.context);
    };
    Facade.prototype.initializeComponents = function () {
        this.components = {
            focus: new focus_1.default(this.state.readOnly(), this.state.writer(["focus"]), this.events, this.canvas.elementFor("focus")),
        };
    };
    Facade.prototype.initializeSeries = function () {
        this.series = new series_1.default(this.state.readOnly(), this.state.writer(["series"]), this.events, this.canvas.elementFor("series"));
    };
    Facade.prototype.draw = function () {
        this.series.prepareData();
        this.canvas.draw();
        this.series.draw();
        this.drawn = true;
        this.dirty = false;
        return this.canvas.elementFor("series").node();
    };
    return Facade;
}(abstract_facade_1.default));
exports.default = Facade;
//# sourceMappingURL=facade.js.map