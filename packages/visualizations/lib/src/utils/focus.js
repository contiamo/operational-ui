"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("./event_catalog");
var Focus = /** @class */ (function () {
    function Focus(state, stateWriter, events, el) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
    }
    Focus.prototype.remove = function () {
        this.el.node().innerHTML = "";
        this.el.style("visibility", "hidden");
        this.events.emit(event_catalog_1.default.FOCUS.CLEAR);
    };
    // Remove date focus and redraw (necessary when data changed or chart is resized)
    Focus.prototype.refresh = function () {
        this.remove();
    };
    return Focus;
}());
exports.default = Focus;
//# sourceMappingURL=focus.js.map