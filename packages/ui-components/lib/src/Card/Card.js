"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var CardHeader_1 = require("./CardHeader");
exports.CardHeader = CardHeader_1.default;
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, width = _a.width, padding = _a.padding;
    return ({
        width: width,
        padding: padding || theme.spacing,
        boxShadow: theme.shadows.card,
        backgroundColor: theme.colors.usage.cardBackground,
        color: theme.colors.usage.bodyText,
        "& p": {
            lineHeight: "20px"
        },
        "& > img": {
            maxWidth: "100%"
        }
    });
});
var Card = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, width: props.width, padding: props.padding, className: props.className }, props.children)); };
exports.default = Card;
//# sourceMappingURL=Card.js.map