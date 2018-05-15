"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var focus_utils_1 = require("../utils/focus_utils");
var event_catalog_1 = require("../utils/event_catalog");
var component_focus_1 = require("../utils/component_focus");
var percentageString = function (percentage) { return percentage.toFixed(1) + "%"; };
var PieChartFocus = /** @class */ (function () {
    function PieChartFocus(state, stateWriter, events, els) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = els.main;
        this.componentFocus = new component_focus_1.default(this.state, els.component, this.events);
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.HOVER, this.onElementHover.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.OUT, this.onElementOut.bind(this));
        this.events.on(event_catalog_1.default.CHART.OUT, this.onMouseLeave.bind(this));
    }
    PieChartFocus.prototype.onElementHover = function (payload) {
        this.remove();
        focus_utils_1.default.drawHidden(this.el, "element", "above");
        var content = this.el.append("xhtml:ul");
        content
            .append("xhtml:li")
            .attr("class", "title")
            .text(payload.d.key);
        content
            .append("xhtml:li")
            .attr("class", "series")
            .html("<span class=\"value\">" + payload.d.value + "</span>\n        <span class=\"percentage\">(" + percentageString(payload.d.percentage) + ")</span>");
        var labelDimensions = focus_utils_1.default.labelDimensions(this.el);
        var drawingContainerRect = this.state.current.get("computed").canvas.drawingContainerRect;
        var drawingDimensions = {
            xMin: drawingContainerRect.x,
            yMin: drawingContainerRect.y,
            xMax: drawingContainerRect.right,
            yMax: drawingContainerRect.bottom,
        };
        var focus = { x: payload.focusPoint.centroid[0], y: payload.focusPoint.centroid[1] };
        focus_utils_1.default.positionLabel(this.el, focus, labelDimensions, drawingDimensions, this.state.current.get("config").focusOffset, "above");
    };
    PieChartFocus.prototype.onElementOut = function () {
        this.remove();
    };
    PieChartFocus.prototype.onMouseLeave = function () {
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.OUT);
    };
    PieChartFocus.prototype.remove = function () {
        this.el.node().innerHTML = "";
        this.el.style("visibility", "hidden");
    };
    return PieChartFocus;
}());
exports.default = PieChartFocus;
//# sourceMappingURL=focus.js.map