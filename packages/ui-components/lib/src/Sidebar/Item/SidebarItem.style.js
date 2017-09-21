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
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
exports.default = function (_a) {
    var theme = _a.theme, children = _a.children;
    // If we have children, style a caret.
    var caret = children
        ? {
            content: '""',
            display: "block",
            width: 0,
            height: 0,
            marginLeft: "auto",
            border: "4px solid transparent",
            borderLeftColor: theme.colors.grey20,
            transition: ".15s transform ease"
        }
        : {};
    return {
        position: "relative",
        "& .header": {
            position: "relative",
            display: "flex",
            alignItems: "center",
            padding: theme.spacing / 2,
            borderTop: "1px solid",
            borderTopColor: theme.colors.grey10,
            cursor: "pointer",
            outline: "none",
            backgroundColor: theme.colors.white
        },
        "& .header:hover": {
            backgroundColor: theme.colors.grey10
        },
        "&.open .header": {
            borderBottom: "1px solid",
            borderBottomColor: theme.colors.grey20,
            fontWeight: 600,
            backgroundColor: theme.colors.grey10
        },
        // Caret styles begin here.
        "& .header::after": __assign({}, caret),
        "&:hover .header::after": {
            borderLeftColor: theme.colors.grey80
        },
        "&.open .header.open::after": {
            // rotate the caret to face down when an item is open.
            transform: "translateX(-2px) rotate(90deg)",
            borderLeftColor: theme.colors.grey80
        },
        // Spinner for async items replaces a caret.
        "&.updating .header::after": {
            width: 16,
            height: 16,
            border: 0,
            borderRadius: "50%",
            boxShadow: "1px 0px 0px 0px " + theme.colors.grey70 + " inset",
            animation: ".7s " + contiamo_ui_utils_1.spin + " linear infinite"
        },
        "& .content": {
            position: "relative",
            paddingLeft: theme.spacing
        }
    };
};
//# sourceMappingURL=SidebarItem.style.js.map