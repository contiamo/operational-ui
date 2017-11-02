"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_focus_1 = require("./abstract_focus");
var event_catalog_1 = require("./event_catalog");
var AbstractDrawingFocus = /** @class */ (function (_super) {
    __extends(AbstractDrawingFocus, _super);
    function AbstractDrawingFocus(state, stateWriter, events, el) {
        var _this = _super.call(this, state, stateWriter, events, el) || this;
        _this.events.on(event_catalog_1.default.FOCUS.ELEMENT.HOVER, _this.onElementHover());
        _this.events.on(event_catalog_1.default.FOCUS.ELEMENT.OUT, _this.onElementOut());
        _this.events.on(event_catalog_1.default.CHART.OUT, _this.onMouseLeave());
        return _this;
    }
    AbstractDrawingFocus.prototype.onElementOut = function () {
        var _this = this;
        return function () {
            _this.remove();
        };
    };
    AbstractDrawingFocus.prototype.onMouseLeave = function () {
        var _this = this;
        return function () {
            _this.remove();
        };
    };
    return AbstractDrawingFocus;
}(abstract_focus_1.default));
exports.default = AbstractDrawingFocus;
//# sourceMappingURL=abstract_drawing_focus.js.map