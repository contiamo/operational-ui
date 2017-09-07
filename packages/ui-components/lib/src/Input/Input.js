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
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: _this.props.children || "",
        };
        _this.updateValue = function (e) {
            var value = e.target.value;
            _this.setState(function () { return ({ value: value }); });
        };
        return _this;
    }
    Input.prototype.render = function () {
        var _this = this;
        return (React.createElement("input", { className: this.props.className, name: this.props.name, placeholder: this.props.placeholder, value: this.state.value, onChange: function (e) { return _this.updateValue(e); } }));
    };
    Input.defaultProps = {
        className: "",
    };
    return Input;
}(React.Component));
exports.Input = Input;
var style = function (_a) {
    var theme = _a.theme;
    return ({
        padding: theme.spacing ? theme.spacing / 2 : 8,
        border: "1px solid",
        borderColor: theme.greys ? theme.greys[30] : "#ccc",
        font: "inherit",
        WebkitAppearance: "none",
    });
};
exports.default = glamorous_1.default(Input)(style);
//# sourceMappingURL=Input.js.map