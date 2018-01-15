"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var utils_1 = require("@operational/utils");
var size = 32;
var Container = glamorous_1.default.div({
    label: "sidenavitem",
    height: size,
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 16px 0 52px",
    justifyContent: "flex-start",
    whiteSpace: "nowrap",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.25)"
    }
}, function (_a) {
    var theme = _a.theme, isActive = _a.isActive;
    return ({
        color: isActive ? theme.colors.linkText : theme.colors.white
    });
});
var ConnectorStrip = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        width: 1,
        height: size,
        backgroundColor: utils_1.lighten(theme.colors.sidenavBackground)(10),
        position: "absolute",
        top: 0,
        left: 24,
        "&::after": {
            content: "' '",
            width: 7,
            height: 7,
            backgroundColor: utils_1.lighten(theme.colors.sidenavBackground)(10),
            position: "absolute",
            borderRadius: "50%",
            left: -3,
            top: size / 2 - 4
        },
        // Only half-height for last element - selectors cover both the case
        // when the side nav item is wrapped inside a <Link/> element (e.g. react-router)
        // and when it isn't. This is also why the class names are necessary.
        ".op_sidenavheader > .op_sidenavitem:last-child > &, .op_sidenavheader > *:last-child > .op_sidenavitem > &": {
            height: size / 2
        }
    });
});
exports.default = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: ["op_sidenavitem", props.className].filter(function (a) { return !!a; }).join(" "), onClick: props.onClick, isActive: !!props.active },
    React.createElement(ConnectorStrip, null),
    props.label)); };
//# sourceMappingURL=SidenavItem.js.map