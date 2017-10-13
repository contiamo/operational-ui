"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        margin: theme.spacing * -1,
        marginBottom: theme.spacing * 4 / 3,
        padding: theme.spacing + "px " + theme.spacing + "px " + theme.spacing * 5 / 6 + "px",
        borderBottom: "1px solid " + theme.colors.usage.contentSeparatorLine,
        fontWeight: 700,
        lineHeight: 1,
        color: theme.colors.usage.emphasizedText,
        "* + &": {
            marginTop: theme.spacing
        }
    });
});
var CardHeader = function (_a) {
    var className = _a.className, children = _a.children, id = _a.id;
    return (React.createElement(Container, { id: id, className: className }, children));
};
exports.default = CardHeader;
//# sourceMappingURL=CardHeader.js.map