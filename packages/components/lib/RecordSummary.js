"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "recordsummary",
        padding: theme.spacing / 2 + "px " + theme.spacing + "px",
        "& > div": {
            display: "inline-block",
            marginRight: theme.spacing / 2
        }
    });
});
var RecordSummary = function (props) { return (React.createElement(Container, { css: props.css, className: props.className }, props.children)); };
exports.default = Object.assign(RecordSummary, {
    defaultProps: {
        __isRecordSummary: true
    }
});
//# sourceMappingURL=RecordSummary.js.map