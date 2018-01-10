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
var glamorous_1 = require("glamorous");
var TitleType = glamorous_1.default.h1(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.title, { label: "titletype" }));
});
exports.TitleType = TitleType;
var Heading1Type = glamorous_1.default.h1(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.heading1, { label: "heading1type" }));
});
exports.Heading1Type = Heading1Type;
var Heading2Type = glamorous_1.default.h2(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.heading2, { label: "heading2type" }));
});
exports.Heading2Type = Heading2Type;
var BodyType = glamorous_1.default.p(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body, { label: "bodytype" }));
});
exports.BodyType = BodyType;
var SmallType = glamorous_1.default.p(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.small, { label: "smalltype" }));
});
exports.SmallType = SmallType;
//# sourceMappingURL=Typography.js.map