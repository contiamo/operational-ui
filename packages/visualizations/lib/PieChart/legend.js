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
var legend_1 = require("../utils/legend");
var fp_1 = require("lodash/fp");
var styles = require("./styles");
var d3_utils_1 = require("../utils/d3_utils");
var Legend = /** @class */ (function (_super) {
    __extends(Legend, _super);
    function Legend() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Legend.prototype.data = function () {
        return fp_1.filter(function (d) { return !d.comparison; })(this.state.current.get("computed").series.dataForLegend);
    };
    Legend.prototype.dataKey = function (d) {
        return d.label;
    };
    Legend.prototype.colorAccessor = function (d) {
        return d.color;
    };
    Legend.prototype.labelAccessor = function (d) {
        return d.label;
    };
    Legend.prototype.updateComparisonLegend = function () {
        // Only needed for gauges, if comparison value is given.
        var data = fp_1.filter(function (d) { return d.comparison; })(this.state.current.get("computed").series.dataForLegend);
        var legends = this.legend.selectAll("div.comparison").data(data);
        legends.exit().remove();
        var enter = legends
            .enter()
            .append("div")
            .attr("class", "comparison " + styles.comparisonLegend)
            .on("mouseenter", d3_utils_1.withD3Element(this.onComponentHover.bind(this)));
        enter.append("div").attr("class", styles.comparisonLegendLine);
        enter.append("div").attr("class", "name");
        enter
            .merge(legends)
            .select("div.name")
            .html(function (d) { return d.label; });
    };
    Legend.prototype.currentOptions = function (datum) {
        return datum.type === "comparison"
            ? {
                options: {
                    data: datum.data
                },
                seriesType: "comparison",
                type: "series"
            }
            : {
                options: {
                    color: this.colorAccessor(datum),
                    key: this.dataKey(datum)
                },
                type: "config"
            };
    };
    return Legend;
}(legend_1.default));
exports.default = Legend;
//# sourceMappingURL=legend.js.map