"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Avatar = function (_a) {
    var name = _a.name, photo = _a.photo, css = _a.css, _b = _a.withName, withName = _b === void 0 ? false : _b, _c = _a.size, size = _c === void 0 ? 50 : _c;
    var Container = withName
        ? glamorous_1.default.div({
            display: "flex",
            alignItems: "center",
        }, css)
        : glamorous_1.default.div({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: "50%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            textTransform: "uppercase",
        }, function (_a) {
            var theme = _a.theme;
            return ({
                width: size,
                height: size,
                backgroundColor: theme.colors.gray,
                backgroundImage: photo ? "url(" + photo + ")" : "none",
            });
        });
    var PictureContainer = glamorous_1.default.div(function (_a) {
        var theme = _a.theme;
        return ({ marginRight: theme.spacing / 2 });
    });
    var getInitials = function (name) {
        if (!name) {
            return "";
        }
        var splitName = name.split(" ");
        return splitName[0].slice(0, 1) + splitName[splitName.length - 1].slice(0, 1);
    };
    return withName ? (React.createElement(Container, null,
        React.createElement(PictureContainer, null,
            React.createElement(Avatar, { name: name, photo: photo, size: size })),
        React.createElement(glamorous_1.Div, null, name))) : (React.createElement(Container, { css: css, size: size }, !photo && getInitials(name)));
};
exports.default = Avatar;
//# sourceMappingURL=Avatar.js.map