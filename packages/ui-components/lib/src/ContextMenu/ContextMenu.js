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
var ContextMenuItem_1 = require("./ContextMenuItem");
exports.ContextMenuItem = ContextMenuItem_1.default;
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        position: "relative",
        width: "fit-content",
        margin: theme.spacing * 2
    });
});
var MenuContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, isExpanded = _a.isExpanded;
    return (__assign({ position: "absolute", top: "100%", left: "0%", boxShadow: theme.shadows.popup, width: "fit-content" }, isExpanded ? { display: "block", animation: contiamo_ui_utils_1.fadeIn + " ease-in-out forwards 0.2s" } : { display: "none" }));
});
var ContextMenu = /** @class */ (function (_super) {
    __extends(ContextMenu, _super);
    function ContextMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isHovered: false,
            isActive: false
        };
        return _this;
    }
    ContextMenu.prototype.handleClick = function (ev) {
        var newIsActive = this.menuContainerNode.contains(ev.target)
            ? this.state.isActive
            : this.containerNode.contains(ev.target) ? !this.state.isActive : false;
        this.setState(function (prevState) { return ({ isActive: newIsActive }); });
    };
    ContextMenu.prototype.componentDidMount = function () {
        document.addEventListener("click", this.handleClick.bind(this));
    };
    ContextMenu.prototype.componentWillUnmount = function () {
        document.removeEventListener("click", this.handleClick.bind(this));
    };
    ContextMenu.prototype.render = function () {
        var _this = this;
        var menuItems = [];
        var children = [];
        React.Children.forEach(this.props.children, function (child) {
            if (child.type === ContextMenuItem_1.default) {
                menuItems.push(child);
            }
            else {
                children.push(child);
            }
        });
        var hoverProps = this.props.expandOnHover
            ? {
                onMouseEnter: function (ev) {
                    _this.setState(function (prevState) { return ({ isHovered: true }); });
                },
                onMouseLeave: function (ev) {
                    _this.setState(function (prevState) { return ({ isHovered: false }); });
                }
            }
            : {};
        return (React.createElement(Container, __assign({ innerRef: function (node) {
                _this.containerNode = node;
            }, key: this.props.key, css: this.props.css, className: this.props.className }, hoverProps),
            children,
            React.createElement(MenuContainer, { innerRef: function (node) {
                    _this.menuContainerNode = node;
                }, isExpanded: this.state.isActive || this.state.isHovered }, menuItems)));
    };
    return ContextMenu;
}(React.Component));
exports.default = ContextMenu;
//# sourceMappingURL=ContextMenu.js.map