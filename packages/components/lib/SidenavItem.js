"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div({
    height: 30,
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    justifyContent: "flex-start",
    whiteSpace: "nowrap",
    backgroundColor: "rgba(0, 0, 0, 0.2)"
}, function (_a) {
    var theme = _a.theme, isActive = _a.isActive;
    return ({
        color: isActive ? theme.colors.linkText : theme.colors.white
    });
});
exports.default = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className, onClick: props.onClick, isActive: !!props.active }, props.label)); };
//# sourceMappingURL=SidenavItem.js.map