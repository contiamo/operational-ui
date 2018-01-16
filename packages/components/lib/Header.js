"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.header(function (_a) {
    var theme = _a.theme;
    return ({
        label: "header",
        display: "flex",
        flex: "0 0 52px",
        justifyContent: "space-between",
        backgroundColor: theme.colors.white,
        height: 52,
        alignItems: "center",
        padding: theme.spacing / 2 + "px " + theme.spacing * 4 / 3 + "px",
        boxShadow: theme.shadows.card
    });
});
exports.default = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className }, props.children)); };
//# sourceMappingURL=Header.js.map