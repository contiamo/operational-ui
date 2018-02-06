"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("../utils/event_catalog");
var CenterContent = /** @class */ (function () {
    function CenterContent(state, stateWriter, events, el) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.CLICK, this.update.bind(this));
    }
    CenterContent.prototype.update = function (payload) {
        var computed = this.state.current.get("computed");
        var config = this.state.current.get("config");
        var renderer = computed.renderer;
        var drawingDims = computed.canvas.drawingDims;
        var fixedNode = renderer.zoomNode || renderer.topNode;
        this.el.select("span.value").text(renderer.data.length > 0 ? config.numberFormatter(fixedNode.value) : null);
        this.el.select("span.name").text(fixedNode.data.name);
        this.el.style("width", renderer.innerRadius * config.centerCircleRadius * 2 + "px");
        var elDims = this.el.node().getBoundingClientRect();
        var top = config.height - drawingDims.height + drawingDims.height / 2 - elDims.height / 2;
        var left = drawingDims.width / 2 - renderer.innerRadius * config.centerCircleRadius;
        this.el.style("top", top + "px").style("left", left + "px");
    };
    return CenterContent;
}());
exports.default = CenterContent;
//# sourceMappingURL=center_content.js.map