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
var with_label_1 = require("./utils/with-label");
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
var Input = function (props) {
    return (React.createElement(InputField, { key: props.id, css: props.css, innerRef: props.inputRef, className: props.className, id: props.domId, name: props.name, disabled: props.disabled, placeholder: props.placeholder, value: props.value, type: props.type, onFocus: props.onFocus, onBlur: props.onBlur, onChange: function (e) {
            props.onChange && props.onChange(e.target.value);
        } }));
};
exports.default = with_label_1.default(Input);
//# sourceMappingURL=Input.js.map