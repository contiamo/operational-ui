"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var HeaderItem_1 = require("./HeaderItem");
exports.HeaderItem = HeaderItem_1.default;
var HeaderTitle_1 = require("./HeaderTitle");
exports.HeaderTitle = HeaderTitle_1.default;
var HeaderSeparator_1 = require("./HeaderSeparator");
exports.HeaderSeparator = HeaderSeparator_1.default;
var Container = glamorous_1.default.header(function (_a) {
    var theme = _a.theme, color = _a.color;
    var white = theme.colors.palette.white;
    var backgroundColor = color ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette[color] || white) : white;
    return {
        backgroundColor: backgroundColor,
        display: "flex",
        flex: "0 0 50px",
        height: 50,
        alignItems: "center",
        padding: theme.spacing / 2 + "px " + theme.spacing + "px",
        color: contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"])
    };
});
var Header = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className, color: props.color }, props.children)); };
exports.default = Header;
//# sourceMappingURL=Header.js.map