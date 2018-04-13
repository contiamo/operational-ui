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
var Button_1 = require("./Button");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "record",
        position: "relative",
        border: "1px solid",
        borderColor: theme.colors.gray,
        borderRadius: theme.borderRadius
    });
});
var HeaderContainer = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing / 2 + "px " + theme.spacing + "px",
        height: theme.spacing * 3
    });
});
var Record = /** @class */ (function (_super) {
    __extends(Record, _super);
    function Record(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isExpanded: Boolean(props.initiallyExpanded)
        };
        return _this;
    }
    Record.prototype.render = function () {
        var _this = this;
        return (React.createElement(Container, { css: this.props.css, className: this.props.className },
            React.createElement(HeaderContainer, null,
                React.Children.map(this.props.children, function (child, index) {
                    return child.props.__isRecordHeader ? child : null;
                }),
                this.props.controls ? (this.props.controls) : (React.createElement(Button_1.default, { color: this.state.isExpanded ? "#FFF" : "info", condensed: true, css: {
                        position: "absolute",
                        top: 24,
                        right: 12,
                        marginRight: 0,
                        transform: "translate3d(0, -50%, 0)"
                    }, onClick: function () {
                        _this.setState(function (prevState) { return ({
                            isExpanded: !prevState.isExpanded
                        }); });
                    } }, this.state.isExpanded ? "Hide details" : "Details"))),
            React.Children.map(this.props.children, function (child, index) {
                return child.props.__isRecordBody && _this.state.isExpanded ? child : null;
            })));
    };
    return Record;
}(React.Component));
exports.default = Record;
//# sourceMappingURL=Record.js.map