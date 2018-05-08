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
var react_1 = require("react");
var glamorous_1 = require("glamorous");
var _1 = require("./");
var AvatarCollection = function (_a) {
    var _b = _a.people, people = _b === void 0 ? [] : _b, _c = _a.size, size = _c === void 0 ? 32 : _c, _d = _a.css, css = _d === void 0 ? {} : _d;
    return (react_1.default.createElement(glamorous_1.Div, { css: __assign({ display: "flex" }, css) }, people.map(function (person, index) { return (react_1.default.createElement(_1.Avatar, { key: index, css: function (_a) {
            var theme = _a.theme;
            return ({
                ":not(:first-child)": { marginLeft: theme.spacing * -0.5, boxShadow: "-2px 0 0 1px white" },
            });
        }, size: size, name: person.name, photo: person.photo })); })));
};
exports.default = AvatarCollection;
//# sourceMappingURL=AvatarCollection.js.map