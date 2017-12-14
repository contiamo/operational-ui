"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var utils_1 = require("@operational/utils");
var HeaderItem_1 = require("./HeaderItem");
exports.HeaderItem = HeaderItem_1.default;
var HeaderTitle_1 = require("./HeaderTitle");
exports.HeaderTitle = HeaderTitle_1.default;
var HeaderSeparator_1 = require("./HeaderSeparator");
exports.HeaderSeparator = HeaderSeparator_1.default;
var Container = glamorous_1.default.header(function (_a) {
    var theme = _a.theme, color = _a.color;
    var white = theme.colors.white;
    var backgroundColor = color ? utils_1.hexOrColor(color)(theme.colors[color] || white) : white;
    return {
        backgroundColor: backgroundColor,
        display: "flex",
        flex: "0 0 60px",
        height: 60,
        alignItems: "center",
        padding: theme.spacing / 2 + "px " + theme.spacing + "px",
        color: utils_1.readableTextColor(backgroundColor)(["black", "white"])
    };
});
var Header = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className, color: props.color }, props.children)); };
exports.default = Header;
//# sourceMappingURL=Header.js.map