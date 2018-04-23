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
    return ({
        label: "record",
        position: "relative",
        padding: theme.spacing / 2 + "px " + theme.spacing + "px",
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius
    });
});
var HeaderContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.heading1, { display: "flex", alignItems: "center", justifyContent: "space-between", height: theme.spacing * 3 }));
});
var Record = function (props) { return (React.createElement(Container, { css: props.css, className: props.className },
    React.createElement(HeaderContainer, null,
        props.title,
        props.controls ? props.controls : null),
    props.children)); };
exports.default = Record;
//# sourceMappingURL=Record.js.map