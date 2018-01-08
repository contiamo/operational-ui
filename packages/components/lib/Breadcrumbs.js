"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div({
    "& a": {
        textDecoration: "none",
        color: "inherit"
    }
});
var Breadcrumbs = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({});
});
var Divider = glamorous_1.default.span(function (_a) {
    var theme = _a.theme;
    return ({
        display: "inline-block",
        margin: "0 6px",
        color: theme.colors.black
    });
});
exports.default = function (props) { return (React.createElement(Container, { className: props.className, css: props.css }, (function () {
    /* This IIFE adds the divider elements containing slashes between children, e.g:
     * <Breadcrumb>1</Breadcrumb> <Breadcrumb>2</Breadcrumb> -> <span>1</span> <span>/</span> <span>2</span>
     */
    var newChildren = [];
    var childrenCount = React.Children.count(props.children);
    React.Children.forEach(props.children, function (child, index) {
        newChildren.push(child);
        if (index < childrenCount - 1) {
            newChildren.push(React.createElement(Divider, { key: "breadcrumbdivider-" + index }, "/"));
        }
    });
    return newChildren;
})())); };
//# sourceMappingURL=Breadcrumbs.js.map