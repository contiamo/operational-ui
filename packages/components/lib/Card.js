"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "card",
        padding: theme.spacing,
        borderRadius: 4,
        boxShadow: theme.shadows.card,
        backgroundColor: theme.colors.white,
        "& > img": {
            maxWidth: "100%"
        }
    });
});
var Card = function (props) { return (React.createElement(Container, { id: props.id, css: props.css, className: props.className }, props.children)); };
exports.default = Card;
//# sourceMappingURL=Card.js.map