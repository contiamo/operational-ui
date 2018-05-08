"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_catalog_1 = require("./event_catalog");
var styles = require("./styles");
var ComponentFocus = /** @class */ (function () {
    function ComponentFocus(state, el, events) {
        this.state = state;
        this.el = el.append("xhtml:div").attr("class", styles.focusLegend + " " + styles.componentFocus);
        this.events = events;
        this.events.on(event_catalog_1.default.FOCUS.COMPONENT.HOVER, this.onComponentHover.bind(this));
    }
    ComponentFocus.prototype.onComponentHover = function (payload) {
        if (!this.state.current.get("config").showComponentFocus) {
            return;
        }
        this.remove();
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.OUT);
        this.draw(payload);
    };
    ComponentFocus.prototype.draw = function (payload) {
        var componentPosition = payload.component.node().getBoundingClientRect();
        var canvasPosition = this.state.current.get("computed").canvas.containerRect;
        var topBorderWidth = parseInt(window.getComputedStyle(this.el.node())["border-top-width"], 10);
        var leftBorderWidth = parseInt(window.getComputedStyle(this.el.node())["border-left-width"], 10);
        var config = this.state.current.get("config");
        // Prevent component focus from going out of canvas.
        var top = componentPosition.top - canvasPosition.top - topBorderWidth;
        var left = componentPosition.left - canvasPosition.left - leftBorderWidth;
        var width = componentPosition.width;
        var height = componentPosition.height;
        if (top < 0) {
            width += top;
            top = 0;
        }
        if (left < 0) {
            height += left;
            left = 0;
        }
        if (top + height + 2 * topBorderWidth > config.height) {
            height -= top + height + 2 * topBorderWidth - config.height;
        }
        if (left + width + 2 * leftBorderWidth > config.width) {
            width -= left + width + 2 * leftBorderWidth - config.width;
        }
        this.el
            .style("width", componentPosition.width + "px")
            .style("height", componentPosition.height + "px")
            .style("top", top + "px")
            .style("left", left + "px")
            .style("visibility", "visible");
        // Track mouseover status (mouse over label)
        this.el.on("mouseleave", this.onMouseOut.bind(this));
        this.el.on("click", this.onClick.bind(this)(payload.options));
    };
    ComponentFocus.prototype.onMouseOut = function () {
        this.remove();
    };
    ComponentFocus.prototype.onClick = function (configOptions) {
        return function () {
            console.log(configOptions);
        };
    };
    ComponentFocus.prototype.remove = function () {
        this.el.on("mouseleave", null);
        this.el.on("click", null);
        this.el.style("visibility", "hidden");
    };
    return ComponentFocus;
}());
exports.default = ComponentFocus;
//# sourceMappingURL=component_focus.js.map