"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        width: 5,
        height: 5,
        margin: "0 " + theme.spacing + "px",
        borderRadius: "50%",
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    });
});
var HeaderSeparator = function (_a) {
    var style = _a.style, className = _a.className;
    return React.createElement("div", { style: style, className: className });
};
exports.default = HeaderSeparator;
//# sourceMappingURL=HeaderSeparator.js.map