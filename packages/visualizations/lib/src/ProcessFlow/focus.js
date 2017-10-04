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
var event_catalog_1 = require("../utils/event_catalog");
var d3 = require("d3-selection");
var fp_1 = require("lodash/fp");
// There can only be an element focus in sankey diagrams
var Focus = /** @class */ (function (_super) {
    __extends(Focus, _super);
    function Focus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Focus.prototype.onElementHover = function (ctx) {
        return function (payload) {
            var focusPoint = payload.focusPoint, datum = payload.d;
            ctx.remove();
            var isNode = focusPoint.type === "node", config = ctx.state.current.config;
            // All conditions must be true to render focus label.
            var condition = isNode ? config.showNodeFocusLabels : config.showLinkFocusLabels;
            // if (isNode ? !config.showNodeFocusLabels : !config.showLinkFocusLabels) {
            //   return
            // }
            ctx.uid = fp_1.uniqueId("elFocusLabel");
            // Focus Label (hidden initially)
            var labelEl = document.createElementNS(d3.namespaces["xhtml"], "div");
            ctx.label = focus_utils_1.default.drawHidden(labelEl, ctx.el, "element").style("pointer-events", "none");
            var content = ctx.label.append("xhtml:ul");
            content
                .append("xhtml:li")
                .attr("class", "title")
                .text(datum.label());
            // let valueFormatter: any = ctx.state.current.config.labelFormatter
            // let percentageText: string = datum.percentage
            //   ? "(" + valueFormatter(datum.percentage) + "%" + (isNode ? "" : " of " + datum.source.label()) + ")"
            //   : ""
            content
                .append("xhtml:li")
                .attr("class", "series")
                .html('<span class="value">' +
                // valueFormatter(datum.value) +
                datum.value +
                "</span>");
            // Get label dimensions (has to be actually rendered in the page to do ctx)
            var labelDimensions = focus_utils_1.default.labelDimensions(labelEl);
            var drawingContainer = ctx.el.node().getBoundingClientRect();
            // const panelContainer: ClientRect = ctx.state.current.computed.series[focusPoint.sid].sankey
            //   .node()
            //   .getBoundingClientRect()
            // const panelPaddingTop: number = parseInt(
            //   ctx.state.current.computed.series[focusPoint.sid].sankey.style("padding-top"),
            //   10,
            // )
            var drawingDimensions = {
                xMax: drawingContainer.left + drawingContainer.width,
                xMin: drawingContainer.left,
                yMax: drawingContainer.top + drawingContainer.height,
                yMin: drawingContainer.top,
            };
            var offset = focusPoint.offset + config.labelPadding;
            focus_utils_1.default.positionLabel(ctx.label, focusPoint, labelDimensions, drawingDimensions, offset);
        };
    };
    // onElementOut(): void {
    //   this.removeElementFocus()
    // }
    //
    // onMouseLeave(): void {
    //   this.removeElementFocus()
    // }
    //
    Focus.prototype.removeElementFocus = function () {
        if (this.label) {
            this.label.remove();
        }
        this.label = undefined;
        this.events.emit(event_catalog_1.default.FOCUS.CLEAR);
    };
    // Remove focus (necessary when data changed or chart is resized)
    Focus.prototype.refresh = function () {
        this.removeElementFocus();
    };
    return Focus;
}(abstract_drawing_focus_1.default));
exports.default = Focus;
//# sourceMappingURL=focus.js.map