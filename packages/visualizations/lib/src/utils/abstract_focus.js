"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("./event_catalog");
var AbstractFocus = /** @class */ (function () {
    function AbstractFocus(state, stateWriter, events, el) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
    }
    AbstractFocus.prototype.remove = function () {
        if (this.focus) {
            this.focus.remove();
        }
        this.focus = null;
        this.events.emit(event_catalog_1.default.FOCUS.CLEAR);
    };
    // Remove date focus and redraw (necessary when data changed or chart is resized)
    AbstractFocus.prototype.refresh = function () {
        this.remove();
    };
    return AbstractFocus;
}());
exports.default = AbstractFocus;
//# sourceMappingURL=abstract_focus.js.map