"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glamorous_1 = require("glamorous");
var utils_1 = require("@operational/utils");
var theme_1 = require("@operational/theme");
var mixins = require("../utils/mixins");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, disabled = _a.disabled, style = _a.style;
    var backgroundColor = theme_1.expandColor(theme, color) || theme.colors.white;
    return {
        backgroundColor: backgroundColor,
        label: "select",
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: theme.spacing * 2 / 3,
        borderRadius: 4,
        paddingRight: theme.spacing / 2 + 40,
        width: "fit-content",
        minWidth: 240,
        minHeight: 20,
        border: "1px solid",
        borderColor: "rgb(208, 217, 229)",
        opacity: disabled ? 0.5 : 1,
        cursor: "pointer",
        color: utils_1.readableTextColor(backgroundColor, ["black", "white"]),
        outline: "none",
        pointerEvents: disabled ? "none" : "all",
        // downward caret.
        "&::after": {
            content: "''",
            position: "absolute",
            top: "50%",
            right: theme.spacing / 2,
            width: 0,
            height: 0,
            border: "4px solid transparent",
            borderTopColor: theme.colors.gray70,
            transform: "translateY(calc(-50% + 2px))"
        },
        "&:focus": mixins.inputFocus({ theme: theme })
    };
});
exports.Container = Container;
var DisplayValue = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, isPlaceholder = _a.isPlaceholder;
    return ({
        color: isPlaceholder ? theme.colors.gray60 : theme.colors.black
    });
});
exports.DisplayValue = DisplayValue;
var Options = glamorous_1.default.div({
    position: "absolute",
    top: "calc(100% + 6px)",
    left: 0,
    width: "100%",
    overflow: "hidden",
    borderRadius: 4,
    opacity: 0,
    transform: "translateY(-10px)",
    animation: utils_1.fadeIn + " .15s forwards ease,\n    " + utils_1.resetTransform + " .15s forwards ease"
}, function (_a) {
    var theme = _a.theme;
    return ({
        boxShadow: theme.shadows.popup,
        zIndex: theme.baseZIndex + 100
    });
});
exports.Options = Options;
var OptionsList = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        // whole number + 3/4 ratio here ensures options don't get cut off
        maxHeight: theme.spacing * 12.75,
        overflow: "auto"
    });
});
exports.OptionsList = OptionsList;
//# sourceMappingURL=Select.style.js.map