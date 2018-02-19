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
// Wrap each ui component in its own theme provider to make sure the default
// Contiamo theme is always available. Props are passed along unaltered.
exports.wrapTheme = function (theme) { return function (Comp) {
    return function (props) { return (React.createElement(glamorous_1.ThemeProvider, { theme: theme },
        React.createElement(Comp, __assign({}, props)))); };
}; };
//# sourceMappingURL=theme.js.map