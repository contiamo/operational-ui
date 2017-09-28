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
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Tab_1 = require("./Tab/Tab");
exports.Tab = Tab_1.default;
var Container = glamorous_1.default.div({});
var Content = glamorous_1.default.div({
    marginTop: 18
});
var TabList = glamorous_1.default.ul({
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    position: "relative",
    border: "none",
    "&:after": {
        position: "absolute",
        display: "block",
        content: " ",
        width: "100%",
        height: 1,
        left: 0,
        bottom: 0,
        background: "red",
        zIndex: 1
    },
    "> *:not(:last-child)": {
        marginRight: 20
    }
}, function (_a) {
    var theme = _a.theme;
    return ({
        "&:after": {
            background: contiamo_ui_utils_1.darken(theme.colors.palette.grey20)(6)
        }
    });
});
var TabPanel = glamorous_1.default.div({});
var overflowEllipsis = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    wordWrap: "normal"
};
var TabTitle = glamorous_1.default.li({
    cursor: "pointer",
    flex: "0 0 auto",
    listStyle: "none",
    maxWidth: "100%",
    position: "relative",
    transition: "all 250ms ease",
    padding: "5px 15px",
    zIndex: 10
}, function (_a) {
    var theme = _a.theme, color = _a.color, isActive = _a.isActive, disabled = _a.disabled;
    return (__assign({}, theme.typography.body, overflowEllipsis, { fontSize: theme.typography.body.fontSize * 1.1, borderBottom: "2px solid transparent" }, isActive
        ? {
            color: color,
            borderColor: color
        }
        : {}, disabled
        ? {
            color: theme.colors.palette.grey60,
            cursor: "not-allowed"
        }
        : {}, !disabled
        ? {
            "&:hover": {
                color: color
            }
        }
        : {}));
});
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tabs.prototype.componentWillMount = function () {
        var _a = this.props, activeColor = _a.activeColor, children = _a.children;
        this.data = React.Children.map(children, function (child, index) { return (__assign({}, child.props, { activeColor: activeColor,
            index: index })); });
    };
    Tabs.prototype.renderTabs = function () {
        var _a = this.props, active = _a.active, activeColor = _a.activeColor, onChange = _a.onChange, theme = _a.theme;
        var color = contiamo_ui_utils_1.hexOrColor(activeColor)(theme.colors.palette[activeColor] || theme.colors.palette.info);
        return this.data.map(function (_a) {
            var disabled = _a.disabled, index = _a.index, title = _a.title;
            return (React.createElement(TabTitle, { color: color, disabled: disabled, isActive: active === index && !disabled, key: index, onClick: function () {
                    if (!disabled)
                        onChange(index);
                } }, title));
        });
    };
    Tabs.prototype.renderPanel = function () {
        var _this = this;
        var _a = this.data.find(function (_a) {
            var index = _a.index;
            return index === _this.props.active;
        }), children = _a.children, disabled = _a.disabled;
        return disabled ? null : React.createElement(TabPanel, null, children);
    };
    Tabs.prototype.render = function () {
        return (React.createElement(Container, null,
            React.createElement(TabList, null, this.renderTabs()),
            React.createElement(Content, null, this.renderPanel())));
    };
    Tabs.defaultProps = {
        active: 0,
        activeColor: "info",
        onChange: function () { }
    };
    return Tabs;
}(React.Component));
exports.Tabs = Tabs;
exports.default = glamorous_1.withTheme(Tabs);
//# sourceMappingURL=Tabs.js.map