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
var constants_1 = require("../constants");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, fix = _a.fix, expanded = _a.expanded, expandOnHover = _a.expandOnHover;
    var backgroundColor = theme.colors.navBackground;
    var lighterBackgroundColor = utils_1.lighten(theme.colors.navBackground, 8);
    var color = utils_1.readableTextColor(backgroundColor, [theme.colors.text, theme.colors.white]);
    var expandOnHoverStyles = expandOnHover
        ? {
            transition: ".3s width cubic-bezier(.8, 0, 0, 1)",
            willChange: "width",
            overflow: "hidden",
            ":hover": {
                width: constants_1.sidenavExpandedWidth,
                overflow: "auto",
            },
        }
        : {};
    return __assign({ color: color, background: "linear-gradient(to bottom right, " + backgroundColor + ", " + lighterBackgroundColor + ")", label: "sidenav", width: expanded ? constants_1.sidenavExpandedWidth : theme.box, zIndex: theme.baseZIndex + 100, display: "flex", flexDirection: "column", alignItems: "flex-start", height: "100%" }, expandOnHoverStyles, { "& a:focus": {
            outline: 0,
        }, "& > a:link, & > a:visited": {
            width: "100%",
            display: "block",
            textDecoration: "none",
            color: "inherit",
        } });
});
var Sidenav = /** @class */ (function (_super) {
    __extends(Sidenav, _super);
    function Sidenav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isHovered: false,
        };
        return _this;
    }
    Sidenav.prototype.render = function () {
        var _this = this;
        return (React.createElement(Container, { id: this.props.id, css: this.props.css, className: this.props.className, expandOnHover: this.props.expandOnHover, expanded: this.props.expanded, onMouseEnter: function () {
                _this.setState(function (prevState) { return ({
                    isHovered: true,
                }); });
            }, onMouseLeave: function () {
                _this.setState(function (prevState) { return ({
                    isHovered: false,
                }); });
            } }, this.props.children));
    };
    return Sidenav;
}(React.Component));
exports.default = Sidenav;
//# sourceMappingURL=Sidenav.js.map