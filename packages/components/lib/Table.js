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
        backgroundColor: "white",
    });
});
var TableElement = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        width: "100%",
        textAlign: "left",
        "& tr:first-child": {
            borderTop: 0,
        },
        "& tbody tr:last-child": {
            borderBottom: 0,
        },
        "& td": {},
        "& th": {
            opacity: 0.4,
        },
    });
});
var TableBody = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        display: "block",
    });
});
var TableBodyRow = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, isClickable = _a.isClickable;
    return (__assign({}, (isClickable ? { cursor: "pointer" } : {}), { position: "relative", display: "flex", borderTop: "1px solid", borderColor: theme.colors.separator, padding: theme.spacing / 2 + "px " + theme.spacing + "px", ":hover": {
            backgroundColor: isClickable ? theme.colors.lighterBackground : "transparent",
            "& .opui-row-actions-container": {
                display: "block",
            },
        } }));
});
var TableHead = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        display: "flex",
        opacity: 0.4,
        padding: theme.spacing / 4 + "px " + theme.spacing + "px",
    });
});
var TableHeadCell = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body, { flex: 1 }));
});
var TableCell = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body, { flex: 1 }));
});
var EmptyView = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({ padding: theme.spacing * 2 / 3 + "px " + theme.spacing + "px", display: "block", width: "100%", top: theme.spacing, textAlign: "center", backgroundColor: theme.colors.background }, theme.typography.body));
});
var RowActionsContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        width: "fit-content",
        position: "absolute",
        top: "50%",
        right: theme.spacing / 2,
        transform: "translate3d(0, -50%, 0)",
        display: "none",
    });
});
var Table = function (props) { return (React.createElement(Container, { css: props.css, className: props.className },
    React.createElement(TableElement, null,
        React.createElement(TableHead, null, props.columns.map(function (column, index) { return (React.createElement(TableHeadCell, { key: index, css: props.__experimentalColumnCss && props.__experimentalColumnCss[index] }, column)); })),
        React.createElement(TableBody, null, props.rows.map(function (row, index) { return (React.createElement(TableBodyRow, { isClickable: Boolean(props.onRowClick), key: index, onClick: function () {
                if (props.onRowClick) {
                    props.onRowClick(row, index);
                }
            } },
            row.map(function (cell, index) { return (React.createElement(TableCell, { key: index, css: props.__experimentalColumnCss && props.__experimentalColumnCss[index] }, cell)); }),
            props.__experimentalRowActions &&
                props.__experimentalRowActions[index] && (React.createElement(RowActionsContainer, { className: "opui-row-actions-container" }, props.__experimentalRowActions[index])))); }))),
    props.rows.length === 0 ? React.createElement(EmptyView, null, "There are no records available") : null)); };
exports.default = Table;
//# sourceMappingURL=Table.js.map