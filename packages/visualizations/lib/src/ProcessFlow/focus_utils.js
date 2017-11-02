"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var styles = require("./styles");
var fp_1 = require("lodash/fp");
var FocusUtils = {
    computeBreakdowns: function (node) {
        var inputs = fp_1.map(function (link) {
            var size = link.size();
            return {
                label: link.source().label(),
                size: size,
                percentage: Math.round(size * 100 / node.size())
            };
        })(node.targetLinks);
        var outputs = fp_1.map(function (link) {
            var size = link.size();
            return {
                label: link.target().label(),
                size: size,
                percentage: Math.round(size * 100 / node.size())
            };
        })(node.sourceLinks);
        var startsHere = [{
                size: node.journeyStarts,
                percentage: Math.round(node.journeyStarts * 100 / node.size())
            }];
        var endsHere = [{
                size: node.journeyEnds,
                percentage: Math.round(node.journeyEnds * 100 / node.size())
            }];
        return { inputs: inputs, outputs: outputs, startsHere: startsHere, endsHere: endsHere };
    },
    computeBreakdownTotal: function (breakdowns) {
        return fp_1.reduce(function (sum, item) { return sum + item.size; }, 0)(breakdowns);
    },
    addBreakdownContainer: function (content) {
        return content.append("div").attr("class", styles.breakdownContainer);
    },
    addBreakdownTitle: function (title, subtitle) {
        return function (container) {
            container.append("span")
                .attr("class", styles.title)
                .text(title)
                .append("span")
                .text(subtitle);
            return container;
        };
    },
    appendBreakdown: function (container) {
        return function (item) {
            var breakdown = container.append("div")
                .attr("class", styles.breakdown);
            if (item.label) {
                breakdown
                    .append("label")
                    .attr("class", styles.breakdownLabel)
                    .text(item.label);
            }
            var backgroundBar = breakdown.append("div")
                .attr("class", styles.breakdownBackgroundBar);
            backgroundBar.append("div")
                .attr("class", styles.breakdownBar)
                .style("width", item.percentage + "%");
            backgroundBar.append("div")
                .attr("class", styles.breakdownText)
                .text(item.size + " (" + item.percentage + "%)");
        };
    },
    addBreakdownComment: function (comment) {
        return function (container) {
            container.append("label")
                .attr("class", styles.breakdownCommentLabel)
                .text(comment);
            return container;
        };
    }
};
exports.default = FocusUtils;
//# sourceMappingURL=focus_utils.js.map