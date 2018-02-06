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
    backgroundColor: "#fff",
    "&.hidden": {
        display: "none"
    }
};
var focusLegendStyle = {
    userSelect: "none",
    pointerEvents: "none",
    boxSizing: "content-box",
    padding: "4px 8px",
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
    "& li.title, span.title": {
        fontWeight: "bold"
    },
    "& span.title": {
        paddingRight: "6px"
    },
    "&::after": {
        content: "''",
        position: "absolute",
        width: 0,
        height: 0
    },
    "&.above::after": {
        borderTop: "solid 7px #fff",
        borderLeft: "solid 7px transparent",
        borderRight: "solid 7px transparent",
        top: "100%",
        left: "50%",
        marginLeft: "-7px"
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