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
        verticalAlign: "top",
        padding: 0,
        border: 0,
        margin: theme.spacing + "px 0 " + theme.spacing / 2 + "px",
        breakInside: "avoid-column",
        "& > *:not(legend)": {
            display: "block",
            marginTop: theme.spacing,
            marginBottom: theme.spacing
        },
        "&:first-child": {
            marginTop: 0
        }
    });
});
var Legend = glamorous_1.default.legend(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.heading1, { paddingLeft: 0 }));
});
var Fieldset = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className },
    React.createElement(Legend, null, props.legend),
    props.children)); };
exports.default = Fieldset;
//# sourceMappingURL=Fieldset.js.map