"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var focus_utils_1 = require("../utils/focus_utils");
var event_catalog_1 = require("../utils/event_catalog");
var dataName = function (d) { return d.data.name; }, dataValue = function (d) { return d.value; };
var Focus = /** @class */ (function () {
    function Focus(state, stateWriter, events, els) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = els.main;
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOVER, this.onElementHover.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT, this.onElementOut.bind(this));
        this.events.on(event_catalog_1.default.CHART.MOUSEOUT, this.onMouseLeave.bind(this));
    }
    Focus.prototype.onElementHover = function (payload) {
        this.remove();
        if (payload.hideLabel) {
            return;
        }
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
    Focus.prototype.onElementOut = function () {
        this.remove();
    };
    Focus.prototype.onMouseLeave = function () {
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT);
    };
    Focus.prototype.remove = function () {
        this.el.node().innerHTML = "";
        this.el.style("visibility", "hidden");
    };
    return Focus;
}());
exports.default = Focus;
//# sourceMappingURL=focus.js.map