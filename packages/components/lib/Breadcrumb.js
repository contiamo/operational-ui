"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var utils_1 = require("@operational/utils");
var Icon_1 = require("./Icon");
var Container = glamorous_1.default.span(function (_a) {
    var theme = _a.theme;
    return ({
        label: "breadcrumb",
        color: theme.colors.linkText,
        "& svg": {
            marginLeft: 4
        },
        "&:hover": {
            color: utils_1.darken(theme.colors.linkText, 5)
        }
    });
});
var Content = glamorous_1.default.span(function (_a) {
    var theme = _a.theme;
    return ({
        borderBottom: "1px solid currentColor"
    });
});
var Breadcrumb = function (props) {
    var reactFeatherIcon = props.icon === String(props.icon) ? props.icon : "ChevronDown";
    return (React.createElement(Container, { className: props.className, css: props.css },
        React.createElement(Content, null, props.children),
        props.icon ? props.icon === String(props.icon) ? React.createElement(Icon_1.default, { name: reactFeatherIcon, size: 12 }) : props.icon : null));
};
exports.default = Breadcrumb;
//# sourceMappingURL=Breadcrumb.js.map