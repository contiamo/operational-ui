"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.title, { marginRight: theme.spacing }));
});
var HeaderTitle = function (_a) {
    var key = _a.key, css = _a.css, className = _a.className, children = _a.children;
    return (React.createElement(Container, { key: key, css: css, className: className }, children));
};
exports.default = HeaderTitle;
//# sourceMappingURL=HeaderTitle.js.map