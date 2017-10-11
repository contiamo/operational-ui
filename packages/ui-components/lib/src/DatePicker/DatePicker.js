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
var Card_1 = require("../Card/Card");
var Icon_1 = require("../Icon/Icon");
var utils_1 = require("./utils");
var Nav = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        margin: theme.spacing,
        textAlign: "center",
        "& > *": {
            margin: "0 6px",
            verticalAlign: "middle",
            display: "inline-block"
        },
        "& > span": {
            width: 100,
            textAlign: "center"
        }
    });
});
var IconContainer = glamorous_1.default.div({
    width: 16,
    height: 16
});
var Days = glamorous_1.default.div({
    width: 210,
    margin: "auto"
});
var Day = glamorous_1.default.div({
    width: 30,
    height: 30,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #efefef"
}, function (_a) {
    var theme = _a.theme, selected = _a.selected;
    return ({
        backgroundColor: selected ? theme.colors.palette.success : "transparent",
        color: selected ? "#FFF" : "#000"
    });
});
var DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            year: 2017,
            month: 10
        };
        return _this;
    }
    DatePicker.prototype.changeMonth = function (diff) {
        this.setState(function (prevState) { return ({
            month: prevState.month + diff < 0 ? prevState.month + diff + 12 : (prevState.month + diff) % 12,
            year: prevState.month + diff < 0
                ? prevState.year - 1
                : prevState.month + diff > 11 ? prevState.year + 1 : prevState.year
        }); });
    };
    DatePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props.date.split("-").map(Number), year = _a[0], month_ = _a[1], day_ = _a[2];
        var month = month_ - 1;
        var day = day_ - 1;
        return (React.createElement(Card_1.default, null,
            React.createElement(Nav, null,
                React.createElement(IconContainer, { onClick: function () {
                        _this.changeMonth(-1);
                    } },
                    React.createElement(Icon_1.default, { name: "ChevronLeft", size: 16 })),
                React.createElement("span", null, utils_1.months[this.state.month] + ", " + this.state.year),
                React.createElement(IconContainer, { onClick: function () {
                        _this.changeMonth(+1);
                    } },
                    React.createElement(Icon_1.default, { name: "ChevronRight", size: 16 }))),
            React.createElement(Days, null, utils_1.range(utils_1.daysInMonth(this.state.month, this.state.year)).map(function (number, index) { return (React.createElement(Day, { selected: year === _this.state.year && month === _this.state.month && day === index, key: index, onClick: function () {
                    _this.props.onChange && _this.props.onChange(_this.state.year + "-" + (_this.state.month + 1) + "-" + (index + 1));
                } }, index + 1)); }))));
    };
    return DatePicker;
}(React.Component));
exports.default = DatePicker;
//# sourceMappingURL=DatePicker.js.map