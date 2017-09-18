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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_color_1 = require("react-color");
var glamorous_1 = require("glamorous");
var ColorSquare = glamorous_1.default.div({
    border: "3px solid white",
    borderRadius: 2,
    cursor: "pointer",
}, function (_a) {
    var color = _a.color, size = _a.size, theme = _a.theme;
    return ({
        width: size,
        height: size,
        boxShadow: "0 0 0 1px " + theme.greys["30"],
        backgroundColor: color,
    });
});
var PickerContainer = glamorous_1.default.div({
    position: "fixed",
}, function (_a) {
    var top = _a.top, left = _a.left, theme = _a.theme;
    return ({
        top: top + 8,
        left: left + 8,
        zIndex: (theme.baseZIndex || 1) * 1000,
    });
});
var ColorPicker = /** @class */ (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isPickerOpen: false,
            color: _this.props.color,
            position: {
                top: 0,
                left: 0,
            },
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.props.onChange) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.props.onChange(color)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.setState(function () { return ({ color: "rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")" }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    ColorPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, size = _a.size, theme = _a.theme, color = _a.color;
        return (React.createElement("div", { ref: function (containerEl) { return (_this.containerEl = containerEl); }, onClick: function () { return _this.togglePicker(); } },
            React.createElement(ColorSquare, { size: size, theme: theme, color: this.state.color }),
            this.state.isPickerOpen && (React.createElement(PickerContainer, { top: this.state.position.top, left: this.state.position.left, onClick: function (e) { return e.stopPropagation(); } },
                React.createElement(react_color_1.SketchPicker, { color: this.state.color, onChangeComplete: function (color) { return _this.onColorChange(color); } })))));
    };
    ColorPicker.defaultProps = {
        color: "#03f",
        size: 16,
    };
    return ColorPicker;
}(React.Component));
exports.default = ColorPicker;
//# sourceMappingURL=ColorPicker.js.map