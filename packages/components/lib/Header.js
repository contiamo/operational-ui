"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.header(function (_a) {
    var theme = _a.theme;
    return ({
        label: "header",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: theme.colors.white,
        height: 52,
        alignItems: "center",
        padding: theme.spacing / 2 + "px " + theme.spacing * 4 / 3 + "px",
        boxShadow: theme.shadows.card
    });
});
var Header = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className }, props.children)); };
exports.default = Header;
//# sourceMappingURL=Header.js.map