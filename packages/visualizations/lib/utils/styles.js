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
var legendStyle = {
    fontSize: "11px",
    position: "relative",
    overflow: "hidden",
};
var legendTopBottomStyle = {
    padding: "3px 7px",
    "& .series-legend, .comparison-legend": {
        float: "left",
    },
};
var seriesLegendStyle = {
    padding: "1px 4px 0 4px",
    marginRight: "2px",
    float: "left",
    lineHeight: "14px",
    "& div.color": {
        width: "10px",
        height: "10px",
        margin: "3px 3px 0 0",
        float: "left",
        borderRadius: "2px",
    },
    "& div.name": __assign({ float: "left" }, theme_1.operational.typography.small),
};
var drawingContainerStyle = {
    position: "relative",
    overflow: "hidden",
};
var ruleStyle = {
    stroke: "#eee",
    strokeWidth: "1px",
    shapeRendering: "crispedges",
    "& .zero": {
        strokeWidth: "2px",
    },
    "& .now": {
        stroke: "#71a934",
        strokeDasharray: "2, 4",
    },
};
var componentFocusStyle = {
    position: "absolute",
    pointerEvents: "all",
    backgroundColor: "rgba(0, 74, 117, 0.05)",
    borderRadius: theme_1.operational.borderRadius,
    border: 0,
    padding: 0,
    cursor: "pointer",
};
var chartContainerStyle = {
    position: "relative",
    display: "block",
    backgroundColor: "#fff",
    "&.hidden": {
        display: "none",
    },
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
    borderRadius: theme_1.operational.borderRadius,
    "& ul": {
        listStyle: "none",
        fontSize: 12,
        margin: 0,
        padding: 0,
    },
    "& li.title, span.title": {
        fontWeight: "bold",
    },
    "& span.title": {
        paddingRight: "6px",
    },
    "&::before,::after": {
        content: "''",
        position: "absolute",
        width: 0,
        height: 0,
    },
};
var focusLegendAboveStyle = {
    "&::before,::after": {
        top: "100%",
        left: "50%",
    },
    "&::before": {
        borderLeft: "solid 8px transparent",
        borderRight: "solid 8px transparent",
        borderTop: "solid 8px #cdcdcd",
        marginLeft: "-8px",
    },
    "&::after": {
        borderLeft: "solid 7px transparent",
        borderRight: "solid 7px transparent",
        borderTop: "solid 7px #fff",
        marginLeft: "-7px",
    },
};
var focusLegendBelowStyle = {
    "&::before,::after": {
        bottom: "100%",
        left: "50%",
    },
    "&::before": {
        borderLeft: "solid 8px transparent",
        borderRight: "solid 8px transparent",
        borderBottom: "solid 8px #cdcdcd",
        marginLeft: "-8px",
    },
    "&::after": {
        borderLeft: "solid 7px transparent",
        borderRight: "solid 7px transparent",
        borderBottom: "solid 7px #fff",
        marginLeft: "-7px",
    },
};
var focusLegendRightStyle = {
    "&::before,::after": {
        top: "50%",
        left: "0%",
    },
    "&::before": {
        borderTop: "solid 8px transparent",
        borderBottom: "solid 8px transparent",
        borderRight: "solid 8px #cdcdcd",
        marginTop: "-8px",
        marginLeft: "-8px",
    },
    "&::after": {
        borderTop: "solid 7px transparent",
        borderBottom: "solid 7px transparent",
        borderRight: "solid 7px #fff",
        marginTop: "-7px",
        marginLeft: "-7px",
    },
};
var focusLegendLeftStyle = {
    "&::before,::after": {
        top: "50%",
        left: "100%",
    },
    "&::before": {
        borderTop: "solid 8px transparent",
        borderBottom: "solid 8px transparent",
        borderLeft: "solid 8px #cdcdcd",
        marginTop: "-8px",
    },
    "&::after": {
        borderTop: "solid 7px transparent",
        borderBottom: "solid 7px transparent",
        borderLeft: "solid 7px #fff",
        marginTop: "-7px",
    },
};
exports.chartContainer = glamor_1.css(chartContainerStyle).toString();
exports.focusLegend = glamor_1.css(focusLegendStyle).toString();
exports.focusLegendAbove = glamor_1.css(focusLegendAboveStyle).toString();
exports.focusLegendBelow = glamor_1.css(focusLegendBelowStyle).toString();
exports.focusLegendRight = glamor_1.css(focusLegendRightStyle).toString();
exports.focusLegendLeft = glamor_1.css(focusLegendLeftStyle).toString();
exports.legend = glamor_1.css(legendStyle).toString();
exports.legendTopBottom = glamor_1.css(legendTopBottomStyle).toString();
exports.seriesLegend = glamor_1.css(seriesLegendStyle).toString();
exports.drawingContainer = glamor_1.css(drawingContainerStyle).toString();
exports.rule = glamor_1.css(ruleStyle).toString();
exports.componentFocus = glamor_1.css(componentFocusStyle).toString();
//# sourceMappingURL=styles.js.map