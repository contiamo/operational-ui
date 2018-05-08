"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("../utils/event_catalog");
// y is a step-function (with two x values resulting in the same y value)
// on the positive integer domain which is monotonic decreasing
exports.approxZero = function (y, initialX) {
    // make sure to get points with different y value
    var p0 = { x: initialX, y: y(initialX) };
    var p1 = { x: initialX + 2, y: y(initialX + 2) };
    // Solve for 0
    var m = (p0.y - p1.y) / (p0.x - p1.x);
    var xZero = -p0.y / m + p0.x;
    // Find nearest integer value for x that has y > 0
    var xInt = Math.round(xZero);
    for (var i = 0; i <= 10; i = i + 1) {
        if (y(xInt) <= 0) {
            xInt = xInt - 1;
        }
    }
    return xInt;
};
var RootLabel = /** @class */ (function () {
    function RootLabel(state, stateWriter, events, el) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.CLICK, this.update.bind(this));
    }
    RootLabel.prototype.update = function (payload) {
        var _this = this;
        var computed = this.state.current.get("computed");
        var config = this.state.current.get("config");
        var renderer = computed.renderer;
        var drawingDims = computed.canvas.drawingDims;
        var fixedNode = renderer.zoomNode || renderer.topNode;
        var availableWidth = renderer.innerRadius * config.centerCircleRadius * 2;
        this.el
            .select("span.value")
            .text(renderer.data.length > 0 ? config.numberFormatter(fixedNode.value) : null);
        this.el.select("span.name").text(fixedNode.data.name);
        var y = function (x) {
            _this.el.select("span.value").style("font-size", x + "px");
            // Text should fill half of available width (0.5 * diameter = radius)
            return renderer.innerRadius - _this.el.select("span.value").node().getBoundingClientRect().width;
        };
        // start with min font size
        if (y(config.minTotalFontSize) < 0) {
            // Not enough room - do not show root label
            this.el.select("span.value").text("");
            this.el.select("span.name").text("");
        }
        else {
            // change font size until bounding box is completely filled or max font size is reached
            this.el
                .select("span.value")
                .style("font-size", Math.min(config.maxTotalFontSize, exports.approxZero(y, config.minTotalFontSize)) + "px");
            this.el.style("width", availableWidth + "px");
        }
        var elDims = this.el.node().getBoundingClientRect();
        var top = config.height - drawingDims.height + drawingDims.height / 2 - elDims.height / 2;
        var left = drawingDims.width / 2 - renderer.innerRadius * config.centerCircleRadius;
        this.el.style("top", top + "px").style("left", left + "px");
    };
    return RootLabel;
}());
exports.default = RootLabel;
//# sourceMappingURL=root_label.js.map