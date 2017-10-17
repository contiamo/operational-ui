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
                .attr("class", "title clearfix")
                .text(datum.label());
            content
                .append("xhtml:li")
                .attr("class", "series clearfix")
                .html('<span class="value">' + datum.size() + "</span>");
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
    return Focus;
}(abstract_drawing_focus_1.default));
exports.default = Focus;
//# sourceMappingURL=focus.js.map