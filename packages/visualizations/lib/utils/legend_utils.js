"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundedUpWidth = function (el) {
    return Math.ceil(el.getBoundingClientRect().width);
};
exports.roundedUpHeight = function (el) {
    return Math.ceil(el.getBoundingClientRect().height);
};
exports.widthMargin = function (el) {
    if (!el) {
        return 0;
    }
    var style = window.getComputedStyle(el);
    return parseFloat(style.marginLeft) + parseFloat(style.marginRight);
};
exports.widthPadding = function (el) {
    if (!el) {
        return 0;
    }
    var style = window.getComputedStyle(el);
    return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
};
exports.heightMargin = function (el) {
    if (!el) {
        return 0;
    }
    var style = window.getComputedStyle(el);
    return parseFloat(style.marginTop) + parseFloat(style.marginBottom);
};
exports.totalWidth = function (el) {
    if (!el) {
        return 0;
    }
    var style = window.getComputedStyle(el), padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight), border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
    return exports.roundedUpWidth(el) + exports.widthMargin(el) - exports.widthPadding(el) + border;
};
exports.totalHeight = function (el) {
    if (!el) {
        return 0;
    }
    var style = window.getComputedStyle(el), padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom), border = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    return exports.roundedUpHeight(el) + exports.heightMargin(el) - padding + border;
};
//# sourceMappingURL=legend_utils.js.map