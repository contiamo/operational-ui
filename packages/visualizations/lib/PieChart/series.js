"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import DataHandler from "./data_handler"
var renderer_1 = require("./renderers/renderer");
var fp_1 = require("lodash/fp");
var Series = /** @class */ (function () {
    function Series(state, stateWriter, events, el) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
        this.drawn = false;
    }
    Series.prototype.initializeSeries = function () {
        this.attributes = this.state.current.get("data");
        this.assignAccessors();
        this.renderer = this.initializeRenderer();
        this.prepareData();
        this.stateWriter("dataForLegend", this.renderer.dataForLegend());
    };
    Series.prototype.prepareData = function () {
        var _this = this;
        this.data = fp_1.flow(fp_1.filter(function (datum) {
            return _this.renderer.key(datum) && _this.renderer.key(datum).length > 0 && _this.renderer.value(datum) > 0;
        }))(this.state.current.get("accessors").data.data(this.attributes));
        this.renderer.setData(this.data);
        this.stateWriter("data", this.data);
    };
    Series.prototype.assignAccessors = function () {
        var _this = this;
        var accessors = this.state.current.get("accessors").series;
        fp_1.forEach.convert({ cap: false })(function (accessor, key) {
            ;
            _this[key] = function () { return accessor(_this.attributes); };
        })(accessors);
    };
    Series.prototype.initializeRenderer = function () {
        var options = this.renderAs();
        if (options.length !== 1) {
            throw new Error("Incorrect number of renderers: " + options.length + " specified, 1 required");
        }
        var renderer = new renderer_1.default(this.state, this.events, this.el, options[0]);
        return renderer;
    };
    Series.prototype.hasData = function () {
        return this.data.length > 0;
    };
    Series.prototype.draw = function () {
        var seriesConfig = this.state.current.get("computed").series;
        this.renderer.draw();
        this.drawn = true;
    };
    return Series;
}());
exports.default = Series;
//# sourceMappingURL=series.js.map