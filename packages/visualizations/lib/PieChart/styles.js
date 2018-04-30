"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glamor_1 = require("glamor");
var styles_1 = require("../utils/styles");
var comparisonLegendStyle = {
    padding: "1px 3px 0 3px",
    float: "left",
    lineHeight: "14px",
    "& div.color": {
        width: "10px",
        height: "10px",
        margin: "2px 3px 0 0",
        float: "left"
    },
    "& div.name": {
        float: "left"
    }
};
var comparisonLegendLineStyle = {
    width: "4px",
    height: "0px",
    border: "1px solid #747474",
    margin: "5px 3px 3px 3px",
    float: "left"
};
exports.comparisonLegend = styles_1.seriesLegend;
exports.comparisonLegendLine = glamor_1.css(comparisonLegendLineStyle).toString();
//# sourceMappingURL=styles.js.map