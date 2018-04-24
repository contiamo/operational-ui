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
var Title = glamorous_1.default.h1(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.title, { margin: theme.spacing + "px 0", label: "titletype" }));
});
exports.Title = Title;
var Heading1 = glamorous_1.default.h1(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.heading1, { margin: theme.spacing / 2 + "px 0", label: "heading1type" }));
});
exports.Heading1 = Heading1;
var Heading2 = glamorous_1.default.h2(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.heading2, { margin: theme.spacing / 2 + "px 0", label: "heading2type" }));
});
exports.Heading2 = Heading2;
var Body = glamorous_1.default.p(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body, { margin: theme.spacing / 4 + "px 0", label: "bodytype" }));
});
exports.Body = Body;
var Small = glamorous_1.default.p(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.small, { margin: theme.spacing / 4 + "px 0", label: "smalltype" }));
});
exports.Small = Small;
//# sourceMappingURL=Typography.js.map