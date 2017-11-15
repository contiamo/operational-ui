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
        "& > span": __assign({}, theme.typography.body, { display: "inline-block", marginBottom: theme.spacing / 4 })
    });
});
var InputField = glamorous_1.default.input(function (_a) {
    var theme = _a.theme, disabled = _a.disabled;
    return ({
        minWidth: 200,
        padding: theme.spacing * 2 / 3,
        border: "1px solid",
        opacity: disabled ? 0.6 : 1.0,
        borderColor: "rgb(208, 217, 229)",
        font: "inherit",
        borderRadius: 2,
        WebkitAppearance: "none",
        "&:focus": {
            outline: 0,
            borderColor: "rgba(82,168,236,.8)",
            boxShadow: theme.shadows.focus
        }
    });
});
var Input = function (_a) {
    var css = _a.css, key = _a.key, className = _a.className, label = _a.label, domId = _a.domId, name = _a.name, disabled = _a.disabled, placeholder = _a.placeholder, value = _a.value, onChange = _a.onChange, onFocus = _a.onFocus, onBlur = _a.onBlur, inputRef = _a.inputRef;
    return (React.createElement(InputField, { key: key, css: css, innerRef: inputRef, className: className, id: domId, name: name, disabled: disabled, placeholder: placeholder, value: value, onFocus: onFocus, onBlur: onBlur, onChange: function (e) {
            onChange && onChange(e.target.value);
        } }));
};
exports.default = with_label_1.default(Input);
//# sourceMappingURL=Input.js.map