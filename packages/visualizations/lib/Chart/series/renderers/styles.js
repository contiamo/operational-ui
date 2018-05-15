"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glamor_1 = require("glamor");
var theme_1 = require("@operational/theme");
var areaStyle = {
    "& path": {
        opacity: "0.6",
    },
    "& path:hover": {
        opacity: "0.8",
    },
};
var barStyle = {
    "& rect": {
        opacity: 0.8,
        shapeRendering: "crispedges",
    },
    "& rect:hover": {
        opacity: 1,
    },
};
var lineStyle = {
    "& path": {
        strokeWidth: 2,
        fill: "none",
    },
    "& path:hover": {
        strokeWidth: 4,
    },
    "& path.dashed": {
        strokeDasharray: "6, 4",
    },
};
var symbolStyle = {
    "& path": {
        strokeWidth: "2px",
    },
    "& path:hover": {
        strokeWidth: "3px",
    },
};
var textStyle = {
    "& text": {
        fill: "#333",
        fontFamily: theme_1.operational.fontFamily,
    },
};
exports.area = glamor_1.css(areaStyle).toString();
exports.bar = glamor_1.css(barStyle).toString();
exports.line = glamor_1.css(lineStyle).toString();
exports.symbol = glamor_1.css(symbolStyle).toString();
exports.text = glamor_1.css(textStyle).toString();
//# sourceMappingURL=styles.js.map