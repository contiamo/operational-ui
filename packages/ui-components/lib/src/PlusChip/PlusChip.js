"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, size = _a.size;
    var borderColor = color ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette[color] || "white") : "black";
    return {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        border: "1px solid",
        cursor: "pointer",
        color: borderColor
    };
});
var PlusChip = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className, size: props.size || 15, color: props.color, onClick: props.onClick, tabIndex: -1, role: "button" }, props.children || "+")); };
exports.default = PlusChip;
//# sourceMappingURL=PlusChip.js.map