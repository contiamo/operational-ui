"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "recordbody",
        borderTop: "1px solid",
        padding: theme.spacing + "px " + theme.spacing + "px",
        borderColor: theme.colors.gray20,
        "& > div": {
            display: "inline-block",
            marginRight: theme.spacing
        }
    });
});
var RecordBody = function (props) { return (React.createElement(Container, { css: props.css, className: props.className }, props.children)); };
exports.default = Object.assign(RecordBody, {
    defaultProps: {
        __isRecordBody: true
    }
});
//# sourceMappingURL=RecordBody.js.map