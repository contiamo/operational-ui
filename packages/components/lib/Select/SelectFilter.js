"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var utils_1 = require("@operational/utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color;
    var backgroundColor = color ? utils_1.hexOrColor(color)(theme.colors[color]) : "white";
    return {
        padding: 0,
        borderBottom: "1px solid",
        borderColor: utils_1.darken(backgroundColor)(10),
        "& > input": {
            width: "100%",
            padding: theme.spacing / 2,
            border: 0,
            outline: "none",
            font: "inherit"
        }
    };
});
var SelectFilter = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className },
    React.createElement("input", { onClick: function (e) { return e.stopPropagation(); }, onChange: props.onChange, placeholder: props.placeholder || "Filter ..." }))); };
exports.default = SelectFilter;
//# sourceMappingURL=SelectFilter.js.map