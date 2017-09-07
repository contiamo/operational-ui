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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// @flow
var react_1 = require("react");
{
    ComponentType;
}
from;
"react";
var Tooltip_1 = require("./Tooltip");
var withTooltip = function (InputComponent) { return _a = /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                isTooltipActive: false
            };
            return _this;
        }
        class_1.prototype.showTooltip = function () {
            this.setState(function () { return ({ isTooltipActive: true }); });
        };
        class_1.prototype.hideTooltip = function () {
            this.setState(function () { return ({ isTooltipActive: false }); });
        };
        class_1.prototype.render = function () {
            var _this = this;
            return (react_1.default.createElement(InputComponent, __assign({}, this.props, { onMouseEnter: function () { return _this.showTooltip(); }, onMouseLeave: function () { return _this.hideTooltip(); }, role: this.props.role || "status", tabIndex: this.props.tabIndex || -1 }),
                this.props.children ? this.props.children : "",
                this.props.tooltip && this.state.isTooltipActive
                    ? react_1.default.createElement(Tooltip_1.default, { active: true, color: this.props.tooltipColor, anchor: this.props.tooltipAnchor }, this.props.tooltip)
                    : ""));
        };
        return class_1;
    }(react_1.Component)),
    _a.defaultProps = {
        tooltipAnchor: "top"
    },
    _a; var _a; };
exports.default = withTooltip;
//# sourceMappingURL=withTooltip.js.map