"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var utils_1 = require("@operational/utils");
var _1 = require("../");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, selected = _a.selected;
    var backgroundColor = selected ? theme.colors.background : theme.colors.white;
    return {
        backgroundColor: backgroundColor,
        label: "selectoption",
        position: "relative",
        padding: theme.spacing / 2 + "px " + theme.spacing * 3 / 4 + "px",
        wordWrap: "break-word",
        outline: "none",
        borderTop: "1px solid",
        borderColor: utils_1.darken(theme.colors.background, 10),
        ":hover": {
            backgroundColor: utils_1.darken(theme.colors.background, 5),
        },
    };
});
var IconContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: theme.spacing * 1.25,
        height: theme.spacing * 1.25,
        backgroundColor: theme.colors.info,
        position: "absolute",
        top: "50%",
        right: 4,
        borderRadius: "50%",
        transform: "translate3d(0, -50%, 0)",
        "& svg": {
            color: theme.colors.white,
            width: theme.spacing * 0.75,
            height: theme.spacing * 0.75,
        },
    });
});
var SelectOption = function (props) { return (React.createElement(Container, { key: props.id, css: props.css, className: props.className, selected: Boolean(props.selected), tabIndex: -2, role: "option", "aria-selected": props.selected, onClick: function (ev) {
        ev.stopPropagation();
        props.onClick && props.onClick();
    } },
    props.children,
    props.selected ? (React.createElement(IconContainer, null,
        React.createElement(_1.Icon, { name: "Check", size: 10 }))) : null)); };
exports.default = SelectOption;
//# sourceMappingURL=Select.Option.js.map