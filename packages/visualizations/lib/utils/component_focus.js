"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var event_catalog_1 = require("./event_catalog");
var styles = require("./styles");
var ComponentFocus = /** @class */ (function () {
    function ComponentFocus(state, el, events, payload) {
        this.isMouseOver = false;
        this.type = "component";
        this.state = state;
        this.el = el.append("xhtml:div").attr("class", styles.focusLegend + " " + styles.componentFocus);
        this.events = events;
        this.uid = fp_1.uniqueId("componentFocusLabel");
        var componentPosition = payload.component.node().getBoundingClientRect(), canvasPosition = this.state.current.get("computed").canvas.containerRect, topBorderWidth = parseInt(window.getComputedStyle(this.el.node())["border-top-width"], 10), leftBorderWidth = parseInt(window.getComputedStyle(this.el.node())["border-left-width"], 10), config = this.state.current.get("config");
        // Prevent component focus from going out of canvas.
        var top = componentPosition.top - canvasPosition.top - topBorderWidth, left = componentPosition.left - canvasPosition.left - leftBorderWidth, width = componentPosition.width, height = componentPosition.height;
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
            .style("left", left + "px");
        // Track mouseover status (mouse over label)
        this.el.on("mouseenter", this.onMouseOver.bind(this));
        this.el.on("mouseleave", this.onMouseOut.bind(this));
        this.el.on("click", this.onClick.bind(this)(payload.options));
    }
    ComponentFocus.prototype.onMouseOver = function () {
        this.isMouseOver = true;
    };
    ComponentFocus.prototype.onMouseOut = function () {
        this.isMouseOver = false;
        this.events.emit(event_catalog_1.default.FOCUS.COMPONENT.LABEL.MOUSEOUT);
        this.remove();
    };
    ComponentFocus.prototype.onClick = function (configOptions) {
        return function () {
            console.log(configOptions);
        };
    };
    ComponentFocus.prototype.remove = function () {
        this.el.on("mouseenter", null);
        this.el.on("mouseleave", null);
        this.el.on("click", null);
        this.el.remove();
    };
    return ComponentFocus;
}());
exports.default = ComponentFocus;
//# sourceMappingURL=component_focus.js.map