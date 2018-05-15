"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodes_1 = require("./renderers/nodes");
var links_1 = require("./renderers/links");
var event_catalog_1 = require("../utils/event_catalog");
var fp_1 = require("lodash/fp");
var styles = require("./renderers/styles");
var d3_utils_1 = require("../utils/d3_utils");
var d3 = require("d3-selection");
var Renderer = /** @class */ (function () {
    function Renderer(state, events, el) {
        this.events = events;
        this.el = el;
        this.links = new links_1.default(state, events, el);
        this.nodes = new nodes_1.default(state, events, el);
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.HIGHLIGHT, this.focusElement.bind(this));
    }
    Renderer.prototype.draw = function (data) {
        this.links.draw(data.links);
        this.nodes.draw(data.nodes);
    };
    Renderer.prototype.focusElement = function (focusElement) {
        switch (focusElement.type) {
            case "path":
                this.highlightPath(focusElement);
                break;
            case "node":
                this.nodes.focusElement(focusElement);
                break;
            case "link":
                this.links.focusElement(focusElement);
                break;
        }
    };
    Renderer.prototype.highlightPath = function (focusElement) {
        var _this = this;
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.OUT);
        var path = focusElement.matchers.path;
        var links = fp_1.zip(fp_1.initial(path))(fp_1.tail(path));
        fp_1.forEach(function (link) {
            _this.el
                .selectAll("path.link." + styles.element)
                .filter(function (d) { return d.sourceId() === link[0] && d.targetId() === link[1]; })
                .each(d3_utils_1.withD3Element(function (d, el) {
                _this.links.highlight(d3.select(el), d, true);
            }));
        })(links);
    };
    Renderer.prototype.close = function () {
        this.el.node().innerHTML = "";
    };
    return Renderer;
}());
exports.default = Renderer;
//# sourceMappingURL=renderer.js.map