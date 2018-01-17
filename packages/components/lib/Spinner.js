"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var glamor_1 = require("glamor");
var spin = glamor_1.css.keyframes({
    "0%": {
        transform: "scale(1)"
    },
    "100%": {
        transform: "scale(0.75)"
    }
});
var size = 30;
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "spinner",
        margin: "auto",
        width: size,
        height: size,
        position: "relative",
        transform: "translateZ(0)"
    });
});
var animationTimeUnit = 0.6;
var f = 0.25;
var Element = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        fontSize: 0,
        width: size / 2 - 2,
        height: size / 2 - 2,
        display: "inline-block",
        lineHeight: 0,
        margin: 1,
        animationName: spin,
        animationDuration: animationTimeUnit + "s",
        animationTimingFunction: "ease-in-out",
        animationDirection: "alternate",
        animationIterationCount: "infinite",
        backgroundColor: theme.colors.info,
        // Increasing the negative animation delay clockwise
        "&:nth-child(1)": {
            animationDelay: "0s"
        },
        "&:nth-child(2)": {
            animationDelay: -1 * f * animationTimeUnit + "s"
        },
        "&:nth-child(4)": {
            animationDelay: -2 * f * animationTimeUnit + "s"
        },
        "&:nth-child(3)": {
            animationDelay: -3 * f * animationTimeUnit + "s"
        }
    });
});
exports.default = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className },
    React.createElement(Element, null),
    React.createElement(Element, null),
    React.createElement(Element, null),
    React.createElement(Element, null))); };
//# sourceMappingURL=Spinner.js.map