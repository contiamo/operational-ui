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
var Icon_1 = require("./Icon");
var Tooltip_1 = require("./Tooltip");
var numericalHeight = function (css, theme) {
    var workingCss = typeof css === "function" ? css({ theme: theme }) : css;
    if (!workingCss.height || typeof workingCss.height !== "number") {
        return null;
    }
    return workingCss.height;
};
var TextareaComp = glamorous_1.default.textarea(function (_a) {
    var theme = _a.theme, isCode = _a.isCode, isError = _a.isError, css_ = _a.css_, disabled = _a.disabled;
    var numericalHeightSetting = numericalHeight(css_, theme);
    return __assign({}, theme.typography.body, { display: "block", width: "100%", minHeight: 120 }, numericalHeightSetting === null ? {} : { height: numericalHeightSetting - 20 }, { borderRadius: 4, borderColor: isError ? theme.colors.error : theme.colors.inputBorder, padding: theme.spacing / 2 + "px " + theme.spacing * 2 / 3 + "px", fontFamily: isCode ? "monospace" : "inherit", opacity: disabled ? 0.6 : 1.0, ":focus": mixins_1.inputFocus({ theme: theme, isError: isError }) });
});
var Textarea = function (props) {
    return (React.createElement(mixins_1.Label, { css: props.css, className: props.className, id: props.id },
        props.label ? React.createElement(mixins_1.LabelText, null, props.label) : null,
        React.createElement(mixins_1.FormFieldControls, null, props.hint ? (React.createElement(mixins_1.FormFieldControl, null,
            React.createElement(Icon_1.default, { name: "HelpCircle", size: 14 }),
            React.createElement(Tooltip_1.default, { right: true, css: { minWidth: 100, width: "fit-content" } }, props.hint))) : null),
        React.createElement(TextareaComp, { css_: props.css, disabled: Boolean(props.disabled), isCode: Boolean(props.code), value: props.value, isError: Boolean(props.error), onChange: function (e) {
                if (props.onChange) {
                    props.onChange(e.target.value);
                }
            } }),
        props.error ? React.createElement(mixins_1.FormFieldError, null, props.error) : null));
};
exports.default = Textarea;
//# sourceMappingURL=Textarea.js.map