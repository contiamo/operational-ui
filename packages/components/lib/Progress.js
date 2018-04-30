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
var glamor_1 = require("glamor");
var Icon_1 = require("./Icon");
var width = 120;
var height = 45;
var padding = 15;
var Container = glamorous_1.default.div({
    label: "progress",
    width: "100%",
    overflowX: "hidden",
    textAlign: "center",
    top: 0,
    left: 0,
    position: "absolute",
}, function (_a) {
    var theme = _a.theme, fadeParent = _a.fadeParent;
    return ({
        zIndex: theme.baseZIndex + 300,
        backgroundColor: fadeParent ? "rgba(255, 255, 255, 0.8)" : "transparent",
    });
});
var fillProgress = glamor_1.css.keyframes({
    from: {
        transform: "translate3d(-100%, 0, 0)",
    },
    to: {
        transform: "translate3d(0, 0, 0)",
    },
});
var Bar = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, isError = _a.isError;
    return (__assign({ width: "100%", height: 3, backgroundColor: theme.colors.info }, isError
        ? {
            backgroundColor: theme.colors.error,
        }
        : {
            animation: fillProgress + " cubic-bezier(0, 0.9, 0.26, 1) forwards 20s",
        }));
});
var ErrorMessage = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body, { minWidth: 160, maxWidth: 480, padding: theme.spacing / 6 + "px " + theme.spacing / 2 + "px", borderBottomLeftRadius: 2, borderBottomRightRadius: 2, display: "inline-block", position: "relative", zIndex: theme.baseZIndex + 301, textAlign: "center", backgroundColor: theme.colors.error, color: theme.colors.white }));
});
var RetryLink = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        opacity: 0.7,
        display: "inline-block",
        marginLeft: theme.spacing * 3 / 4,
        userSelect: "none",
        "& svg": {
            marginRight: theme.spacing / 3,
        },
        ":hover": {
            opacity: 1,
        },
    });
});
var Progress = function (props) { return (React.createElement(Container, { id: props.id, css: props.css, className: props.className, fadeParent: !!props.fadeParent },
    React.createElement(Bar, { isError: Boolean(props.error) }),
    props.error ? (React.createElement(ErrorMessage, null,
        props.error,
        props.onRetry ? (React.createElement(RetryLink, { onClick: props.onRetry },
            React.createElement(Icon_1.default, { name: "RefreshCw", size: 10 }),
            "Retry")) : null)) : null)); };
exports.default = Progress;
//# sourceMappingURL=Progress.js.map