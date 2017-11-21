"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("./event_catalog");
var Focus = /** @class */ (function () {
    function Focus(state, stateWriter, events, el) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.HOVER, this.onElementHover.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.OUT, this.onElementOut.bind(this));
        this.events.on(event_catalog_1.default.CHART.OUT, this.onMouseLeave.bind(this));
    }
    Focus.prototype.onElementOut = function () {
        this.remove();
    };
    Focus.prototype.onMouseLeave = function () {
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.OUT);
    };
    Focus.prototype.remove = function () {
        this.el.node().innerHTML = "";
        this.el.style("visibility", "hidden");
        this.events.emit(event_catalog_1.default.FOCUS.CLEAR);
    };
    return Focus;
}());
exports.default = Focus;
//# sourceMappingURL=focus.js.map