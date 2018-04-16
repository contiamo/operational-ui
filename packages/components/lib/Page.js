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
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "page-content",
        backgroundColor: theme.colors.white,
        padding: "0px " + theme.spacing * 1.5 + "px",
        overflow: "auto",
        height: "100%"
    });
});
var TopBar = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        height: theme.box,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    });
});
var TitleBar = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.title, { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 * theme.spacing }));
});
var ControlsContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        "& > :last-child": {
            marginRight: 0
        }
    });
});
var Page = function (props) { return (React.createElement(Container, null,
    React.createElement(TopBar, null,
        props.breadcrumbs,
        React.createElement(ControlsContainer, null, props.controls)),
    React.createElement(TitleBar, null, props.title),
    props.children)); };
exports.default = Page;
//# sourceMappingURL=Page.js.map