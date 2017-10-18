"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var layout_1 = require("./layout");
var nodes_1 = require("./renderers/nodes");
var links_1 = require("./renderers/links");
var Renderer = /** @class */ (function () {
    function Renderer(state, events, el) {
        this.state = state;
        this.el = el;
        this.layout = new layout_1.default(state);
        this.links = new links_1.default(state, events, el);
        this.nodes = new nodes_1.default(state, events, el);
    }
    Renderer.prototype.draw = function () {
        this.layout.computeLayout();
        this.positionNodes();
        this.links.draw(this.layout.links);
        this.nodes.draw(this.layout.nodes);
    };
    Renderer.prototype.positionNodes = function () {
        var nodesByRow = fp_1.groupBy("y")(this.layout.nodes);
        var rows = Object.keys(nodesByRow), xValues = fp_1.map(function (node) { return node.x; })(this.layout.nodes), maxX = Math.max.apply(Math, xValues), config = this.state.current.get("config"), xGridSpacing = config.width / (maxX + 1), yGridSpacing = config.height / (rows.length + 1);
        // Assign y values
        fp_1.forEach(function (node) {
            node.y = (node.y + 1) * yGridSpacing;
        })(this.layout.nodes);
        fp_1.forEach(function (row) {
            fp_1.flow(fp_1.sortBy(function (node) { return node.x; }), fp_1.forEach(function (node) {
                node.x *= xGridSpacing;
            }))(nodesByRow[parseInt(row, 10)]);
        })(rows);
    };
    Renderer.prototype.close = function () {
        this.el.node().innerHTML = "";
    };
    return Renderer;
}());
exports.default = Renderer;
//# sourceMappingURL=renderer.js.map