"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        "& > div": {
            margin: 0
        },
        "& > div:not(:first-child)": {
            borderLeft: 0,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
        },
        "& > div:not(:last-child)": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
        }
    });
});
var ButtonGroup = function (_a) {
    var css = _a.css, key = _a.key, children = _a.children, className = _a.className;
    return (React.createElement(Container, { key: key, css: css, className: className }, children));
};
exports.default = ButtonGroup;
//# sourceMappingURL=ButtonGroup.js.map