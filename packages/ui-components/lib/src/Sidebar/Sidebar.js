"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var SidebarItem_1 = require("./Item/SidebarItem");
exports.SidebarItem = SidebarItem_1.default;
var SidebarLink_1 = require("./Link/SidebarLink");
exports.SidebarLink = SidebarLink_1.default;
var style = function (_a) {
    var theme = _a.theme;
    return ({
        width: "100%",
        maxWidth: 280,
        maxHeight: "100%",
        borderRadius: 2,
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
        overflow: "auto",
        scrollBehavior: "smooth",
        fontWeight: 300,
        backgroundColor: theme.greys.white,
        color: theme.greys["80"] || "#747474"
    });
};
var Sidebar = function (_a) {
    var className = _a.className, children = _a.children;
    return React.createElement("div", { className: className }, children);
};
exports.Sidebar = Sidebar;
exports.default = glamorous_1.default(Sidebar)(style);
//# sourceMappingURL=Sidebar.js.map