"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Picture = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, photo = _a.photo;
    return ({
        marginRight: theme.spacing / 2,
        width: theme.spacing * 2.5,
        height: theme.spacing * 2.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: photo && "url(" + photo + ")",
    });
});
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        display: "block",
    });
});
var NameContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        display: "block",
    });
});
var getInitials = function (name) {
    if (!name) {
        return "";
    }
    var splitName = name.split(" ");
    return splitName[0].slice(0, 1) + splitName[splitName.length - 1].slice(0, 1);
};
var Avatar = function (props) { return (React.createElement(Container, { css: props.css, className: props.className },
    React.createElement(Picture, { photo: props.photo }, getInitials(props.name)),
    props.withName && React.createElement(NameContainer, null, props.name))); };
exports.default = Avatar;
//# sourceMappingURL=Avatar.js.map