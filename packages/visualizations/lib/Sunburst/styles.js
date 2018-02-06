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
    padding: "10px 5px",
    "& svg": {
        width: "100%",
        height: "21px"
    },
    "& polygon": {
        opacity: "0.5",
        cursor: "pointer"
    },
    "& text": {
        pointerEvents: "none"
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
exports.centerCircle = glamor_1.css(centerCircleStyle).toString();
exports.rootLabel = glamor_1.css(rootLabelStyle).toString();
//# sourceMappingURL=styles.js.map