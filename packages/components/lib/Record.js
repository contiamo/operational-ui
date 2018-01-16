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
        minHeight: 58,
        border: "1px solid " + theme.colors.gray20
    });
});
var Record = /** @class */ (function (_super) {
    __extends(Record, _super);
    function Record() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isExpanded: false
        };
        return _this;
    }
    Record.prototype.render = function () {
        var _this = this;
        return (React.createElement(Container, { css: this.props.css, className: this.props.className },
            React.Children.map(this.props.children, function (child, index) {
                return !child.props.__isRecordDetails || _this.state.isExpanded ? child : null;
            }),
            React.createElement(Button_1.default, { css: {
                    position: "absolute",
                    right: 12,
                    top: 12
                }, color: "info", onClick: function () {
                    _this.setState(function (prevState) { return ({
                        isExpanded: !prevState.isExpanded
                    }); });
                } }, this.state.isExpanded ? "Hide details" : "Details")));
    };
    return Record;
}(React.Component));
exports.default = Record;
//# sourceMappingURL=Record.js.map