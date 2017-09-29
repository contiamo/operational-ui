"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("@contiamo/ui-utils");
var style = function (_a) {
    var theme = _a.theme, color = _a.color, size = _a.size;
    var borderColor = color ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors[color] || "white") : "black";
    return {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        border: "1px solid",
        cursor: "pointer",
        color: borderColor,
        "&.plus-chip + .plus-chip": {
            marginLeft: theme.spacing / 2
        }
    };
};
var PlusChip = function (_a) {
    var className = _a.className, children = _a.children, onClick = _a.onClick;
    return (React.createElement("div", { className: className + " PlusChip", onClick: onClick, tabIndex: -1, role: "button" }, children || "+"));
};
exports.PlusChip = PlusChip;
PlusChip.defaultProps = {
    size: 15
};
exports.default = glamorous_1.default(PlusChip)(style);
//# sourceMappingURL=PlusChip.js.map