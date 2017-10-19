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
var Container = glamorous_1.default.fieldset(function (_a) {
    var theme = _a.theme;
    return ({
        padding: 0,
        border: 0,
        "& > *:not(legend)": {
            display: "block",
            marginTop: theme.spacing,
            marginBottom: theme.spacing
        }
    });
});
var Legend = glamorous_1.default.legend(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.heading1));
});
var Fieldset = function (_a) {
    var children = _a.children, legend = _a.legend;
    return (React.createElement(Container, null,
        React.createElement(Legend, null, legend),
        children));
};
exports.default = Fieldset;
//# sourceMappingURL=Fieldset.js.map