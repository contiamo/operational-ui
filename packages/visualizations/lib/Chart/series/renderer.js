"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var area_1 = require("./renderers/area");
var bars_1 = require("./renderers/bars");
var flag_1 = require("./renderers/flag");
var line_1 = require("./renderers/line");
var symbol_1 = require("./renderers/symbol");
var text_1 = require("./renderers/text");
var Renderer = /** @class */ (function () {
    function Renderer(state, events, el, data, options, series) {
        switch (options.type) {
            case "area":
                return new area_1.default(state, events, el.select("g.series-area"), data, options, series);
            case "bars":
                return new bars_1.default(state, events, el.select("g.series-bars"), data, options, series);
            case "flag":
                return new flag_1.default(state, events, el.select("g.series-flag"), data, options, series);
            case "line":
                return new line_1.default(state, events, el.select("g.series-line"), data, options, series);
            case "symbol":
                return new symbol_1.default(state, events, el.select("g.series-symbol"), data, options, series);
            case "text":
                return new text_1.default(state, events, el.select("g.series-text"), data, options, series);
        }
    }
    return Renderer;
}());
exports.default = Renderer;
//# sourceMappingURL=renderer.js.map