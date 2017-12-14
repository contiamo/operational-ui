"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
    padding: theme_1.operational.spacing / 2 + "px",
    background: theme_1.operational.colors.white,
    width: "49%",
    float: "left"
};
var breakdownLabelStyle = __assign({}, theme_1.operational.typography.small, { display: "block", marginBottom: theme_1.operational.spacing / 4 });
var breakdownCommentLabelStyle = {
    marginLeft: "6px"
};
var breakdownBackgroundBarStyle = {
    position: "relative",
    width: "100%",
    fontSize: 12,
    overflow: "hidden",
    backgroundColor: theme_1.operational.colors.gray10
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
    backgroundColor: utils_1.setBrightness(theme_1.operational.colors.info, 145)
};
var breakdownTextStyle = __assign({}, theme_1.operational.typography.small, { color: theme_1.operational.colors.gray70, position: "relative", top: 1, fontWeight: 400, padding: theme_1.operational.spacing / 4 + "px " + theme_1.operational.spacing / 2 + "px" });
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