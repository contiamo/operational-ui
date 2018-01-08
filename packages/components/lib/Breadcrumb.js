"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.span(function (_a) {
    var theme = _a.theme;
    return ({
        color: theme.colors.linkText,
        borderBottom: "1px solid " + theme.colors.linkText,
        "& a": {
            textDecoration: "none",
            color: "inherit"
        }
    });
});
exports.default = function (props) { return (React.createElement(Container, { className: props.className, css: props.css }, props.children)); };
//# sourceMappingURL=Breadcrumb.js.map