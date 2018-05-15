"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("../utils/event_catalog");
var font_sizing_utils_1 = require("../utils/font_sizing_utils");
var RootLabel = /** @class */ (function () {
    function RootLabel(state, stateWriter, events, el) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.CLICK, this.update.bind(this));
    }
    RootLabel.prototype.update = function (payload) {
        var computed = this.state.current.get("computed");
        var config = this.state.current.get("config");
        var renderer = computed.renderer;
        var drawingDims = computed.canvas.drawingDims;
        var fixedNode = renderer.zoomNode || renderer.topNode;
        var availableWidth = renderer.innerRadius * config.centerCircleRadius * 2;
        this.el.select("span.value").text(renderer.data.length > 0 ? config.numberFormatter(fixedNode.value) : null);
        this.el.select("span.name").text(fixedNode.data.name);
        var y = font_sizing_utils_1.stepFunction(this.el.select("span.value"), renderer.innerRadius);
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
                .style("font-size", Math.min(config.maxTotalFontSize, font_sizing_utils_1.approxZero(y, config.minTotalFontSize)) + "px");
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