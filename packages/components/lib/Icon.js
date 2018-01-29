"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactFeather = require("react-feather");
var glamorous_1 = require("glamorous");
var utils_1 = require("@operational/utils");
var BrandIcons = require("./Icon/BrandIcon");
var Icon = function (props) {
    var color_ = props.color && utils_1.hexOrColor(props.color)(props.theme.colors[props.color]);
    var defaultSize = props.theme.spacing * 1.5;
    if (ReactFeather.hasOwnProperty(props.name)) {
        var Comp = ReactFeather[props.name];
        return React.createElement(Comp, { key: props.id, size: props.size || defaultSize, color: color_ });
    }
    // @todo -> type this better
    if (BrandIcons.hasOwnProperty(props.name)) {
        var Comp = BrandIcons.OperationalUI;
        if (props.name === "Labs") {
            Comp = BrandIcons.Labs;
        }
        if (props.name === "Components") {
            Comp = BrandIcons.Components;
        }
        if (props.name === "Blocks") {
            Comp = BrandIcons.Blocks;
        }
        if (props.name === "Visualizations") {
            Comp = BrandIcons.Visualizations;
        }
        if (props.name === "Documentation") {
            Comp = BrandIcons.Documentation;
        }
        return React.createElement(Comp, { key: props.id, size: props.size || defaultSize, color: color_, rotation: props.rotation });
    }
    return null;
};
var WrappedIcon = glamorous_1.withTheme(Icon);
exports.default = WrappedIcon;
//# sourceMappingURL=Icon.js.map