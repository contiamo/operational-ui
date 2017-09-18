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
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var SideNavigationHeader = /** @class */ (function (_super) {
    __extends(SideNavigationHeader, _super);
    function SideNavigationHeader(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            open: false,
            value: { id: -1, label: "" }
        };
        return _this;
    }
    SideNavigationHeader.prototype.componentDidMount = function () {
        var _this = this;
        this.setState(function () { return ({ value: _this.getDefaultValue() }); });
    };
    SideNavigationHeader.prototype.getDefaultValue = function () {
        return this.props.options.find(function (option) { return option.default === true; }) || this.props.options[0];
    };
    SideNavigationHeader.prototype.toggle = function () {
        if (this.props.options.length === 0) {
            return;
        }
        this.setState(function (prevState) { return ({ open: !prevState.open }); });
    };
    SideNavigationHeader.prototype.onChange = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.props.onChange) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.props.onChange()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.setState(function (prevState) { return (__assign({}, prevState, { value: option })); });
                        return [2 /*return*/];
                }
            });
        });
    };
    SideNavigationHeader.prototype.getDropdown = function () {
        var _this = this;
        return (React.createElement("div", { className: "SideNavigationHeader__options" }, this.props.options.map(function (option) { return (React.createElement("div", { key: option.id, className: "SideNavigationHeader__option", onClick: function () { return _this.onChange(option); }, tabIndex: option.id * -1, "aria-selected": _this.state.value === option, role: "option" }, option.label)); })));
    };
    SideNavigationHeader.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: this.props.className + " SideNavigationHeader", onClick: function () { return _this.toggle(); }, tabIndex: -1, role: "listbox" },
            this.props.children,
            this.state.value && React.createElement("div", { className: "SideNavigationHeader__value" }, this.state.value.label),
            this.props.options.length > 0 && this.state.open && this.getDropdown()));
    };
    SideNavigationHeader.defaultProps = {
        options: []
    };
    return SideNavigationHeader;
}(React.Component));
exports.SideNavigationHeader = SideNavigationHeader;
var style = function (_a) {
    var theme = _a.theme, options = _a.options;
    return {
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderBottom: "1px solid rgba(255, 255, 255, .1)",
        padding: theme.spacing,
        cursor: options && options.length ? "pointer" : "default",
        backgroundColor: "inherit",
        // Caret
        "&::after": {
            content: options && options.length ? '""' : "none",
            position: "absolute",
            top: "50%",
            right: theme.spacing,
            width: 0,
            height: 0,
            opacity: 0,
            transform: "translateY(-50%)",
            animation: contiamo_ui_utils_1.fadeIn + " .3s .3s ease forwards",
            border: "4px solid transparent",
            borderTopColor: "white"
        },
        "& .SideNavigationHeader__value": {
            width: "fit-content",
            whiteSpace: "pre"
        },
        "& .SideNavigationHeader__options": {
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: theme.baseZIndex * 1000,
            width: "100%",
            minWidth: "fit-content",
            boxShadow: "0 6px 18px -3px rgba(0, 0, 0, .5)",
            backgroundColor: "inherit"
        },
        "& .SideNavigationHeader__option": {
            padding: theme.spacing,
            minWidth: "fit-content",
            whiteSpace: "pre",
            cursor: "pointer"
        },
        "& .SideNavigationHeader__option:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.07)"
        }
    };
};
exports.default = glamorous_1.default(SideNavigationHeader)(style);
//# sourceMappingURL=SideNavigationHeader.js.map