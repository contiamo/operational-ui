"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var SidebarItem_1 = require("./Item/SidebarItem");
exports.SidebarItem = SidebarItem_1.default;
var SidebarLink_1 = require("./Link/SidebarLink");
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
        fontWeight: 300,
        backgroundColor: theme.colors.usage.cardBackground,
        color: theme.colors.palette.grey80
    });
});
var Sidebar = function (_a) {
    var style = _a.style, className = _a.className, children = _a.children;
    return (React.createElement(Container, { style: style, className: className }, children));
};
exports.Sidebar = Sidebar;
exports.default = Sidebar;
//# sourceMappingURL=Sidebar.js.map