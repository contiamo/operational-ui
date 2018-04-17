"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glamor_1 = require("glamor");
var theme_1 = require("@operational/theme");
var tickStyle = {
    fill: theme_1.operational.colors.gray,
    fontSize: "11px",
    fontFamily: theme_1.operational.fontFamily,
    "&.weekend": {
        fill: "#9d261d"
    },
    "&.now": {
        fill: "#71a934"
    }
};
var xStyle = {
    textAnchor: "middle"
};
var y1Style = {
    textAnchor: "end"
};
var y2Style = {
    textAnchor: "start"
};
var borderStyle = {
    stroke: theme_1.operational.colors.lightGray,
    shapeRendering: "crispedges"
};
var componentRectStyle = {
    fill: "#fff"
};
var rulesStyle = {
    stroke: theme_1.operational.colors.lightGray,
    strokeWidth: "1",
    shapeRendering: "crispedges",
    "&.zero": {
        strokeWidth: "2"
    }
};
exports.tick = glamor_1.css(tickStyle).toString();
exports.x1 = glamor_1.css(xStyle).toString();
exports.x2 = glamor_1.css(xStyle).toString();
exports.y1 = glamor_1.css(y1Style).toString();
exports.y2 = glamor_1.css(y2Style).toString();
exports.border = glamor_1.css(borderStyle).toString();
exports.componentRect = glamor_1.css(componentRectStyle).toString();
exports.rules = glamor_1.css(rulesStyle).toString();
//# sourceMappingURL=styles.js.map