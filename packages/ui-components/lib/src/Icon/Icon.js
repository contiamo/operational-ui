"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @todo -> type this better
var React = require("react");
var ReactFeather = require("react-feather");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Icon = function (_a) {
    var name = _a.name, size = _a.size, color = _a.color, theme = _a.theme;
    var defaultColor = theme.colors.palette.black;
    var color_ = color ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette[color] || defaultColor) : defaultColor;
    // @todo -> this, better
    var IconLib = ReactFeather;
    if (IconLib.hasOwnProperty(name)) {
        var Comp = IconLib[name];
        return React.createElement(Comp, { size: size || theme.spacing, color: color_ });
    }
    else {
        return React.createElement("div", null, "Icon doesn't exist");
    }
};
exports.default = glamorous_1.withTheme(Icon);
//# sourceMappingURL=Icon.js.map