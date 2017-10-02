"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var CardHeader_1 = require("./Header/CardHeader");
exports.CardHeader = CardHeader_1.default;
var style = function (_a) {
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
        },
        "& .CardHeader:not(:first-child)": {
            borderBottomStyle: "dashed"
        }
    });
};
var Card = function (_a) {
    var className = _a.className, children = _a.children;
    return React.createElement("div", { className: className }, children);
};
exports.default = glamorous_1.default(Card)(style);
//# sourceMappingURL=Card.js.map