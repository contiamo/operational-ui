"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var width = 32;
var height = 16;
var railHeight = 6;
var railOffset = 4;
var Container = glamorous_1.default.div({
    width: width,
    height: height,
    position: "relative",
    cursor: "pointer"
});
var Button = glamorous_1.default.div({
    transition: "transform .3s",
    position: "absolute",
    top: 0,
    left: 0,
    content: " ",
    width: height,
    height: height,
    borderRadius: "50%",
    backgroundColor: "#444444",
    zIndex: 2
}, function (_a) {
    var on = _a.on, theme = _a.theme;
    return ({
        transform: "translate3d(" + (on ? width - height : 0) + "px, 0, 0)",
        backgroundColor: theme.greys.white,
        border: "1px solid " + theme.greys["80"]
    });
});
var Rail = glamorous_1.default.div({
    width: width - 2 * railOffset,
    height: railHeight,
    backgroundColor: "black",
    position: "absolute",
    top: (height - railHeight) / 2,
    left: railOffset,
    borderRadius: railHeight / 2,
    overflow: "hidden",
    zIndex: 1
}, function (_a) {
    var on = _a.on, theme = _a.theme;
    return ({
        backgroundColor: theme.greys["60"],
        "&:after": {
            content: " ",
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: theme.colors.secondary,
            transition: "transform .3s",
            transform: "translate3d(" + (on ? "0" : "-100%") + ", 0, 0)"
        }
    });
});
var Switch = function (_a) {
    var on = _a.on, onChange = _a.onChange;
    return (React.createElement(Container, { onClick: function () {
            onChange(!on);
        } },
        React.createElement(Button, { on: on }),
        React.createElement(Rail, { on: on })));
};
exports.default = Switch;
//# sourceMappingURL=Switch.js.map