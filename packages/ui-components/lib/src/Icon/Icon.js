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
// @todo -> type this better
var React = require("react");
var ReactFeather = require("react-feather");
var glamorous_1 = require("glamorous");
var sizeFactors = {
    small: 0.5,
    medium: 1,
    large: 2
};
var Icon = function (_a) {
    var _b = _a.name, name = _b === void 0 ? "Play" : _b, _c = _a.size, size = _c === void 0 ? "medium" : _c, sizeOverride = _a.sizeOverride, theme = _a.theme;
    var pixelSize = sizeOverride || theme.spacing * sizeFactors[size];
    var props = {
        size: pixelSize
    };
    // @todo -> this, better
    var IconLib = ReactFeather;
    if (IconLib.hasOwnProperty(name)) {
        var Comp = IconLib[name];
        return React.createElement(Comp, __assign({}, props));
    }
    else {
        return React.createElement("div", null, "Icon doesn't exist");
    }
};
exports.default = glamorous_1.withTheme(Icon);
//# sourceMappingURL=Icon.js.map