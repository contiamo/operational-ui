"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        "& > *": {
            margin: 0,
            borderRadius: 0
        },
        "& > *:first-child": {
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2
        },
        "& > *:last-child": {
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2
        }
    });
});
var ButtonGroup = function (_a) {
    var children = _a.children, style = _a.style;
    return React.createElement(Container, { style: style }, children);
};
exports.default = ButtonGroup;
//# sourceMappingURL=ButtonGroup.js.map