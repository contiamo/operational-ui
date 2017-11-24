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
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, hasOptions = _a.hasOptions;
    return ({
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: 50,
        flex: "0 0 50px",
        borderBottom: "1px solid rgba(255, 255, 255, .1)",
        cursor: hasOptions ? "pointer" : "default",
        backgroundColor: "inherit",
        // Caret
        "&::after": {
            content: hasOptions ? '""' : "none",
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
        }
    });
});
var Options = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        position: "absolute",
        top: "100%",
        left: 0,
        zIndex: theme.baseZIndex + 100,
        width: "100%",
        minWidth: "fit-content",
        boxShadow: "0 6px 18px -3px rgba(0, 0, 0, .5)",
        backgroundColor: "inherit"
    });
});
var Option = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        padding: theme.spacing,
        minWidth: "fit-content",
        whiteSpace: "pre",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.07)"
        }
    });
});
var Value = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        width: "fit-content",
        whiteSpace: "pre"
    });
});
var SideNavigationHeader = /** @class */ (function (_super) {
    __extends(SideNavigationHeader, _super);
    function SideNavigationHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false
        };
        return _this;
    }
    SideNavigationHeader.prototype.toggle = function () {
        if (this.props.options.length === 0) {
            return;
        }
        this.setState(function (prevState) { return ({ isOpen: !prevState.isOpen }); });
    };
    SideNavigationHeader.prototype.onChange = function (option) {
        if (this.props.onChange) {
            this.props.onChange(option);
        }
    };
    SideNavigationHeader.prototype.labelFor = function (value) {
        var option = this.props.options.find(function (option) { return option.value === value; });
        return option ? option.label : value;
    };
    SideNavigationHeader.prototype.displayDropdown = function () {
        var _this = this;
        var _a = this.props, options = _a.options, value = _a.value;
        return (React.createElement(Options, null, options.map(function (option) { return (React.createElement(Option, { key: option.id, onClick: function () { return _this.onChange(option); }, tabIndex: option.id * -1, "aria-selected": option.value === value, role: "option" }, option.label)); })));
    };
    SideNavigationHeader.prototype.render = function () {
        var _this = this;
        var _a = this.props, id = _a.id, css = _a.css, className = _a.className, options = _a.options, value = _a.value, children = _a.children;
        return (React.createElement(Container, { key: id, css: css, className: className, hasOptions: options && options.length > 0, onClick: function () { return _this.toggle(); }, tabIndex: -1, role: "listbox" },
            children,
            value ? React.createElement(Value, null, this.labelFor(value)) : null,
            options.length > 0 && this.state.isOpen ? this.displayDropdown() : null));
    };
    SideNavigationHeader.defaultProps = {
        options: []
    };
    return SideNavigationHeader;
}(React.Component));
exports.default = SideNavigationHeader;
//# sourceMappingURL=SideNavigationHeader.js.map