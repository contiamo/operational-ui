"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var TimelineItem_1 = require("./TimelineItem");
exports.TimelineItem = TimelineItem_1.default;
var Container = glamorous_1.default.ul({
    listStyle: "none",
    padding: "0",
    margin: "0"
});
var Timeline = function (_a) {
    var key = _a.key, css = _a.css, className = _a.className, children = _a.children;
    return (React.createElement(Container, { key: key, css: css, className: className }, children));
};
exports.Timeline = Timeline;
exports.default = Timeline;
//# sourceMappingURL=Timeline.js.map