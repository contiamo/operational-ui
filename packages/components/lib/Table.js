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
var Container = glamorous_1.default.table(function (_a) {
    var theme = _a.theme;
    return ({
        label: "table",
        border: 0,
        borderCollapse: "collapse",
        textAlign: "left",
        backgroundColor: "white",
        "& th": __assign({ border: "1px solid" }, theme.typography.body, { fontWeight: 600 }),
        "& td": __assign({ border: "1px solid" }, theme.typography.body),
        "& td p": {
            marginBottom: 0
        },
        "& td, & th": {
            borderColor: theme.colors.gray20,
            padding: theme.spacing / 2 + "px " + theme.spacing + "px"
        }
    });
});
exports.default = function (props) { return (React.createElement(Container, { css: props.css, className: props.className },
    React.createElement("thead", null,
        React.createElement("tr", null, props.columns.map(function (column, index) { return React.createElement("th", { key: index }, column); }))),
    React.createElement("tbody", null, props.rows.map(function (row, index) { return React.createElement("tr", { key: index }, row.map(function (cell, index) { return React.createElement("td", { key: index }, cell); })); })))); };
//# sourceMappingURL=Table.js.map