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
var Slash = glamorous_1.default.span(function (_a) {
    var theme = _a.theme;
    return ({
        display: "inline-block",
        margin: "0 " + theme.spacing / 2 + "px",
        color: theme.colors.gray,
        ":first-child": {
            marginLeft: 0
        }
    });
});
// Intersperse slashes between the children (`<Breadcrumb />` elements)
// Curried first argument is necessary to give unique auto-incrementing
// keys to the slash elements.
var intersperseSlashes = function (index) { return function (_a) {
    var head = _a[0], tail = _a.slice(1);
    return head ? [React.createElement(Slash, { key: "divider-" + index }, "/"), head].concat(intersperseSlashes(index + 1)(tail)) : [];
}; };
var Breadcrumbs = function (props) { return (React.createElement(Container, { className: props.className, css: props.css }, intersperseSlashes(0)(React.Children.toArray(props.children)))); };
exports.default = Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.js.map