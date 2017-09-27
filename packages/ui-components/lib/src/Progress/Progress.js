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
var width = 120;
var height = 45;
var padding = 15;
var Container = glamorous_1.default.div({
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    display: "flex",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.8)"
}, function (_a) {
    var theme = _a.theme;
    return ({
        zIndex: theme.baseZIndex + 300
    });
});
var Box = glamorous_1.default.div({
    width: width,
    height: height,
    padding: padding,
    margin: "auto",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.14)",
    backgroundColor: "#FFFFFF"
});
var BarContainer = glamorous_1.default.div({
    width: "100%",
    height: "100%",
    overflow: "hidden"
}, function (_a) {
    var theme = _a.theme;
    return ({
        backgroundColor: theme.colors.grey50,
        border: "1px solid " + theme.colors.grey20
    });
});
var Bar = glamorous_1.default.div({
    height: "100%"
}, function (_a) {
    var theme = _a.theme;
    return ({
        backgroundColor: theme.colors.success
    });
});
var Progress = /** @class */ (function (_super) {
    __extends(Progress, _super);
    function Progress() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            fillRatio: 0
        };
        _this.tick = function () {
            _this.setState(function (prevState) { return ({
                fillRatio: prevState.fillRatio + 0.01
            }); });
        };
        return _this;
    }
    Progress.prototype.shouldTick = function () {
        var maxFillRatio = this.props.complete ? 1 : 0.8;
        return !this.props.paused && this.state.fillRatio <= maxFillRatio;
    };
    Progress.prototype.componentDidMount = function () {
        if (this.shouldTick()) {
            window.requestAnimationFrame(this.tick);
        }
    };
    Progress.prototype.componentDidUpdate = function () {
        if (this.shouldTick()) {
            window.requestAnimationFrame(this.tick);
        }
    };
    Progress.prototype.render = function () {
        return (React.createElement(Container, null,
            React.createElement(Box, null,
                React.createElement(BarContainer, null,
                    React.createElement(Bar, { style: { transform: "translateX(" + -100 * (1 - this.state.fillRatio) + "%)" } })))));
    };
    return Progress;
}(React.Component));
exports.default = Progress;
//# sourceMappingURL=Progress.js.map