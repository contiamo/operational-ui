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
var arcStyle = {
    strokeWidth: "1",
    opacity: 0.8,
    fill: "#eee",
    "&.zoomable": {
        cursor: "zoom-in"
    },
    "&.zoomed": {
        cursor: "zoom-out"
    },
    "&.zoomed.parent": {
        cursor: "default"
    }
};
var labelStyle = __assign({ fill: "#333", stroke: "none" }, theme_1.operational.typography.small);
var totalStyle = __assign({ fill: "#4c4c4c" }, theme_1.operational.typography.small);
var breadcrumbStyle = {
    width: "100%",
    height: "40px",
    position: "relative",
    overflow: "hidden"
};
var breadcrumbItemStyle = {
    float: "left",
    width: "80px",
    height: "26px",
    position: "relative",
    paddingLeft: "20px",
    lineHeight: "26px",
    cursor: "pointer",
    margin: "5px 0",
    "&:first-child": {
        paddingLeft: "5px"
    },
    "&.hops": {
        width: "40px"
    },
    "& .label": {
        pointerEvents: "none",
        float: "left",
        display: "block",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        width: "65px"
    },
    "& .background-arrow": {
        content: "''",
        position: "absolute",
        width: 0,
        height: 0,
        borderLeft: "solid 15px #fff",
        borderTop: "solid 15px transparent",
        borderBottom: "solid 15px transparent",
        top: "50%",
        left: "100%",
        marginTop: "-15px",
        zIndex: "2"
    },
    "& .arrow": {
        content: "''",
        position: "absolute",
        width: 0,
        height: 0,
        borderLeft: "solid 13px #fff",
        borderTop: "solid 13px transparent",
        borderBottom: "solid 13px transparent",
        top: "50%",
        left: "100%",
        marginTop: "-13px",
        zIndex: "3"
    }
};
var centerCircleStyle = {
    fill: "#fff",
    pointerEvents: "none"
};
var rootLabelStyle = {
    position: "absolute",
    textAlign: "center",
    pointerEvents: "none",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "& .name": __assign({}, theme_1.operational.typography.small),
    "& .value": __assign({}, theme_1.operational.typography.heading1)
};
exports.arc = glamor_1.css(arcStyle).toString();
exports.label = glamor_1.css(labelStyle).toString();
exports.total = glamor_1.css(totalStyle).toString();
exports.breadcrumb = glamor_1.css(breadcrumbStyle).toString();
exports.breadcrumbItem = glamor_1.css(breadcrumbItemStyle).toString();
exports.centerCircle = glamor_1.css(centerCircleStyle).toString();
exports.rootLabel = glamor_1.css(rootLabelStyle).toString();
//# sourceMappingURL=styles.js.map