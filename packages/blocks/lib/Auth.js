"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var components_1 = require("@operational/components");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "auth",
        backgroundColor: theme.colors.sidenavBackground,
        width: "100%",
        height: "100%",
        padding: theme.spacing,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    });
});
var AuthCard = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        position: "relative",
        label: "authcontent",
        boxShadow: theme.shadows.popup,
        borderRadius: 2,
        backgroundColor: theme.colors.white,
        padding: 3 * theme.spacing + "px " + 1.5 * theme.spacing + "px",
        width: "100%",
        maxWidth: 360
    });
});
var Content = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, isEnabled = _a.isEnabled;
    return ({
        opacity: isEnabled ? 1 : 0.4,
        pointerEvents: isEnabled ? "all" : "none"
    });
});
var SubmitContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        marginTop: 2.5 * theme.spacing,
        textAlign: "center",
        "& > *": {
            width: "100%"
        }
    });
});
var InputFields = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        margin: 1 * theme.spacing + "px 0"
    });
});
var ErrorNotice = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body, { textAlign: "center", color: theme.colors.error }));
});
var inputStyle = {
    display: "block",
    margin: "20px 0"
};
/*
 * Checks whether a string value exists or not (same as !!stringValue, except it also returns
 * true for empty string. This is used especially often in this component because this component
 * renders form fields if any corresponding string value is passed down in props.
 * e.g. props.username === null -> rendern no user name form field at all
 *      props.username === "" -> render empty form field for user name
 */
var isStringValue = function (stringValue) { return !!stringValue || stringValue === ""; };
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Auth.prototype.render = function () {
        var _this = this;
        return (React.createElement(Container, { css: this.props.css, className: this.props.className },
            React.createElement(AuthCard, null,
                this.props.processing ? (React.createElement(components_1.Spinner, { css: { position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 20px)", zIndex: 10000 } })) : null,
                React.createElement(Content, { isEnabled: !this.props.processing },
                    this.props.title ? (React.createElement(components_1.TitleType, { css: { textAlign: "center", margin: 0 } }, this.props.title)) : null,
                    this.props.error ? React.createElement(ErrorNotice, null, this.props.error) : null,
                    React.createElement(InputFields, null,
                        isStringValue(this.props.username) ? (React.createElement(components_1.Input, { css: inputStyle, value: this.props.username, label: "User name", onChange: function (v) {
                                _this.props.onChange &&
                                    _this.props.onChange({
                                        username: v
                                    });
                            } })) : null,
                        isStringValue(this.props.password) ? (React.createElement(components_1.Input, { css: inputStyle, value: this.props.password, placeholder: "******", type: "password", label: "Password", onChange: function (v) {
                                _this.props.onChange &&
                                    _this.props.onChange({
                                        password: v
                                    });
                            } })) : null,
                        isStringValue(this.props.passwordConfirmation) ? (React.createElement(components_1.Input, { css: inputStyle, value: this.props.passwordConfirmation, placeholder: "******", type: "password", label: "Password confirmation", onChange: function (v) {
                                _this.props.onChange &&
                                    _this.props.onChange({
                                        passwordConfirmation: v
                                    });
                            } })) : null),
                    React.createElement(SubmitContainer, null,
                        React.createElement(components_1.Button, { css: { margin: 0 }, color: "info", type: "submit", onClick: function () {
                                _this.props.onSubmit && _this.props.onSubmit();
                            } }, "Submit"))))));
    };
    return Auth;
}(React.Component));
exports.default = Auth;
//# sourceMappingURL=Auth.js.map