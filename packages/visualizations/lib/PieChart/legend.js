"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("../utils/event_catalog");
var d3 = require("d3-selection");
var fp_1 = require("lodash/fp");
var localStyles = require("./styles");
var globalStyles = require("../utils/styles");
var d3_utils_1 = require("../utils/d3_utils");
var legend_utils_1 = require("../utils/legend_utils");
var Legend = /** @class */ (function () {
    function Legend(state, stateWriter, events, el) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.legend = el;
    }
    Legend.prototype.draw = function () {
        // No legend
        if (!this.state.current.get("config").legend) {
            this.remove();
            return;
        }
        var legends = this.legend
            .selectAll("div." + globalStyles.seriesLegend)
            .data(this.data(), fp_1.get("label"));
        legends.exit().remove();
        legends
            .enter()
            .append("div")
            .attr("class", globalStyles.seriesLegend)
            .style("float", "left")
            .on("mouseenter", d3_utils_1.withD3Element(this.onComponentHover.bind(this)))
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
        this.updateComparisonLegend();
        this.updateDimensions();
    };
    Legend.prototype.updateComparisonLegend = function () {
        // Only needed for gauges, if comparison value is given.
        var data = fp_1.filter(function (d) { return d.comparison; })(this.state.current.get("computed").series.dataForLegend);
        var legends = this.legend.selectAll("div.comparison").data(data);
        legends.exit().remove();
        var enter = legends
            .enter()
            .append("div")
            .attr("class", "comparison " + localStyles.comparisonLegend)
            .on("mouseenter", d3_utils_1.withD3Element(this.onComponentHover.bind(this)));
        enter.append("div").attr("class", localStyles.comparisonLegendLine);
        enter.append("div").attr("class", "name");
        enter
            .merge(legends)
            .select("div.name")
            .html(function (d) { return d.label; });
    };
    Legend.prototype.data = function () {
        return fp_1.filter(function (d) { return !d.comparison; })(this.state.current.get("computed").series.dataForLegend);
    };
    Legend.prototype.onComponentHover = function (d, el) {
        var _this = this;
        this.events.emit(event_catalog_1.default.FOCUS.COMPONENT.MOUSEOVER, { component: d3.select(el), options: this.currentOptions(d) });
        d3.select(el).on("mouseleave", function () { return _this.events.emit(event_catalog_1.default.FOCUS.COMPONENT.MOUSEOUT); });
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
                    color: datum.color,
                    key: datum.label
                },
                type: "config"
            };
    };
    Legend.prototype.updateDimensions = function () {
        var legendNode = this.legend.node(), config = this.state.current.get("config"), colorBoxWidth = legend_utils_1.totalWidth(this.legend.select(".color").node()), seriesLegendPadding = legend_utils_1.widthPadding(this.legend.selectAll("." + globalStyles.seriesLegend).node());
        var h = config.height;
        var lh = legend_utils_1.roundedUpHeight(legendNode) + legend_utils_1.heightMargin(legendNode);
        // Legend is higher than legend ratio or chart is smaller than chart min
        if (lh / h > config.maxLegendRatio || h - lh < config.minChartWithLegend) {
            this.remove();
        }
        else {
            if (legend_utils_1.totalWidth(legendNode) > config.width) {
                this.remove();
            }
        }
    };
    Legend.prototype.remove = function () {
        this.legend.node().innerHTML = "";
    };
    return Legend;
}());
exports.default = Legend;
//# sourceMappingURL=legend.js.map