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
var utils_1 = require("@operational/utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, disabled = _a.disabled, updating = _a.updating, style = _a.style;
    var backgroundColor = color && theme.colors ? utils_1.hexOrColor(color)(theme.colors[color]) : "white";
    var updatingAfterStyles = updating
        ? {
            top: 6,
            width: 16,
            height: 16,
            border: 0,
            borderRadius: "50%",
            boxShadow: "1px 0px 0px 0px " + theme.colors.gray70 + " inset",
            animation: ".7s " + utils_1.spin + " linear infinite"
        }
        : {};
    return {
        backgroundColor: backgroundColor,
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: theme.spacing * 2 / 3,
        borderRadius: 2,
        paddingRight: theme.spacing / 2 + 40,
        width: "fit-content",
        minHeight: 20,
        border: "1px solid",
        borderColor: theme.colors.gray30,
        opacity: disabled ? 0.5 : 1,
        cursor: "pointer",
        color: utils_1.readableTextColor(backgroundColor)(["black", "white"]),
        outline: "none",
        pointerEvents: disabled ? "none" : "all",
        // downward caret.
        "&::after": __assign({}, updatingAfterStyles, { content: "''", position: "absolute", top: "50%", right: theme.spacing / 2, width: 0, height: 0, border: "4px solid transparent", borderTopColor: theme.colors.gray70, transform: "translateY(calc(-50% + 2px))" }),
        "&:focus": {
            borderColor: "rgba(82,168,236,.8)",
            boxShadow: theme.shadows.focus
        }
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
    top: "calc(100% + 1px)",
    left: 0,
    width: "100%",
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