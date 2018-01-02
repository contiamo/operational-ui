"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div({
    height: 45,
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 16px 0 60px",
    justifyContent: "flex-start",
    whiteSpace: "nowrap",
    backgroundColor: "rgba(0, 0, 0, 0.2)"
}, function (_a) {
    var theme = _a.theme, isActive = _a.isActive;
    return ({
        color: isActive ? theme.colors.linkText : theme.colors.white
    });
});
var ConnectorStrip = glamorous_1.default.div({
    width: 1,
    height: 45,
    backgroundColor: "#515151",
    position: "absolute",
    top: 0,
    left: 29,
    "&::after": {
        content: "' '",
        width: 8,
        height: 8,
        backgroundColor: "#515151",
        position: "absolute",
        borderRadius: "50%",
        left: -3,
        top: 20
    },
    // Only half-height for last element - selectors cover both the case
    // when the side nav item is wrapped inside a <Link/> element (e.g. react-router)
    // and when it isn't. This is also why the class names are necessary.
    ".op_sidenavheader > .op_sidenavitem:last-child > &, .op_sidenavheader > *:last-child > .op_sidenavitem > &": {
        height: 22.5
    }
});
exports.default = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: "op_sidenavitem " + props.className, onClick: props.onClick, isActive: !!props.active },
    React.createElement(ConnectorStrip, null),
    props.label)); };
//# sourceMappingURL=SidenavItem.js.map