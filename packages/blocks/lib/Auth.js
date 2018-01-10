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
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    });
});
var Content = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        backgroundColor: theme.colors.white,
        padding: theme.spacing + "px " + theme.spacing + "px",
        width: "100%",
        maxWidth: 480
    });
});
var InputContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        margin: 2 * theme.spacing + "px 0",
        display: "block"
    });
});
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Auth.prototype.render = function () {
        var _this = this;
        return (React.createElement(Container, { css: this.props.css, className: this.props.className },
            React.createElement(Content, null,
                this.props.title ? React.createElement(components_1.TitleType, null, this.props.title) : null,
                this.props.username ? (React.createElement(InputContainer, null,
                    React.createElement(components_1.Input, { value: this.props.username, label: "User name", onChange: function (v) {
                            _this.props.onChange &&
                                _this.props.onChange({
                                    username: v
                                });
                        } }))) : null,
                this.props.password ? (React.createElement(InputContainer, null,
                    React.createElement(components_1.Input, { value: this.props.password, placeholder: "******", type: "password", label: "Password", onChange: function (v) {
                            _this.props.onChange &&
                                _this.props.onChange({
                                    password: v
                                });
                        } }))) : null,
                this.props.passwordConfirmation ? (React.createElement(InputContainer, null,
                    React.createElement(components_1.Input, { value: this.props.passwordConfirmation, placeholder: "******", type: "password", label: "Password confirmation", onChange: function (v) {
                            _this.props.onChange &&
                                _this.props.onChange({
                                    passwordConfirmation: v
                                });
                        } }))) : null,
                React.createElement(components_1.Button, { color: "info", type: "submit", onClick: function () {
                        _this.props.onSubmit && _this.props.onSubmit();
                    } }, "Submit"))));
    };
    return Auth;
}(React.Component));
exports.default = Auth;
//# sourceMappingURL=Auth.js.map