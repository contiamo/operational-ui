"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        display: "flex",
        alignItems: "center",
        height: 36,
        margin: theme.spacing * -1,
        marginBottom: theme.spacing * 4 / 3,
        padding: "0 " + theme.spacing + "px",
        borderBottom: "1px solid " + theme.colors.usage.contentSeparatorLine,
        fontWeight: 700,
        lineHeight: 1,
        color: theme.colors.usage.emphasizedText,
        "* + &": {
            marginTop: theme.spacing
        },
        "&:not(:first-child)": {
            borderBottomStyle: "dashed"
        }
    });
});
var CardHeader = function (_a) {
    var key = _a.key, css = _a.css, className = _a.className, children = _a.children, id = _a.id;
    return (React.createElement(Container, { key: key, id: id, css: css, className: className }, children));
};
exports.default = CardHeader;
//# sourceMappingURL=CardHeader.js.map