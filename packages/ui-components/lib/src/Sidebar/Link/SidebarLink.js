"use strict";
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
var react_router_dom_1 = require("react-router-dom");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var style = function (_a) {
    var theme = _a.theme, color = _a.color, disabled = _a.disabled, active = _a.active;
    var backgroundColor = color ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette && theme.colors.palette[color]) : "#fff", textColor = contiamo_ui_utils_1.readableTextColor(backgroundColor)([theme.colors.palette.grey80, "white"]), disabledStyle = disabled ? { opacity: 0.25 } : { opacity: 1 };
    return __assign({ position: "relative", display: "flex", padding: theme.spacing / 1.5 + "px " + theme.spacing + "px", transition: "background-color .1s ease", cursor: "pointer", 
        // react-router <Link /> wraps an <a> which can be underlined by default so
        textDecoration: "none", color: active ? theme.colors.palette.primary : textColor, backgroundColor: backgroundColor }, disabledStyle, { "&:link, &:visited": {
            color: textColor,
        }, "&.SideNavigationLink + .SideNavigationLink": {
            borderTop: "1px solid",
            borderColor: theme.colors.usage.subContentSeparatorLine,
        }, ":hover": {
            backgroundColor: contiamo_ui_utils_1.darken(backgroundColor)(2),
            // The text color needs to change too if it gets too dark 😁
            // Also, here's a prime benefit of functional JS: function composition!
            color: contiamo_ui_utils_1.readableTextColor(contiamo_ui_utils_1.darken(backgroundColor)(5))(["black", "white"]),
        }, 
        // Symbol goes on the right.
        "& > .symbol": {
            marginLeft: "auto",
        } });
};
exports.style = style;
var SidebarLink = function (_a) {
    var className = _a.className, children = _a.children, to = _a.to, onClick = _a.onClick, symbol = _a.symbol;
    // if this is expected to work with react-router,
    if (to) {
        return (React.createElement(react_router_dom_1.Link, { to: to ? to : "", className: className + " SideNavigationLink" },
            children,
            symbol ? React.createElement("div", { className: "symbol" }, symbol) : ""));
    }
    return (React.createElement("div", { onClick: onClick, className: className + " SideNavigationLink" },
        children,
        symbol ? React.createElement("div", { className: "symbol" }, symbol) : ""));
};
exports.SidebarLink = SidebarLink;
exports.default = glamorous_1.default(SidebarLink)(style);
//# sourceMappingURL=SidebarLink.js.map