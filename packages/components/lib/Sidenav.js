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
var React = require("react");
var glamorous_1 = require("glamorous");
var utils_1 = require("@operational/utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, fix = _a.fix, expanded = _a.expanded, expandOnHover = _a.expandOnHover, expandedWidth = _a.expandedWidth, width = _a.width;
    var backgroundColor = color ? utils_1.hexOrColor(color)(theme.colors[color]) : theme.colors.sidenavBackground;
    var hoverWidth = expandOnHover
        ? {
            transition: ".3s width cubic-bezier(.8, 0, 0, 1)",
            willChange: "width",
            "&:hover": {
                width: expandedWidth
            }
        }
        : {};
    return __assign({ backgroundColor: backgroundColor, width: expanded ? expandedWidth : width, zIndex: theme.baseZIndex + 100, display: "flex", flexDirection: "column", alignItems: "flex-start", height: "100vh", overflowY: "auto", overflowX: "hidden", boxShadow: "1px 0 2px rgba(0, 0, 0, 0.2)", color: utils_1.readableTextColor(backgroundColor)(["black", "white"]) }, hoverWidth, { "& a:focus": {
            outline: 0
        } });
});
var Sidenav = /** @class */ (function (_super) {
    __extends(Sidenav, _super);
    function Sidenav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isHovered: false
        };
        return _this;
    }
    Sidenav.prototype.render = function () {
        var _this = this;
        return (React.createElement(Container, { key: this.props.id, css: this.props.css, className: this.props.className, color: this.props.color, expandOnHover: this.props.expandOnHover, expandedWidth: this.props.expandedWidth || 240, expanded: this.props.expanded, onMouseEnter: function () {
                _this.setState(function (prevState) { return ({
                    isHovered: true
                }); });
            }, onMouseLeave: function () {
                _this.setState(function (prevState) { return ({
                    isHovered: false
                }); });
            }, width: this.props.width || 60 }, this.props.children));
    };
    return Sidenav;
}(React.Component));
exports.default = Sidenav;
//# sourceMappingURL=Sidenav.js.map