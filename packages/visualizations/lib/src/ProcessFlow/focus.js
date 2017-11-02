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
var abstract_drawing_focus_1 = require("../utils/abstract_drawing_focus");
var focus_utils_1 = require("../utils/focus_utils");
var fp_1 = require("lodash/fp");
var styles = require("./styles");
// There can only be an element focus in process flow diagrams
var Focus = /** @class */ (function (_super) {
    __extends(Focus, _super);
    function Focus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Focus.prototype.onElementHover = function () {
        var _this = this;
        return function (payload) {
            var focusPoint = payload.focusPoint, datum = payload.d;
            _this.remove();
            var isNode = focusPoint.type === "node", config = _this.state.current.get("config");
            if (isNode ? !config.showNodeFocusLabels : !config.showLinkFocusLabels) {
                return;
            }
            _this.uid = fp_1.uniqueId("elFocusLabel");
            focus_utils_1.default.drawHidden(_this.el, "element").style("pointer-events", "none");
            var content = _this.el.append("xhtml:ul");
            content
                .append("xhtml:li")
                .attr("class", styles.title)
                .text(datum.label())
                .append("span")
                .text(" (" + datum.size() + ")");
            if (isNode) {
                var breakdowns = _this.computeBreakdowns(datum), container = content.append("div").attr("class", styles.breakdownsContainer);
                var inputsTotal = _this.computeBreakdownTotal(breakdowns.inputs), outputsTotal = _this.computeBreakdownTotal(breakdowns.outputs), startsHerePercentage = Math.round(datum.journeyStarts * 100 / outputsTotal), endsHerePercentage = Math.round(datum.journeyEnds * 100 / inputsTotal), startsHereString = !isNaN(startsHerePercentage) ? startsHerePercentage + "% of all outputs" : " ", endsHereString = !isNaN(endsHerePercentage) ? endsHerePercentage + "% of all outputs" : " ";
                // Add "Starts here" breakdown
                fp_1.flow(_this.addBreakdownContainer, _this.addBreakdownTitle("Starts here"), _this.addBreakdownBars(breakdowns.startsHere), _this.addBreakdownComment(startsHereString))(container);
                // Add "Ends here" breakdown
                fp_1.flow(_this.addBreakdownContainer, _this.addBreakdownTitle("Ends here"), _this.addBreakdownBars(breakdowns.endsHere), _this.addBreakdownComment(endsHereString))(container);
                // Add inputs breakdown
                fp_1.flow(_this.addBreakdownContainer, _this.addBreakdownTitle("Inputs", " (" + inputsTotal + ")"), _this.addBreakdownBars(breakdowns.inputs))(container);
                // Add outputs breakdown
                fp_1.flow(_this.addBreakdownContainer, _this.addBreakdownTitle("Outputs", " (" + outputsTotal + ")"), _this.addBreakdownBars(breakdowns.outputs))(container);
                if (datum.singleNodeJourneys > 0) {
                    content
                        .append("xhtml:li")
                        .attr("class", styles.title)
                        .text("[!] " + datum.singleNodeJourneys + " single node visits (not included in the above stats)");
                }
            }
            // Get label dimensions (has to be actually rendered in the page to do this)
            var labelDimensions = focus_utils_1.default.labelDimensions(_this.el);
            var drawingContainer = _this.state.current.get("computed").canvas.elRect;
            var drawingDimensions = {
                xMax: drawingContainer.left + config.width,
                xMin: drawingContainer.left,
                yMax: drawingContainer.top + config.height,
                yMin: drawingContainer.top,
            };
            var offset = focusPoint.offset + config.nodeBorderWidth + config.labelOffset;
            focus_utils_1.default.positionLabel(_this.el, focusPoint, labelDimensions, drawingDimensions, offset);
        };
    };
    Focus.prototype.computeBreakdowns = function (node) {
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
    };
    Focus.prototype.computeBreakdownTotal = function (breakdowns) {
        return fp_1.reduce(function (sum, item) { return sum + item.size; }, 0)(breakdowns);
    };
    Focus.prototype.addBreakdownContainer = function (content) {
        return content.append("div").attr("class", styles.breakdownContainer);
    };
    Focus.prototype.addBreakdownTitle = function (title, subtitle) {
        return function (container) {
            container.append("span")
                .attr("class", styles.title)
                .text(title)
                .append("span")
                .text(subtitle);
            return container;
        };
    };
    Focus.prototype.addBreakdownBars = function (breakdownItems) {
        return function (container) {
            fp_1.forEach(function (item) {
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
            })(breakdownItems);
            return container;
        };
    };
    Focus.prototype.addBreakdownComment = function (comment) {
        return function (container) {
            container.append("label")
                .attr("class", styles.breakdownCommentLabel)
                .text(comment);
            return container;
        };
    };
    return Focus;
}(abstract_drawing_focus_1.default));
exports.default = Focus;
//# sourceMappingURL=focus.js.map