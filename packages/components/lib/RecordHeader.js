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
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({ label: "recordheader" }, theme.typography.heading2, { display: "flex", alignItems: "center", justifyContent: "space-between", height: 48, padding: theme.spacing / 2 + "px " + theme.spacing + "px", "& > div": {
            display: "inline-block",
            marginRight: theme.spacing / 2
        } }));
});
var RecordHeader = function (props) { return (React.createElement(Container, { css: props.css, className: props.className }, props.children)); };
exports.default = Object.assign(RecordHeader, {
    defaultProps: {
        __isRecordHeader: true
    }
});
//# sourceMappingURL=RecordHeader.js.map