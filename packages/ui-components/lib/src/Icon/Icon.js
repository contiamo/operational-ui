"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @todo -> type this better
var React = require("react");
var ReactFeather = require("react-feather");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Icon = function (props) {
    var defaultColor = props.theme.colors.palette.grey90;
    var color_ = props.color
        ? contiamo_ui_utils_1.hexOrColor(props.color)(props.theme.colors.palette[props.color] || defaultColor)
        : defaultColor;
    if (ReactFeather.hasOwnProperty(props.name)) {
        var Comp = ReactFeather[props.name];
        return React.createElement(Comp, { key: props.id, size: props.size || props.theme.spacing, color: color_ });
    }
    return null;
};
var WrappedIcon = glamorous_1.withTheme(Icon);
exports.default = WrappedIcon;
//# sourceMappingURL=Icon.js.map