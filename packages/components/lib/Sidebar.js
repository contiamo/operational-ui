"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var SidebarItem_1 = require("./SidebarItem");
exports.SidebarItem = SidebarItem_1.default;
var SidebarLink_1 = require("./SidebarLink");
exports.SidebarLink = SidebarLink_1.default;
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        width: "100%",
        maxWidth: 280,
        maxHeight: "100%",
        boxShadow: theme.shadows.card,
        overflow: "auto",
        scrollBehavior: "smooth",
        backgroundColor: theme.colors.cardBackground,
        color: theme.colors.gray80
    });
});
var Sidebar = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className }, props.children)); };
exports.Sidebar = Sidebar;
exports.default = Sidebar;
//# sourceMappingURL=Sidebar.js.map