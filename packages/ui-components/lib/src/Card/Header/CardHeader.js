"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var style = function (_a) {
    var theme = _a.theme;
    return ({
        margin: theme.spacing * -1,
        marginBottom: 16,
        padding: theme.spacing,
        borderBottom: "1px solid",
        borderColor: theme.greys["10"] || "#f5f5f5",
        fontWeight: 700,
        lineHeight: 1,
        "* + &": {
            marginTop: theme.spacing ? theme.spacing : 16
        }
    });
};
var CardHeader = function (_a) {
    var className = _a.className, children = _a.children, id = _a.id;
    return (React.createElement("div", { id: id, className: className }, children));
};
exports.default = glamorous_1.default(CardHeader)(style);
//# sourceMappingURL=CardHeader.js.map