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
var contiamo_ui_theme_1 = require("contiamo-ui-theme");
// Wrap each ui component in its own theme provider to make sure the default
// Contiamo theme is always available. Props are passed along unaltered.
function wrapDefaultTheme(Comp) {
    return function (props) { return (React.createElement(glamorous_1.ThemeProvider, { theme: contiamo_ui_theme_1.contiamoTheme },
        React.createElement(Comp, __assign({}, props)))); };
}
exports.default = wrapDefaultTheme;
//# sourceMappingURL=wrap-default-theme.js.map