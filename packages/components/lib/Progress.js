"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var glamor_1 = require("glamor");
var width = 120;
var height = 45;
var padding = 15;
var Container = glamorous_1.default.div({
    label: "progress",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    top: 0,
    left: 0,
    position: "absolute"
}, function (_a) {
    var theme = _a.theme, fadeParent = _a.fadeParent;
    return ({
        zIndex: theme.baseZIndex + 300,
        backgroundColor: fadeParent ? "rgba(255, 255, 255, 0.8)" : "transparent"
    });
});
var fillProgress = glamor_1.css.keyframes({
    from: {
        transform: "translate3d(-100%, 0, 0)"
    },
    to: {
        transform: "translate3d(0, 0, 0)"
    }
});
var Bar = glamorous_1.default.div({
    width: "100%",
    height: 3
}, function (_a) {
    var theme = _a.theme;
    return ({
        animation: fillProgress + " cubic-bezier(0, 0.9, 0.26, 1) forwards 30s",
        backgroundColor: theme.colors.info
    });
});
exports.default = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className, fadeParent: !!props.fadeParent },
    React.createElement(Bar, null))); };
//# sourceMappingURL=Progress.js.map