"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodes_1 = require("./renderers/nodes");
var links_1 = require("./renderers/links");
var Renderer = /** @class */ (function () {
    function Renderer(state, events, el) {
        this.el = el;
        this.links = new links_1.default(state, events, el);
        this.nodes = new nodes_1.default(state, events, el);
    }
    Renderer.prototype.draw = function (data) {
        this.links.draw(data.links);
        this.nodes.draw(data.nodes);
    };
    Renderer.prototype.close = function () {
        this.el.node().innerHTML = "";
    };
    return Renderer;
}());
exports.default = Renderer;
//# sourceMappingURL=renderer.js.map