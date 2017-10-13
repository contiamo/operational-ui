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
var hasTheme = function (theme) { return theme && Object.keys(theme).length > 0; };
var Container = glamorous_1.default.div({});
var ColorSquare = glamorous_1.default.div({
    border: "3px solid white",
    borderRadius: 2,
    cursor: "pointer"
}, function (_a) {
    var color = _a.color, size = _a.size, theme = _a.theme;
    // Need to check this because the tests run without a ThemeProvider
    // Otherwise, tests could not access the state of ColorPicker.
    return hasTheme(theme)
        ? {
            width: size,
            height: size,
            boxShadow: "0 0 0 1px " + theme.colors.palette.grey30,
            backgroundColor: color
        }
        : {};
});
var PickerContainer = glamorous_1.default.div({
    position: "fixed"
}, function (_a) {
    var top = _a.top, left = _a.left, theme = _a.theme;
    // Need to check this because the tests run without a ThemeProvider
    // Otherwise, tests could not access the state of ColorPicker.
    return hasTheme(theme)
        ? {
            top: top + 8,
            left: left + 8,
            zIndex: theme.baseZIndex + 100
        }
        : {};
});
var ColorPicker = /** @class */ (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isPickerOpen: false,
            position: {
                top: 0,
                left: 0
            }
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
        var _this = this;
        this.setState(function () { return ({ position: _this.containerEl.getBoundingClientRect() }); });
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
        var _a = this.props, size = _a.size, color = _a.color, css = _a.css, className = _a.className;
        return (React.createElement(Container, { css: css, className: className, innerRef: function (containerEl) {
                _this.containerEl = containerEl;
            }, onClick: function () { return _this.togglePicker(); } },
            React.createElement(ColorSquare, { size: size, color: color }),
            this.state.isPickerOpen && (React.createElement(PickerContainer, { top: this.state.position.top, left: this.state.position.left, onClick: function (e) { return e.stopPropagation(); } },
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