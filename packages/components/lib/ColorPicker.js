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
var react_color_1 = require("react-color");
var glamorous_1 = require("glamorous");
var Button_1 = require("./Button");
var Container = glamorous_1.default.div({
    label: "colorpicker",
    display: "inline-block",
    width: "fit-content",
    position: "relative"
});
var ColorSquare = glamorous_1.default.div({
    border: "3px solid white",
    borderRadius: 2,
    cursor: "pointer"
}, function (_a) {
    var color = _a.color, size = _a.size, theme = _a.theme;
    return ({
        width: size,
        height: size,
        boxShadow: "0 0 0 1px " + theme.colors.gray30,
        backgroundColor: color
    });
});
var PickerContainer = glamorous_1.default.div({ position: "absolute" }, function (_a) {
    var theme = _a.theme;
    return ({
        top: theme.spacing * 3.5,
        left: "50%",
        transform: "translate3d(-50%, 0, 0)",
        zIndex: theme.baseZIndex + 100
    });
});
var ColorPicker = /** @class */ (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isPickerOpen: false
        };
        _this.containerEl = null;
        // This implements "click outside to close" behavior
        _this.handleClickOutside = function (e) {
            var el = _this.containerEl;
            // if we're somehow not working with a DOM node (flowtype is fun!)
            if (!(e.target instanceof Node)) {
                return;
            }
            // if we're clicking on the ColorPicker itself,
            if (el && el.contains(e.target)) {
                return;
            }
            // if we're clicking outside,
            _this.close();
        };
        _this.handleEsc = function (e) {
            if (e.keyCode === 27) {
                _this.close();
            }
        };
        return _this;
    }
    ColorPicker.prototype.componentDidMount = function () {
        window.addEventListener("click", this.handleClickOutside, true);
        window.addEventListener("keyup", this.handleEsc, true);
    };
    ColorPicker.prototype.componentWillUnmount = function () {
        window.removeEventListener("click", this.handleClickOutside, true);
        window.removeEventListener("keyup", this.handleEsc, true);
    };
    ColorPicker.prototype.togglePicker = function () {
        this.setState(function (prevState) { return ({ isPickerOpen: !prevState.isPickerOpen }); });
    };
    ColorPicker.prototype.close = function () {
        this.setState(function () { return ({ isPickerOpen: false }); });
    };
    ColorPicker.prototype.onColorChange = function (color) {
        if (this.props.onChange) {
            this.props.onChange(color.hex);
        }
    };
    ColorPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, size = _a.size, color = _a.color;
        return (React.createElement(Container, { id: this.props.id, css: this.props.css, className: this.props.className, innerRef: function (containerEl) {
                _this.containerEl = containerEl;
            }, onClick: function () { return _this.togglePicker(); } },
            React.createElement(Button_1.default, { color: color }, color),
            this.state.isPickerOpen && (React.createElement(PickerContainer, { onClick: function (e) { return e.stopPropagation(); } },
                React.createElement(react_color_1.SketchPicker, { color: this.props.color, onChangeComplete: function (color) { return _this.onColorChange(color); } })))));
    };
    ColorPicker.defaultProps = {
        color: "#03f",
        size: 16
    };
    return ColorPicker;
}(React.Component));
exports.default = ColorPicker;
//# sourceMappingURL=ColorPicker.js.map