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
var mixins = require("./utils/mixins");
var Label = glamorous_1.default.label(mixins.label);
var InputField = glamorous_1.default.input(function (_a) {
    var theme = _a.theme, disabled = _a.disabled;
    return (__assign({}, theme.typography.body, { label: "input", width: "100%", minWidth: 200, padding: theme.spacing * 2 / 3, border: "1px solid", opacity: disabled ? 0.6 : 1.0, borderColor: "rgb(208, 217, 229)", font: "inherit", borderRadius: 2, WebkitAppearance: "none", "&:focus": mixins.inputFocus({ theme: theme }) }));
});
var Input = function (props) {
    // @todo - give sensible dom id when one is not supplied
    var domId = props.id;
    var inputElement = (React.createElement(InputField, { css: props.css, className: props.className, key: props.id, innerRef: props.inputRef, id: domId, name: props.name, disabled: Boolean(props.disabled), placeholder: props.placeholder, value: props.value, type: props.type, onFocus: props.onFocus, onBlur: props.onBlur, onChange: function (e) {
            props.onChange && props.onChange(e.target.value);
        } }));
    if (props.label) {
        return (React.createElement(Label, { htmlFor: domId },
            props.label,
            inputElement));
    }
    return inputElement;
};
exports.default = Input;
//# sourceMappingURL=Input.js.map