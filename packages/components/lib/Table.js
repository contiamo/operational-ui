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
        label: "table",
        width: "100%",
        position: "relative",
        backgroundColor: "white"
    });
});
var TableElement = glamorous_1.default.table(function (_a) {
    var theme = _a.theme;
    return ({
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
        tableLayout: "auto",
        "& th": __assign({}, theme.typography.body, { opacity: 0.4 }),
        "& tr": {
            borderTop: "1px solid",
            borderBottom: "1px solid"
        },
        "& tr:first-child": {
            borderTop: 0
        },
        "& tbody tr:last-child": {
            borderBottom: 0
        },
        "& td": __assign({ padding: theme.spacing * 4 / 3 + "px " + theme.spacing + "px" }, theme.typography.body),
        "& td, & th, & tr": {
            borderColor: theme.colors.separator,
            padding: theme.spacing / 2 + "px " + theme.spacing + "px"
        }
    });
});
var EmptyView = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({ padding: theme.spacing * 2 / 3 + "px " + theme.spacing + "px", display: "block", width: "100%", top: theme.spacing, textAlign: "center", backgroundColor: theme.colors.background }, theme.typography.body));
});
var Table = function (props) { return (React.createElement(Container, { css: props.css, className: props.className },
    React.createElement(TableElement, null,
        React.createElement("thead", null,
            React.createElement("tr", null, props.columns.map(function (column, index) { return React.createElement("th", { key: index }, column); }))),
        React.createElement("tbody", null, props.rows.map(function (row, index) { return (React.createElement("tr", { key: index, onClick: function () {
                if (props.onRowClick) {
                    props.onRowClick(index);
                }
            } }, row.map(function (cell, index) { return React.createElement("td", { key: index }, cell); }))); }))),
    props.rows.length === 0 ? React.createElement(EmptyView, null, "There are no records available") : null)); };
exports.default = Table;
//# sourceMappingURL=Table.js.map