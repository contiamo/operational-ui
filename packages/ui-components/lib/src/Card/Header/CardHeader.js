"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var CardHeader = function (_a) {
    var className = _a.className, children = _a.children;
    return React.createElement("div", { className: className }, children);
}, style = function (_a) {
    var theme = _a.theme;
    return ({
        margin: theme.spacing ? theme.spacing * -1 : -16,
        marginBottom: 16,
        padding: theme.spacing ? theme.spacing : 16,
        borderBottom: "1px solid",
        borderColor: theme.greys ? theme.greys["10"] : "#f5f5f5",
        fontWeight: 700,
        lineHeight: 1,
        "* + &": {
            marginTop: theme.spacing ? theme.spacing : 16,
        },
    });
};
exports.default = glamorous_1.default(CardHeader)(style);
//# sourceMappingURL=CardHeader.js.map