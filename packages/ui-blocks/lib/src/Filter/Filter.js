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
var React = require("react");
var contiamo_ui_components_1 = require("contiamo-ui-components");
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Filter.prototype.render = function () {
        var children = this.props.children;
        return (React.createElement("div", null,
            React.createElement(contiamo_ui_components_1.Chip, null, "Testfilter = 2"),
            children));
    };
    return Filter;
}(React.Component));
exports.default = Filter;
//# sourceMappingURL=Filter.js.map