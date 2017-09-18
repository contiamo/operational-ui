"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var style = function (_a) {
    var theme = _a.theme;
    return ({
        width: 5,
        height: 5,
        margin: "0 " + theme.spacing + "px",
        borderRadius: "50%",
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    });
};
var HeaderSeparator = function (_a) {
    var className = _a.className;
    return React.createElement("div", { className: className });
};
exports.HeaderSeparator = HeaderSeparator;
exports.default = glamorous_1.default(HeaderSeparator)(style);
//# sourceMappingURL=HeaderSeparator.js.map