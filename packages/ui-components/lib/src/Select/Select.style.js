"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
exports.default = function (_a) {
    var theme = _a.theme, color = _a.color, disabled = _a.disabled;
    var backgroundColor = color && theme.colors ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors[color]) : "white";
    return {
        backgroundColor: backgroundColor,
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: theme.spacing / 2,
        paddingRight: theme.spacing / 2 + 40,
        width: "fit-content",
        minHeight: 20,
        border: "1px solid",
        borderColor: theme.colors.grey30,
        opacity: disabled ? 0.5 : 1,
        cursor: "pointer",
        color: contiamo_ui_utils_1.readableTextColor(backgroundColor)(["black", "white"]),
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
            borderTopColor: theme.colors.grey70,
            transform: "translateY(calc(-50% + 2px))"
        },
        // spinner when loading.
        "&.Select_updating::after": {
            top: 6,
            width: 16,
            height: 16,
            border: 0,
            borderRadius: "50%",
            boxShadow: "1px 0px 0px 0px " + theme.colors.grey70 + " inset",
            animation: ".7s " + contiamo_ui_utils_1.spin + " linear infinite"
        },
        "& .Select__options": {
            position: "absolute",
            top: "calc(100% + 1px)",
            left: 0,
            zIndex: theme.baseZIndex + 100,
            width: "100%",
            boxShadow: "0 2px 7px 2px rgba(0, 0, 0, .14)",
            opacity: 0,
            transform: "translateY(-10px)",
            animation: contiamo_ui_utils_1.fadeIn + " .15s forwards ease,\n        " + contiamo_ui_utils_1.resetTransform + " .15s forwards ease"
        },
        "& .Select__options_list": {
            maxHeight: "50vh"
        }
    };
};
//# sourceMappingURL=Select.style.js.map