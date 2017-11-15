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
var PlusChip = function (_a) {
    var key = _a.key, css = _a.css, _b = _a.size, size = _b === void 0 ? 15 : _b, color = _a.color, className = _a.className, children = _a.children, onClick = _a.onClick;
    return (React.createElement(Container, { key: key, css: css, className: className, size: size, color: color, onClick: onClick, tabIndex: -1, role: "button" }, children || "+"));
};
exports.default = PlusChip;
//# sourceMappingURL=PlusChip.js.map