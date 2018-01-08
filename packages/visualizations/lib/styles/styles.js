"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glamor_1 = require("glamor");
var chartContainerStyle = {
    position: "relative",
    display: "block",
    "&.hidden": {
        display: "none"
    }
};
var focusLegendStyle = {
    userSelect: "none",
    pointerEvents: "none",
    boxShadow: "0px 1px 2px #d3d1d1",
    boxSizing: "content-box",
    borderRadius: 2,
    padding: 7,
    border: "1px solid #cdcdcd",
    position: "absolute",
    zIndex: 3000,
    maxWidth: "350px",
    backgroundColor: "#fff",
    "& ul": {
        listStyle: "none",
        fontSize: 12,
        margin: 0,
        padding: 0
    },
    "& li.title": {
        fontWeight: "bold"
    }
};
exports.chartContainer = glamor_1.css(chartContainerStyle).toString();
exports.focusLegend = glamor_1.css(focusLegendStyle).toString();
//# sourceMappingURL=styles.js.map