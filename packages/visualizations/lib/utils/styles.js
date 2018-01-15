"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glamor_1 = require("glamor");
var legendStyle = {
    fontSize: "11px",
    position: "relative",
    overflow: "hidden"
};
var legendTopBottomStyle = {
    padding: "0 7px",
    margin: "3px 0",
    "& .series-legend, .comparison-legend": {
        float: "left"
    }
};
var seriesLegendStyle = {
    padding: "1px 3px 0 3px",
    float: "left",
    lineHeight: "14px",
    "& div.color": {
        width: "6px",
        height: "6px",
        margin: "2px 3px 0 0",
        float: "left"
    },
    "& div.name": {
        float: "left"
    }
};
var drawingContainerStyle = {
    position: "relative",
    overflow: "hidden"
};
var chartBackgroundStyle = {
    fill: "#fff"
};
var ruleStyle = {
    stroke: "#eee",
    strokeWidth: "1px",
    shapeRendering: "crispedges",
    "& .zero": {
        strokeWidth: "2px"
    },
    "& .now": {
        stroke: "#71a934",
        strokeDasharray: "2, 4"
    }
};
var componentFocusStyle = {
    position: "absolute",
    pointerEvents: "all",
    backgroundColor: "rgba(190, 255, 255, 0.1)",
    borderRadius: "3px",
    border: "1px solid #dcf1ff",
    padding: 0,
    cursor: "pointer"
};
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
exports.legend = glamor_1.css(legendStyle).toString();
exports.legendTopBottom = glamor_1.css(legendTopBottomStyle).toString();
exports.seriesLegend = glamor_1.css(seriesLegendStyle).toString();
exports.drawingContainer = glamor_1.css(drawingContainerStyle).toString();
exports.chartBackground = glamor_1.css(chartBackgroundStyle).toString();
exports.rule = glamor_1.css(ruleStyle).toString();
exports.componentFocus = glamor_1.css(componentFocusStyle).toString();
//# sourceMappingURL=styles.js.map