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
var glamorous_1 = require("glamorous");
var SidebarItem_style_1 = require("./SidebarItem.style");
var SidebarItem = /** @class */ (function (_super) {
    __extends(SidebarItem, _super);
    function SidebarItem(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            open: _this.props && _this.props.open,
            updating: false
        };
        return _this;
    }
    SidebarItem.prototype.toggle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.props.children) {
                            return [2 /*return*/, false];
                        }
                        this.setState(function () { return ({ updating: true }); });
                        if (!(typeof this.props.onClick === "function" && !this.state.open)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.props.onClick()]; // wait for the promise to resolve first.
                    case 1:
                        _a.sent(); // wait for the promise to resolve first.
                        _a.label = 2;
                    case 2:
                        this.setState(function (prevState) { return ({
                            open: !prevState.open,
                            updating: false
                        }); });
                        return [2 /*return*/, true];
                }
            });
        });
    };
    SidebarItem.prototype.render = function () {
        var _this = this;
        /**
          Only the header should have a tooltip, else the tooltip will show
          even when the cursor is over the children... who may also have their
          own tooltips.
        */
        var HeaderWithTooltip = glamorous_1.Div;
        return (React.createElement("div", { className: this.props.className + " " + (this.state.updating ? "updating" : "") + " " + (this.state.open ? "open" : "") },
            React.createElement("div", { className: "header " + (this.state.open ? "open" : ""), onClick: function () { return _this.toggle(); } }, this.props.label),
            this.state.open ? React.createElement("div", { className: "content" }, this.props.children) : ""));
    };
    SidebarItem.defaultProps = {
        open: false
    };
    return SidebarItem;
}(React.Component));
exports.SidebarItem = SidebarItem;
exports.default = glamorous_1.default(SidebarItem)(SidebarItem_style_1.default);
//# sourceMappingURL=SidebarItem.js.map