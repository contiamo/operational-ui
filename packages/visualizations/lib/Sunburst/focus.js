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
var focus_utils_1 = require("../utils/focus_utils");
var focus_1 = require("../utils/focus");
var dataName = function (d) { return d.data.name; }, dataValue = function (d) { return d.value; };
var Focus = /** @class */ (function (_super) {
    __extends(Focus, _super);
    function Focus(state, stateWriter, events, els) {
        return _super.call(this, state, stateWriter, events, els) || this;
    }
    Focus.prototype.onElementHover = function (payload) {
        this.remove();
        var computed = this.state.current.get("computed");
        if (payload.d === computed.renderer.topNode) {
            return;
        }
        var focusPoint = payload.focusPoint, datum = payload.d;
        focus_utils_1.default.drawHidden(this.el, "element", "above");
        var content = this.el.append("xhtml:ul");
        content
            .append("span")
            .attr("class", "title")
            .text(dataName(datum));
        content.append("span").text("(" + this.state.current.get("config").numberFormatter(dataValue(datum)) + ")");
        var comparisonNode = computed.renderer.zoomNode || computed.renderer.topNode;
        var percentage = (dataValue(datum) * 100 / dataValue(comparisonNode)).toPrecision(3);
        content.append("xhtml:li").text(this.percentageString(datum));
        // Get label dimensions
        var labelDimensions = focus_utils_1.default.labelDimensions(this.el), labelPlacement = {
            left: focusPoint.centroid[0] - labelDimensions.width / 2,
            top: focusPoint.centroid[1]
        };
        focus_utils_1.default.drawVisible(this.el, labelPlacement);
    };
    Focus.prototype.percentageString = function (datum) {
        var computed = this.state.current.get("computed");
        var topNode = computed.renderer.topNode;
        var zoomNode = computed.renderer.zoomNode;
        return !zoomNode || topNode === zoomNode
            ? "" + this.singlePercentageString(datum, topNode)
            : this.singlePercentageString(datum, zoomNode) + " / " + this.singlePercentageString(datum, topNode);
    };
    Focus.prototype.singlePercentageString = function (datum, comparison) {
        var topNode = this.state.current.get("computed").renderer.topNode;
        var percentage = (dataValue(datum) * 100 / dataValue(comparison)).toPrecision(3);
        return percentage + "% of " + dataName(comparison);
    };
    return Focus;
}(focus_1.default));
exports.default = Focus;
//# sourceMappingURL=focus.js.map