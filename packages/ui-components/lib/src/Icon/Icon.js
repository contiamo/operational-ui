"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @todo -> type this better
var React = require("react");
var ReactFeather = require("react-feather");
var glamorous_1 = require("glamorous");
var Icon = function (_a) {
    var name = _a.name, size = _a.size, theme = _a.theme;
    // @todo -> this, better
    var IconLib = ReactFeather;
    if (IconLib.hasOwnProperty(name)) {
        var Comp = IconLib[name];
        return React.createElement(Comp, { size: size || theme.spacing });
    }
    else {
        return React.createElement("div", null, "Icon doesn't exist");
    }
};
exports.default = glamorous_1.withTheme(Icon);
//# sourceMappingURL=Icon.js.map