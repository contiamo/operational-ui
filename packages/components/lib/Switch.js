"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var width = 32;
var height = 16;
var railHeight = 16;
var railOffset = 8;
var Container = glamorous_1.default.div({
    width: width,
    height: height,
    label: "switch",
    position: "relative",
    cursor: "pointer"
});
var Button = glamorous_1.default.div({
    height: height,
    transition: "transform .3s",
    position: "absolute",
    top: 0,
    left: 1,
    content: " ",
    width: height,
    borderRadius: "50%"
}, function (_a) {
    var on = _a.on, theme = _a.theme;
    return ({
        transform: "translate3d(" + (on ? width - height - 2 : 0) + "px, 0, 0)",
        backgroundColor: theme.colors.white,
        border: "1px solid " + (on ? theme.colors.info : theme.colors.gray80),
        zIndex: theme.baseZIndex + 2
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
    overflow: "hidden"
}, function (_a) {
    var on = _a.on, theme = _a.theme;
    return ({
        backgroundColor: theme.colors.gray80,
        "&:after": {
            content: " ",
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: theme.colors.info,
            transition: "transform .3s",
            transform: "translate3d(" + (on ? "0" : "-100%") + ", 0, 0)",
            zIndex: theme.baseZIndex + 1
        }
    });
});
exports.default = function (props) { return (React.createElement(Container, { key: props.id, style: props.style, className: props.className, onClick: function () {
        props.onChange(!props.on);
    } },
    React.createElement(Button, { on: props.on }),
    React.createElement(Rail, { on: props.on }))); };
//# sourceMappingURL=Switch.js.map