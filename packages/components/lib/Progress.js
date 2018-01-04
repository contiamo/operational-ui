"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var glamor_1 = require("glamor");
var width = 120;
var height = 45;
var padding = 15;
var Container = glamorous_1.default.div({
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    display: "flex",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.8)"
}, function (_a) {
    var theme = _a.theme;
    return ({
        zIndex: theme.baseZIndex + 300
    });
});
var Box = glamorous_1.default.div({
    width: width,
    height: height,
    padding: padding,
    margin: "auto",
    boxShadow: "0px 1px 2px #d3d1d1",
    backgroundColor: "#FFFFFF"
});
var BarContainer = glamorous_1.default.div({
    width: "100%",
    height: "100%",
    overflow: "hidden"
}, function (_a) {
    var theme = _a.theme;
    return ({
        backgroundColor: theme.colors.gray30,
        border: "1px solid " + theme.colors.gray20
    });
});
var fillProgress = glamor_1.css.keyframes({
    from: {
        transform: "translateX(-100%)"
    },
    to: {
        transform: "none"
    }
});
var Bar = glamorous_1.default.div({
    height: "100%"
}, function (_a) {
    var theme = _a.theme;
    return ({
        animation: fillProgress + " cubic-bezier(0, 0.9, 0.26, 1) forwards 30s",
        backgroundColor: theme.colors.success
    });
});
var Progress = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className },
    React.createElement(Box, null,
        React.createElement(BarContainer, null,
            React.createElement(Bar, null))))); };
exports.default = Progress;
//# sourceMappingURL=Progress.js.map