"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "sidebar",
        width: "100%",
        maxWidth: 280,
        maxHeight: "100%",
        boxShadow: theme.shadows.card,
        position: "relative",
        overflow: "hidden",
        scrollBehavior: "smooth",
        color: theme.colors.text,
        "& a:link, & a:visited": {
            width: "100%",
            display: "block",
            textDecoration: "none",
            color: "inherit",
        },
    });
});
var Sidebar = function (props) { return (React.createElement(Container, { id: props.id, css: props.css, className: props.className }, props.children)); };
exports.default = Sidebar;
//# sourceMappingURL=Sidebar.js.map