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
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    color: "#FFF"
});
var SidenavItem = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className, onClick: props.onClick }, props.label)); };
exports.default = SidenavItem;
//# sourceMappingURL=SidenavItem.js.map