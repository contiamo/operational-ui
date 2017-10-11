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
var Input_1 = require("../Input/Input");
var utils_1 = require("./utils");
var Container = glamorous_1.default.div(function (_a) {
    var isExpanded = _a.isExpanded;
    return ({
        display: "inline-block",
        width: "auto",
        position: "relative",
        "& .co_card": {
            display: isExpanded ? "block" : "none",
            position: "absolute",
            top: 30,
            left: "50%",
            transform: "translate3d(-50%, 0, 0)",
            width: 240
        },
        "& input": {
            width: 200
        }
    });
});
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
    height: 16,
    cursor: "pointer"
});
var Days = glamorous_1.default.div({
    width: 210,
    margin: "auto"
});
var Day = glamorous_1.default.div({
    width: 30,
    height: 30,
    marginRight: -1,
    marginBottom: -1,
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
            isExpanded: false,
            year: 2017,
            month: 9
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
        var _a = this.props, start = _a.start, end = _a.end;
        return (React.createElement(Container, { isExpanded: this.state.isExpanded },
            React.createElement(Input_1.default, { value: [start, end].filter(function (s) { return !!s; }).join(" - "), onFocus: function () {
                    _this.setState(function (prevState) { return ({
                        isExpanded: true
                    }); });
                } }),
            React.createElement(Card_1.default, { className: "co_card" },
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
                React.createElement(Days, null, utils_1.range(utils_1.daysInMonth(this.state.month, this.state.year)).map(function (number, index) {
                    var date = utils_1.toDate(_this.state.year, _this.state.month, index);
                    return (React.createElement(Day, { selected: date === start || date === end || (!!start && !!end && date >= start && date <= end), key: index, onClick: function () {
                            var newStart = start && !end ? start : date;
                            var newEnd = start && !end ? date : start && end ? null : end;
                            var _a = [newStart, newEnd].sort(), sortedNewStart = _a[0], sortedNewEnd = _a[1];
                            _this.props.onChange &&
                                _this.props.onChange({
                                    start: sortedNewStart,
                                    end: sortedNewEnd
                                });
                        } }, index + 1));
                })))));
    };
    return DatePicker;
}(React.Component));
exports.default = DatePicker;
//# sourceMappingURL=DatePicker.js.map