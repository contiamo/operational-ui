"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glamor_1 = require("glamor");
var theme_1 = require("@operational/theme");
var utils_1 = require("@operational/utils");
var breakdownStyle = {
    maxWidth: "350px",
    padding: "6px",
    background: "white"
};
var breakdownsContainerStyle = {
    width: "350px",
    float: "left",
    padding: "7px 0"
};
var breakdownContainerStyle = {
    padding: theme_1.contiamoTheme.spacing / 2 + "px",
    background: theme_1.contiamoTheme.colors.palette.white,
    width: "49%",
    float: "left"
};
var breakdownLabelStyle = {
    display: "block",
    marginBottom: theme_1.contiamoTheme.spacing / 4,
    fontSize: theme_1.contiamoTheme.typography.small.fontSize
};
var breakdownCommentLabelStyle = {
    marginLeft: "6px"
};
var breakdownBackgroundBarStyle = {
    position: "relative",
    width: "100%",
    fontSize: 12,
    overflow: "hidden",
    backgroundColor: theme_1.contiamoTheme.colors.palette.grey10
};
var breakdownBarStyle = {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
    display: "block",
    height: "100%",
    pointerEvents: "none",
    backgroundColor: utils_1.setBrightness(theme_1.contiamoTheme.colors.palette.info, 145)
};
var breakdownTextStyle = {
    color: theme_1.contiamoTheme.colors.palette.grey70,
    fontSize: 12,
    position: "relative",
    top: 1,
    fontWeight: 400,
    padding: 2
};
var titleStyle = {
    fontWeight: "bold",
    color: "#555",
    "& span": {
        fontWeight: "normal"
    }
};
var contentStyle = {
    paddingTop: "15px"
};
exports.breakdown = glamor_1.css(breakdownStyle).toString();
exports.breakdownsContainer = glamor_1.css(breakdownsContainerStyle).toString();
exports.breakdownContainer = glamor_1.css(breakdownContainerStyle).toString();
exports.breakdownLabel = glamor_1.css(breakdownLabelStyle).toString();
exports.breakdownCommentLabel = glamor_1.css(breakdownCommentLabelStyle).toString();
exports.breakdownBackgroundBar = glamor_1.css(breakdownBackgroundBarStyle).toString();
exports.breakdownBar = glamor_1.css(breakdownBarStyle).toString();
exports.breakdownText = glamor_1.css(breakdownTextStyle).toString();
exports.title = glamor_1.css(titleStyle).toString();
exports.content = glamor_1.css(contentStyle).toString();
//# sourceMappingURL=styles.js.map