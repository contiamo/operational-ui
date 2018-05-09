"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var _1 = require("./");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "avatar-group",
        display: "flex"
    });
});
var AvatarGroup = function (_a) {
    var _b = _a.people, people = _b === void 0 ? [] : _b, _c = _a.size, size = _c === void 0 ? 32 : _c, _d = _a.css, css = _d === void 0 ? {} : _d;
    return (React.createElement(Container, null, people.map(function (person, index) { return (React.createElement(_1.Avatar, { key: index, css: function (_a) {
            var theme = _a.theme;
            return ({
                ":not(:first-child)": { marginLeft: theme.spacing * -0.5, boxShadow: "-2px 0 0 1px white" },
            });
        }, size: size, name: person.name, photo: person.photo })); })));
};
exports.default = AvatarGroup;
//# sourceMappingURL=AvatarGroup.js.map