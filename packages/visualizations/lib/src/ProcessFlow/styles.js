"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glamor_1 = require("glamor");
var breakdownStyle = {
    fontFamily: "sans-serif",
    maxWidth: "350px",
    padding: "6px",
    background: "white",
};
var breakdownsContainerStyle = {
    width: "350px",
    float: "left",
    padding: "7px 0",
};
var breakdownContainerStyle = {
    width: "49%",
    float: "left",
    paddingRight: "2%",
    paddingTop: "10px",
    paddingBottom: "10px",
};
var breakdownLabelStyle = {
    display: "block",
    marginBottom: "3px",
    fontSize: "12px",
};
var breakdownCommentLabelStyle = {
    marginLeft: "6px"
};
var breakdownBackgroundBarStyle = {
    position: "relative",
    width: "100%",
    backgroundColor: "#ddd",
    overflow: "hidden",
    padding: "0 3px",
    height: "15px",
    fontSize: "13px",
};
var breakdownBarStyle = {
    content: "",
    position: "absolute",
    top: "0px",
    left: "0px",
    zIndex: "0",
    display: "block",
    height: "100%",
    pointerEvents: "none",
    backgroundColor: "#1499CE",
};
var breakdownTextStyle = {
    color: "white",
    position: "relative",
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