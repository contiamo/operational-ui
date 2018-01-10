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
    return ({
        display: "inline-block"
    });
});
var Label = glamorous_1.default.label(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body, { textTransform: "uppercase", opacity: 0.8, display: "inline-block", marginBottom: theme.spacing / 4 }));
});
var withLabel = function (Component) {
    return function (props) {
        var id = props.id, label = props.label;
        var domId = id || (label && label.toLowerCase ? label.toLowerCase().replace(/\s/g, "-") : null);
        return (React.createElement(Container, { className: props.className, css: props.css },
            props.label && React.createElement(Label, { htmlFor: domId }, props.label),
            props.label && React.createElement("br", null),
            React.createElement(Component, __assign({}, props, { domId: domId }))));
    };
};
exports.default = withLabel;
//# sourceMappingURL=with-label.js.map