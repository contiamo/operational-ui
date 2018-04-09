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
var utils_1 = require("@operational/utils");
var Icon_1 = require("./Icon");
var Tooltip_1 = require("./Tooltip");
var mixins_1 = require("./utils/mixins");
var constants_1 = require("./constants");
var InputField = glamorous_1.default.input(function (_a) {
    var theme = _a.theme, disabled = _a.disabled, isStandalone = _a.isStandalone, isError = _a.isError;
    return (__assign({}, theme.typography.body, isStandalone ? {} : { display: "block" }, { label: "input", minWidth: constants_1.inputDefaultWidth, padding: theme.spacing * 2 / 3, border: "1px solid", opacity: disabled ? 0.6 : 1.0, borderColor: isError ? theme.colors.error : "rgb(208, 217, 229)", font: "inherit", borderRadius: 4, WebkitAppearance: "none", "&:focus": mixins_1.inputFocus({ theme: theme, isError: isError }) }));
});
var Error = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.small, { color: theme.colors.error, padding: theme.spacing / 6 + "px " + theme.spacing * 3 / 4 + "px", marginTop: theme.spacing / 6, marginBottom: 0, width: "100%", borderRadius: 3, position: "absolute", backgroundColor: utils_1.lighten(theme.colors.error, 45), boxShadow: theme.shadows.card, bottom: theme.spacing * -2.25, left: 0 }));
});
var ControlsContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        position: "absolute",
        top: 3,
        right: theme.spacing
    });
});
var Control = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        position: "relative",
        verticalAlign: "middle",
        display: "inline-block",
        width: "fit-content",
        marginLeft: 4,
        "& svg": {
            opacity: 0.4,
            position: "relative",
            top: -1
        },
        // :nth-child(2) refers to the tooltip
        "& > :nth-child(2)": {
            display: "none"
        },
        ":hover": {
            "& svg": {
                opacity: 1
            },
            "& > :nth-child(2)": {
                display: "block"
            }
        }
    });
});
var Input = function (props) {
    var forAttributeId = props.label && props.labelId;
    var commonInputProps = {
        innerRef: props.inputRef,
        name: props.name,
        disabled: Boolean(props.disabled),
        value: props.value || "",
        isStandalone: !Boolean(props.label),
        type: props.type,
        onFocus: props.onFocus,
        onBlur: props.onBlur,
        placeholder: props.placeholder,
        isError: Boolean(props.error),
        onChange: function (e) {
            props.onChange && props.onChange(e.target.value);
        }
    };
    if (props.label) {
        return (React.createElement(mixins_1.Label, { id: props.id, htmlFor: forAttributeId, css: props.css, className: props.className },
            React.createElement(mixins_1.LabelText, null, props.label),
            React.createElement(ControlsContainer, null,
                props.hint ? (React.createElement(Control, null,
                    React.createElement(Icon_1.default, { name: "HelpCircle", size: 14 }),
                    React.createElement(Tooltip_1.default, { right: true, css: { minWidth: 100, width: "fit-content" } }, props.hint))) : null,
                props.onToggle ? (React.createElement(Control, { onClick: function () {
                        props.onToggle();
                    } },
                    React.createElement(Icon_1.default, { name: props.disabled ? "Lock" : "Unlock", size: 12 }))) : null),
            React.createElement(InputField, __assign({}, commonInputProps, { id: forAttributeId, autoComplete: props.autoComplete, css: { display: "block", width: "100%" } })),
            props.error ? React.createElement(Error, null, props.error) : null));
    }
    return (React.createElement(InputField, __assign({}, commonInputProps, { id: props.id, css: props.css, className: props.className, autoComplete: props.autoComplete })));
};
exports.default = Input;
//# sourceMappingURL=Input.js.map