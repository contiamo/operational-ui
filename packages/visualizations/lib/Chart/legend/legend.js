"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3-selection");
var fp_1 = require("lodash/fp");
var styles = require("../../utils/styles");
var d3_utils_1 = require("../../utils/d3_utils");
var ChartLegend = /** @class */ (function () {
    function ChartLegend(state, stateWriter, events, el) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
    }
    ChartLegend.prototype.setData = function (data) {
        this.data = data;
    };
    ChartLegend.prototype.draw = function () {
        // No legend
        if (!this.state.current.get("config").legend || this.data.length === 0) {
            this.remove();
            return;
        }
        this.el.attr("visibility", "visible");
        var legends = this.el.selectAll("div." + styles.seriesLegend).data(this.data, fp_1.get("label"));
        legends.exit().remove();
        legends
            .enter()
            .append("div")
            .attr("class", styles.seriesLegend)
            .style("float", "left")
            .each(d3_utils_1.withD3Element(function (d, el) {
            var element = d3.select(el);
            element.append("div").attr("class", "color");
            element.append("div").attr("class", "name");
        }))
            .merge(legends)
            .each(d3_utils_1.withD3Element(function (d, el) {
            var element = d3.select(el);
            element.select("div.color").style("background-color", fp_1.get("color"));
            element.select("div.name").html(fp_1.get("label"));
        }));
    };
    ChartLegend.prototype.setWidth = function (width) {
        this.el.style("width", width);
    };
    ChartLegend.prototype.remove = function () {
        this.el.node().innerHTML = "";
        this.el.attr("visibility", "hidden");
    };
    return ChartLegend;
}());
exports.default = ChartLegend;
//# sourceMappingURL=legend.js.map