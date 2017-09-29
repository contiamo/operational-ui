"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("@contiamo/ui-utils");
var HeaderItem_1 = require("./Item/HeaderItem");
exports.HeaderItem = HeaderItem_1.default;
var HeaderTitle_1 = require("./Title/HeaderTitle");
exports.HeaderTitle = HeaderTitle_1.default;
var HeaderSeparator_1 = require("./Separator/HeaderSeparator");
exports.HeaderSeparator = HeaderSeparator_1.default;
var style = function (_a) {
    var theme = _a.theme, color = _a.color;
    var backgroundColor = color ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors[color] || "white") : "white";
    return {
        backgroundColor: backgroundColor,
        display: "flex",
        minHeight: 50,
        alignItems: "center",
        padding: theme.spacing / 2 + "px " + theme.spacing + "px",
        color: contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"])
    };
};
exports.style = style;
var Header = function (_a) {
    var className = _a.className, children = _a.children;
    return React.createElement("div", { className: className }, children);
};
exports.default = glamorous_1.default(Header)(style);
//# sourceMappingURL=Header.js.map