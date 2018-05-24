"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "Messages",
        position: "fixed",
        zIndex: theme.baseZIndex + 500,
        bottom: 2 * theme.spacing,
        right: 2 * theme.spacing,
        "& > *": {
            width: 400,
            height: "auto",
            marginTop: theme.spacing / 2,
        },
    });
});
var Messages = function (props) { return (React.createElement(Container, { css: props.css, className: props.className }, props.children)); };
exports.default = Messages;
//# sourceMappingURL=Messages.js.map