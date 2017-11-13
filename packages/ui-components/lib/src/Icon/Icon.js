"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @todo -> type this better
var React = require("react");
var ReactFeather = require("react-feather");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Icon = function (_a) {
    var name = _a.name, size = _a.size, color = _a.color, theme = _a.theme;
    var defaultColor = theme.colors.palette.grey90;
    var color_ = color
        ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette[color] || defaultColor)
        : defaultColor;
    if (ReactFeather.hasOwnProperty(name)) {
        var Comp = ReactFeather[name];
        return React.createElement(Comp, { size: size || theme.spacing, color: color_ });
    }
    else {
        return null;
    }
};
var WrappedIcon = glamorous_1.withTheme(Icon);
exports.default = WrappedIcon;
//# sourceMappingURL=Icon.js.map