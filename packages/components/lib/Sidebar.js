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
        overflow: "auto",
        scrollBehavior: "smooth",
        backgroundColor: theme.colors.cardBackground,
        color: theme.colors.gray80
    });
});
exports.default = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className }, props.children)); };
//# sourceMappingURL=Sidebar.js.map