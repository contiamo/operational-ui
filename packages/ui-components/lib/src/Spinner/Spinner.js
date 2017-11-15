"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var glamor_1 = require("glamor");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var spin = glamor_1.css.keyframes({
    "0%": {
        transform: "rotate(0deg)"
    },
    "100%": {
        transform: "rotate(360deg)"
    }
});
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, _b = _a.color, color = _b === void 0 ? "info" : _b, _c = _a.spinnerSize, spinnerSize = _c === void 0 ? 40 : _c, _d = _a.spinDuration, spinDuration = _d === void 0 ? 2 : _d;
    var spinnerColor = contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette[color] || "white");
    return {
        fontSize: "10px",
        margin: "auto",
        top: 50,
        textIndent: "-9999em",
        width: spinnerSize + (typeof spinnerSize === "string" ? "" : "px"),
        height: spinnerSize + (typeof spinnerSize === "string" ? "" : "px"),
        borderRadius: "50%",
        background: "linear-gradient(to right, " + spinnerColor + " 10%, " + contiamo_ui_utils_1.transparentize(spinnerColor)(100) + " 42%)",
        position: "relative",
        animation: spin + " " + spinDuration + "s infinite linear",
        transform: "translateZ(0)",
        "&::before": {
            width: "50%",
            height: "50%",
            background: spinnerColor,
            borderRadius: "100% 0 0 0",
            position: "absolute",
            top: "0",
            left: "0",
            content: "''"
        },
        "&::after": {
            background: "white",
            width: "75%",
            height: "75%",
            borderRadius: "50%",
            content: "''",
            margin: "auto",
            position: "absolute",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0"
        }
    };
});
var Spinner = function (_a) {
    var key = _a.key, css = _a.css, className = _a.className, color = _a.color, size = _a.size, spinDuration = _a.spinDuration;
    return (React.createElement(Container, { key: key, css: css, className: className, color: color, spinnerSize: size, spinDuration: spinDuration }));
};
exports.default = Spinner;
//# sourceMappingURL=Spinner.js.map