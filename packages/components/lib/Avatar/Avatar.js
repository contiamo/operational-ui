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
var theme_1 = require("@operational/theme");
var utils_1 = require("@operational/utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "avatar",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        maxWidth: 180,
    });
});
var NameContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body, { display: "block" }));
});
var Name = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body, { lineHeight: 1.25, margin: 0 }));
});
var Title = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body, { color: theme.colors.gray, lineHeight: 1.25, margin: 0 }));
});
var Picture = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, colorAssignment = _a.colorAssignment, photo = _a.photo;
    var defaultColor = theme.colors.info;
    var fixedBackgroundColor = color ? theme_1.expandColor(theme, color) || defaultColor : defaultColor;
    var assignedBackgroundColor = colorAssignment
        ? theme.colors.visualizationPalette[colorAssignment % theme.colors.visualizationPalette.length]
        : null;
    var backgroundColor = assignedBackgroundColor || fixedBackgroundColor;
    var textColor = utils_1.readableTextColor(backgroundColor, [theme.colors.text, "white"]);
    return __assign({}, theme.typography.heading1, { textTransform: "uppercase", marginRight: theme.spacing * 0.5, width: theme.spacing * 2.75, height: theme.spacing * 2.75, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }, photo
        ? {
            background: "url(" + photo + ")",
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            color: theme.colors.white,
        }
        : { backgroundColor: backgroundColor, color: textColor });
});
var getInitials = function (name) {
    if (!name) {
        return "";
    }
    var splitName = name.split(" ");
    return splitName[0].slice(0, 1) + splitName[splitName.length - 1].slice(0, 1);
};
var Avatar = function (props) {
    var initials = getInitials(props.name);
    var colorAssignmentNumber = props.assignColor
        ? [initials.charCodeAt(0), initials.charCodeAt(1)].reduce(function (accumulator, current) { return accumulator + (!current || isNaN(current) ? 0 : current); }, 0)
        : undefined;
    return (React.createElement(Container, { css: props.css, className: props.className },
        React.createElement(Picture, { photo: props.photo, color: props.color, colorAssignment: colorAssignmentNumber, className: "opui_avatar-picture" }, props.hideInitials || props.photo ? "" : initials),
        props.showName && (React.createElement(NameContainer, { className: "opui_name-container" },
            React.createElement(Name, null, props.name),
            props.title && React.createElement(Title, null, props.title)))));
};
exports.default = Avatar;
//# sourceMappingURL=Avatar.js.map