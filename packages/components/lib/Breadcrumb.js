"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Icon_1 = require("./Icon");
var Container = glamorous_1.default.span(function (_a) {
    var theme = _a.theme;
    return ({
        color: theme.colors.linkText,
        "& svg": {
            marginLeft: 4
        }
    });
});
var Content = glamorous_1.default.span(function (_a) {
    var theme = _a.theme;
    return ({
        borderBottom: "1px solid currentColor"
    });
});
exports.default = function (props) {
    var reactFeatherIcon = props.icon === String(props.icon) ? props.icon : "ChevronDown";
    return (React.createElement(Container, { className: props.className, css: props.css },
        React.createElement(Content, null, props.children),
        props.icon ? props.icon === String(props.icon) ? React.createElement(Icon_1.default, { name: reactFeatherIcon, size: 12 }) : props.icon : null));
};
//# sourceMappingURL=Breadcrumb.js.map