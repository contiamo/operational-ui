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
var glamorous_1 = require("glamorous");
var Tooltip_style_1 = require("./Tooltip/Tooltip.style");
exports.style = Tooltip_style_1.default;
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            style: {
                position: "absolute"
            }
        };
        return _this;
    }
    Tooltip.prototype.componentDidMount = function () {
        if (this.props.betaFixOverflow) {
            var position_1 = this.getPosition();
            this.setState(function () { return ({
                style: position_1
            }); });
        }
    };
    Tooltip.prototype.getPosition = function () {
        var rect = this.tooltip.getBoundingClientRect();
        var top = rect.top;
        /**
          The following style properties can only properly be set
          after the component mounts.
    
          Please read the description of this component at the top of the file
          if you haven't already to find out why.
          */
        var position = {
            top: top,
            position: "fixed",
            transform: "none",
            bottom: this.props.anchor === "bottom" ? "auto" : null,
            left: (rect && rect.left) || 0
        };
        return position;
    };
    Tooltip.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { ref: function (tooltip) { return (_this.tooltip = tooltip || document.createElement("div")); }, className: this.props.className + " Tooltip" + (this.props.active ? " active" : ""), style: this.state.style }, this.props.children));
    };
    Tooltip.defaultProps = {
        anchor: "top",
        active: false
    };
    return Tooltip;
}(React.Component));
exports.Tooltip = Tooltip;
exports.default = glamorous_1.default(Tooltip)(Tooltip_style_1.default);
//# sourceMappingURL=Tooltip.js.map