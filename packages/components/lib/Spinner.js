"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var glamor_1 = require("glamor");
var utils_1 = require("@operational/utils");
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
    var spinnerColor = utils_1.hexOrColor(color)(theme.colors[color] || "white");
    return {
        fontSize: "10px",
        margin: "auto",
        top: 50,
        textIndent: "-9999em",
        width: spinnerSize + (typeof spinnerSize === "string" ? "" : "px"),
        height: spinnerSize + (typeof spinnerSize === "string" ? "" : "px"),
        borderRadius: "50%",
        background: "linear-gradient(to right, " + spinnerColor + " 10%, " + utils_1.transparentize(spinnerColor)(100) + " 42%)",
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
exports.default = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className, color: props.color, spinnerSize: props.size, spinDuration: props.spinDuration })); };
//# sourceMappingURL=Spinner.js.map