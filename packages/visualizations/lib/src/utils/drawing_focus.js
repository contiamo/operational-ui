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
var focus_1 = require("./focus");
var event_catalog_1 = require("./event_catalog");
var DrawingFocus = /** @class */ (function (_super) {
    __extends(DrawingFocus, _super);
    function DrawingFocus(state, stateWriter, events, el) {
        var _this = _super.call(this, state, stateWriter, events, el) || this;
        _this.events.on(event_catalog_1.default.FOCUS.ELEMENT.HOVER, _this.onElementHover());
        _this.events.on(event_catalog_1.default.FOCUS.ELEMENT.OUT, _this.onElementOut.bind(_this));
        _this.events.on(event_catalog_1.default.CHART.OUT, _this.onMouseLeave.bind(_this));
        return _this;
    }
    DrawingFocus.prototype.onElementOut = function () {
        this.remove();
    };
    DrawingFocus.prototype.onMouseLeave = function () {
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.OUT);
    };
    return DrawingFocus;
}(focus_1.default));
exports.default = DrawingFocus;
//# sourceMappingURL=drawing_focus.js.map