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
var TextareaComp = glamorous_1.default.textarea(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body, { display: "block", width: "100%", minHeight: 120, borderRadius: 4, borderColor: "rgb(208, 217, 229)", padding: theme.spacing * 2 / 3, fontFamily: "monospace", ":focus": mixins_1.inputFocus({ theme: theme }) }));
});
var Textarea = function (props) { return (React.createElement(mixins_1.Label, { css: props.css },
    props.label ? React.createElement(mixins_1.LabelText, null, props.label) : null,
    React.createElement(TextareaComp, { value: props.value, onChange: function (e) {
            if (props.onChange) {
                props.onChange(e.target.value);
            }
        } }))); };
exports.default = Textarea;
//# sourceMappingURL=Textarea.js.map