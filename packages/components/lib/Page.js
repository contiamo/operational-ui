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
var glamorous_1 = require("glamorous");
var Button_1 = require("./Button");
var Icon_1 = require("./Icon");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "page-content",
        backgroundColor: theme.colors.white,
        padding: "0px " + theme.spacing * 1.5 + "px",
        overflow: "auto",
        height: "100%",
    });
});
var TopBar = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        height: theme.box,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    });
});
var TitleBar = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.title, { display: "flex", alignItems: "center", justifyContent: "flex-start", marginTop: 0.5 * theme.spacing, marginBottom: 2 * theme.spacing }));
});
var ControlsContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        marginLeft: theme.spacing,
        "& > :last-child": {
            marginRight: 0,
        },
    });
});
var BackLinkContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        marginTop: theme.spacing / 2,
        marginBottom: theme.spacing,
        opacity: 0.5,
        "& svg": {
            marginRight: 4,
            position: "relative",
            top: 2,
            left: -1,
        },
    });
});
var Page = function (props) { return (React.createElement(Container, null,
    React.createElement(TopBar, null, props.breadcrumbs),
    props.__experimentalBackLink ? (React.createElement(BackLinkContainer, null,
        React.createElement("a", { href: props.__experimentalBackLink.url, onClick: function (ev) {
                // Only pushstate routing is supported (experimental feature)
                ev.preventDefault();
                props.__experimentalBackLink.onClick && props.__experimentalBackLink.onClick();
            } },
            React.createElement(Button_1.default, { condensed: true },
                React.createElement(Icon_1.default, { name: "ChevronLeft", size: 12 }),
                props.__experimentalBackLink.label || "Back")))) : null,
    React.createElement(TitleBar, null,
        props.title,
        React.createElement(ControlsContainer, null, props.controls)),
    props.children)); };
exports.default = Page;
//# sourceMappingURL=Page.js.map