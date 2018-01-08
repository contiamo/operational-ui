"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("./event_catalog");
var component_focus_1 = require("./component_focus");
var Focus = /** @class */ (function () {
    function Focus(state, stateWriter, events, els) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = els.main;
        this.componentEl = els.component;
        this.events.on(event_catalog_1.default.FOCUS.COMPONENT.HOVER, this.onComponentHover.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.COMPONENT.OUT, this.onComponentLeave.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.HOVER, this.onElementHover.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.OUT, this.onElementOut.bind(this));
        this.events.on(event_catalog_1.default.CHART.OUT, this.onMouseLeave.bind(this));
    }
    Focus.prototype.onComponentHover = function (payload) {
        this.removeComponentFocus({ force: true });
        this.focus = new component_focus_1.default(this.state, this.componentEl, this.events, payload);
    };
    Focus.prototype.onComponentLeave = function () {
        setTimeout(this.removeComponentFocus.bind(this), 1);
    };
    Focus.prototype.removeComponentFocus = function (options) {
        if (options === void 0) { options = {}; }
        if (options.uid && options.uid !== this.focus.uid) {
            return;
        }
        if (!this.focus) {
            return;
        }
        // Do not remove focusElement if it's currently under mouse over
        // i.e. mouse is on top of label
        !options.force && this.focus.isMouseOver
            ? this.events.on(event_catalog_1.default.FOCUS.COMPONENT.LABEL.OUT, this.remove.bind(this))
            : this.remove();
    };
    Focus.prototype.onElementOut = function () {
        this.remove();
    };
    Focus.prototype.onMouseLeave = function () {
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.OUT);
    };
    Focus.prototype.remove = function () {
        this.el.node().innerHTML = "";
        this.el.style("visibility", "hidden");
    };
    return Focus;
}());
exports.default = Focus;
//# sourceMappingURL=focus.js.map