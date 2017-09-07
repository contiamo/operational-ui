"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var HeaderTitle = function (_a) {
    var className = _a.className, children = _a.children;
    return React.createElement("div", { className: className }, children);
}, style = function (_a) {
    var theme = _a.theme;
    return ({
        marginRight: theme.spacing,
        fontSize: "1.7rem",
        fontWeight: 600
    });
};
exports.HeaderTitle = HeaderTitle;
exports.default = glamorous_1.default(HeaderTitle)(style);
//# sourceMappingURL=HeaderTitle.js.map