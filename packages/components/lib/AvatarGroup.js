"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "avatar-group",
        display: "flex",
        "& :not(:first-child)": {
            marginLeft: theme.spacing * -1,
            "& > .opui_avatar-picture": { boxShadow: "-1px 0 0 1px white" },
        },
        "& .opui_name-container": {
            display: "none"
        }
    });
});
var AvatarGroup = function (props) { return (React.createElement(Container, { css: props.css, className: props.className }, props.children)); };
exports.default = AvatarGroup;
//# sourceMappingURL=AvatarGroup.js.map