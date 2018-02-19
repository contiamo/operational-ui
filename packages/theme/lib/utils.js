"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Expands a color expressed either as a custom hex value
 * or a color key to pick from within the theme.colors object.
 */
exports.expandColor = function (theme, color) {
    if (!color) {
        return null;
    }
    var hexRegEx = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    var isHex = hexRegEx.test(color);
    if (isHex) {
        return color;
    }
    // || null is necessary to coerce undefineds into nulls
    return theme.colors[color] || null;
};
//# sourceMappingURL=utils.js.map