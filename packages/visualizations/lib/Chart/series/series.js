"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var fp_1 = require("lodash/fp");
var ChartSeries = /** @class */ (function () {
    function ChartSeries(state, stateWriter, events, el, options) {
        this.renderers = [];
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
        this.update(options);
    }
    ChartSeries.prototype.update = function (options) {
        this.assignAccessors();
        this.options = options;
        this.updateRenderers();
    };
    ChartSeries.prototype.assignAccessors = function () {
        var _this = this;
        var accessors = this.state.current.get("accessors").series;
        fp_1.forEach.convert({ cap: false })(function (accessor, key) {
            ;
            _this[key] = function () { return accessor(_this.options); };
        })(accessors);
    };
    ChartSeries.prototype.updateRenderers = function () {
        var _this = this;
        this.oldRenderers = [];
        var rendererTypes = fp_1.map(fp_1.get("type"))(this.renderAs());
        this.removeAllExcept(rendererTypes);
        fp_1.forEach(function (options) {
            // @TODO typing
            var renderer = _this.get(options.type);
            renderer ? renderer.update(_this.options.data, options) : _this.addRenderer(options);
            if (options.type === "symbol") {
                _this.symbolOffset = function (d) { return Math.ceil(Math.sqrt((renderer || _this.get(options.type)).size(d))); };
            }
        })(this.renderAs());
    };
    ChartSeries.prototype.removeAllExcept = function (types) {
        fp_1.flow(fp_1.filter(function (renderer) { return !fp_1.includes(renderer.type)(types); }), fp_1.forEach(this.remove.bind(this)))(this.renderers);
    };
    ChartSeries.prototype.get = function (type) {
        return fp_1.find(function (renderer) { return renderer.type === type; })(this.renderers);
    };
    ChartSeries.prototype.addRenderer = function (options) {
        this.renderers.push(new renderer_1.default(this.state, this.events, this.el, this.options.data, options, this));
    };
    ChartSeries.prototype.remove = function (renderer) {
        this.oldRenderers.push(renderer);
        renderer.close();
        fp_1.remove(renderer)(this.renderers);
    };
    ChartSeries.prototype.dataForLegend = function () {
        return {
            color: this.legendColor(),
            label: this.legendName()
        };
    };
    ChartSeries.prototype.dataForAxis = function (axis) {
        var data = fp_1.map(function (renderer) { return renderer.dataForAxis(axis); })(this.renderers);
        return fp_1.uniqBy(String)(fp_1.compact(fp_1.flatten(data)));
    };
    ChartSeries.prototype.legendPosition = function () {
        return this.xAxis() === "x1" ? "top" : "bottom";
    };
    ChartSeries.prototype.legendFloat = function () {
        return this.legendPosition() === "top" && this.yAxis() === "y2" ? "right" : "left";
    };
    ChartSeries.prototype.getBarsInfo = function () {
        var barRenderer = fp_1.find(function (renderer) { return renderer.type === "bars"; })(this.renderers);
        if (!barRenderer) {
            return;
        }
        return {
            // @TODO
            barWidth: barRenderer.barWidth(),
            stackIndex: this.options.stackIndex
        };
    };
    ChartSeries.prototype.hasFlags = function () {
        return !!this.get("flag");
    };
    ChartSeries.prototype.draw = function () {
        fp_1.forEach(fp_1.invoke("draw"))(this.renderers);
    };
    ChartSeries.prototype.close = function () {
        fp_1.forEach(fp_1.invoke("close"))(this.renderers);
    };
    return ChartSeries;
}());
exports.default = ChartSeries;
//# sourceMappingURL=series.js.map