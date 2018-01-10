"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div({
    label: "grid",
    display: "grid"
}, 
// Dynamic/theme-dependent styles
function (_a) {
    var theme = _a.theme, _b = _a.rowData, rowData = _b === void 0 ? ["auto", "auto"] : _b, _c = _a.columnData, columnData = _c === void 0 ? ["auto", "auto"] : _c, gap = _a.gap;
    return ({
        gridTemplateColumns: columnData.map(function (val) { return (typeof val === "string" ? val : val + "px"); }).join(" "),
        gridTemplateRows: rowData.map(function (val) { return (typeof val === "string" ? val : val + "px"); }).join(" "),
        gridColumnGap: gap || theme.spacing,
        gridRowGap: gap || theme.spacing
    });
});
var Grid = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className, rowData: props.rows, columnData: props.columns, gap: props.gap }, props.children)); };
exports.default = Grid;
//# sourceMappingURL=Grid.js.map