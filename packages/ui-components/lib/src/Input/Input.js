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
var React = require("react");
var glamorous_1 = require("glamorous");
var with_label_1 = require("../../utils/with-label");
var Label = glamorous_1.default.label(function (_a) {
    var theme = _a.theme;
    return ({
        "& > span": __assign({}, theme.typography.body, { display: "inline-block", marginBottom: theme.spacing / 3 })
    });
});
var InputField = glamorous_1.default.input(function (_a) {
    var theme = _a.theme;
    return ({
        padding: theme.spacing / 2,
        border: "1px solid",
        borderColor: theme.colors.palette.grey30,
        font: "inherit",
        WebkitAppearance: "none"
    });
});
var Input = function (_a) {
    var css = _a.css, className = _a.className, label = _a.label, domId = _a.domId, name = _a.name, placeholder = _a.placeholder, value = _a.value, onChange = _a.onChange, onFocus = _a.onFocus, onBlur = _a.onBlur, inputRef = _a.inputRef;
    return (React.createElement(InputField, { css: css, innerRef: inputRef, className: className, id: domId, name: name, placeholder: placeholder, value: value, onFocus: onFocus, onBlur: onBlur, onChange: function (e) {
            onChange && onChange(e.target.value);
        } }));
};
exports.default = with_label_1.default(Input);
//# sourceMappingURL=Input.js.map