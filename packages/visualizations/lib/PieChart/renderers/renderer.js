"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var donut_1 = require("./donut");
var polar_1 = require("./polar");
var gauge_1 = require("./gauge");
// Factory Class
var Renderer = /** @class */ (function () {
    function Renderer(state, events, el, options) {
        switch (options.type) {
            case "donut":
                return new donut_1.default(state, events, el, options);
            case "polar":
                return new polar_1.default(state, events, el, options);
            case "gauge":
                return new gauge_1.default(state, events, el, options);
            default:
                throw new Error("invalid render type '" + options.type + "' specified");
        }
    }
    return Renderer;
}());
exports.default = Renderer;
//# sourceMappingURL=renderer.js.map