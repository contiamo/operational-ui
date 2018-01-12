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
var utils_1 = require("@operational/utils");
var Line = glamorous_1.default.div({
    position: "absolute",
    left: 5,
    top: 6,
    height: "100%"
}, function (_a) {
    var theme = _a.theme;
    return ({
        borderLeft: "1px solid " + theme.colors.gray30
    });
});
var StatusContainer = glamorous_1.default.div({
    border: "2px solid transparent",
    borderRadius: "50%",
    height: 11,
    position: "absolute",
    top: 6,
    width: 11
}, function (_a) {
    var theme = _a.theme, color = _a.color;
    return ({
        backgroundColor: "" + color
    });
});
var Content = glamorous_1.default.div({
    padding: "0 0 5px 26px",
    position: "relative",
    top: 0,
    "& > *": {
        margin: 0
    },
    "& p": {
        marginBottom: 0
    }
}, function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body));
});
var Container = glamorous_1.default.li({
    label: "timelineitem",
    listStyle: "none",
    margin: 0,
    padding: "0 0 24px",
    position: "relative",
    "&:last-child > :first-child": {
        display: "none"
    }
});
var TimelineItem = function (_a) {
    var css = _a.css, id = _a.id, className = _a.className, children = _a.children, _b = _a.color, color = _b === void 0 ? "info" : _b, _c = _a.icon, icon = _c === void 0 ? "" : _c, theme = _a.theme;
    var statusColor = utils_1.hexOrColor(color)(theme.colors[color] || theme.colors.info);
    return (React.createElement(Container, { key: id, css: css, className: className },
        React.createElement(Line, null),
        React.createElement(StatusContainer, { color: statusColor }),
        React.createElement(Content, null, children)));
};
var WrappedTimelineItem = glamorous_1.withTheme(TimelineItem);
exports.default = WrappedTimelineItem;
//# sourceMappingURL=TimelineItem.js.map