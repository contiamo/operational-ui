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
var mixins_1 = require("./utils/mixins");
var InputField = glamorous_1.default.input(function (_a) {
    var theme = _a.theme, disabled = _a.disabled, isStandalone = _a.isStandalone;
    return (__assign({}, theme.typography.body, isStandalone ? {} : { display: "block" }, { label: "input", minWidth: 240, padding: theme.spacing * 2 / 3, border: "1px solid", opacity: disabled ? 0.6 : 1.0, borderColor: "rgb(208, 217, 229)", font: "inherit", borderRadius: 2, WebkitAppearance: "none", "&:focus": mixins_1.inputFocus({ theme: theme }) }));
});
var Input = function (props) {
    var forAttributeId = props.label && props.inputId;
    var commonInputProps = {
        innerRef: props.inputRef,
        name: props.name,
        disabled: Boolean(props.disabled),
        value: props.value,
        isStandalone: !Boolean(props.label),
        type: props.type,
        onFocus: props.onFocus,
        onBlur: props.onBlur,
        placeholder: props.placeholder,
        onChange: function (e) {
            props.onChange && props.onChange(e.target.value);
        }
    };
    if (props.label) {
        return (React.createElement(mixins_1.Label, { htmlFor: forAttributeId, css: props.css, className: props.className, key: props.id },
            React.createElement(mixins_1.LabelText, null, props.label),
            React.createElement(InputField, __assign({}, commonInputProps, { key: props.id, id: forAttributeId, autoComplete: props.autoComplete, css: { display: "block", width: "100%" } }))));
    }
    return (React.createElement(InputField, __assign({}, commonInputProps, { css: props.css, className: props.className, key: props.id, autoComplete: props.autoComplete })));
};
exports.default = Input;
//# sourceMappingURL=Input.js.map