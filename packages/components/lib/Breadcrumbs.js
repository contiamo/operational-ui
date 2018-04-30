"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div({
    label: "breadcrumbs",
    "& a": {
        textDecoration: "none",
        color: "inherit",
    },
});
var Divider = glamorous_1.default.span(function (_a) {
    var theme = _a.theme;
    return ({
        display: "inline-block",
        margin: "0 " + theme.spacing / 2 + "px",
        color: theme.colors.gray,
    });
});
var Breadcrumbs = function (props) { return (React.createElement(Container, { className: props.className, css: props.css }, (function () {
    /* This IIFE adds the divider elements containing slashes between children, e.g:
     * <Breadcrumb>1</Breadcrumb> <Breadcrumb>2</Breadcrumb> -> <span>1</span> <span>/</span> <span>2</span>
     */
    var newChildren = [
        React.createElement(Divider, { key: "breadcrumbdivider-leading" }, "/")
    ];
    var childrenCount = React.Children.count(props.children);
    React.Children.forEach(props.children, function (child, index) {
        if (child === null || child === undefined || child === false) {
            return;
        }
        newChildren.push(child);
        if (index < childrenCount - 1) {
            newChildren.push(React.createElement(Divider, { key: "breadcrumbdivider-" + index }, "/"));
        }
    });
    return newChildren;
})())); };
exports.default = Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.js.map