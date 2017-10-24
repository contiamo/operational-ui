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
    Focus.prototype.onElementHover = function (ctx) {
        return function (payload) {
            var focusPoint = payload.focusPoint, datum = payload.d;
            ctx.remove();
            var isNode = focusPoint.type === "node", config = ctx.state.current.get("config");
            if (isNode ? !config.showNodeFocusLabels : !config.showLinkFocusLabels) {
                return;
            }
            ctx.uid = fp_1.uniqueId("elFocusLabel");
            focus_utils_1.default.drawHidden(ctx.el, "element").style("pointer-events", "none");
            var content = ctx.el.append("xhtml:ul");
            content
                .append("xhtml:li")
                .attr("class", styles.title)
                .text(datum.label());
            content
                .append("xhtml:li")
                .text(datum.size());
            if (isNode) {
                var breakdowns = ctx.computeBreakdowns(datum);
                var container = content.append("div").attr("class", styles.breakdownsContainer);
                ctx.addBreakdowns("Inputs", container, breakdowns.inputs);
                ctx.addBreakdowns("Outputs", container, breakdowns.outputs);
                var outputTotal = fp_1.reduce(function (memo, link) {
                    return memo + link.size();
                }, 0)(datum.sourceLinks);
                content.append("xhtml:li")
                    .attr("class", styles.title + " breakdown-difference")
                    .text("Difference: " + (datum.size() - outputTotal));
            }
            // Get label dimensions (has to be actually rendered in the page to do ctx)
            var labelDimensions = focus_utils_1.default.labelDimensions(ctx.el);
            var drawingContainer = ctx.state.current.get("computed").canvas.elRect;
            var drawingDimensions = {
                xMax: drawingContainer.left + config.width,
                xMin: drawingContainer.left,
                yMax: drawingContainer.top + config.height,
                yMin: drawingContainer.top,
            };
            var offset = focusPoint.offset + config.nodeBorderWidth + config.labelOffset;
            focus_utils_1.default.positionLabel(ctx.el, focusPoint, labelDimensions, drawingDimensions, offset);
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
        return { inputs: inputs, outputs: outputs };
    };
    Focus.prototype.addBreakdowns = function (title, content, breakdownItems) {
        var container = content.append("div").attr("class", styles.breakdownContainer);
        container.append("span")
            .attr("class", styles.title)
            .text(title);
        fp_1.forEach(function (item) {
            var breakdown = container.append("div")
                .attr("class", styles.breakdown);
            breakdown
                .append("label")
                .attr("class", styles.breakdownLabel)
                .text(item.label);
            var backgroundBar = breakdown.append("div")
                .attr("class", styles.breakdownBackgroundBar);
            backgroundBar.append("div")
                .attr("class", styles.breakdownBar)
                .style("width", item.percentage + "%");
            backgroundBar.append("div")
                .attr("class", styles.breakdownText)
                .text(item.size + " (" + item.percentage + "%)");
        })(breakdownItems);
    };
    return Focus;
}(abstract_drawing_focus_1.default));
exports.default = Focus;
//# sourceMappingURL=focus.js.map