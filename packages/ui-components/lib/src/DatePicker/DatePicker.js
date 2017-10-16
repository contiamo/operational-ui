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
var Card_1 = require("../Card/Card");
var Icon_1 = require("../Icon/Icon");
var utils_1 = require("./utils");
var Container = glamorous_1.default.div(function (_a) {
    var isExpanded = _a.isExpanded, theme = _a.theme;
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
        }
    });
});
var Toggle = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        position: "absolute",
        top: 0,
        right: 0,
        width: 24,
        height: 24,
        fontSize: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: theme.baseZIndex + 1,
        color: theme.colors.palette.grey80,
        borderLeft: "1px solid " + theme.colors.palette.grey60
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
        "& > span": __assign({}, theme.typography.body, { width: 100, textAlign: "center" })
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
    var theme = _a.theme, selected = _a.selected, isPlaceholder = _a.isPlaceholder;
    return (__assign({}, theme.typography.body, { backgroundColor: selected ? theme.colors.palette.success : "transparent", color: selected ? "#FFF" : "#000", visibility: isPlaceholder ? "hidden" : "visible", content: isPlaceholder ? "' '" : "" }));
});
var Input = glamorous_1.default.input(function (_a) {
    var theme = _a.theme;
    return ({
        padding: theme.spacing / 2,
        height: 24,
        border: "1px solid",
        borderColor: theme.colors.palette.grey30,
        width: 160,
        position: "relative"
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
    DatePicker.prototype.componentDidMount = function () {
        var _this = this;
        this.keypressHandler = function (ev) {
            if (ev.keyCode !== 27) {
                return;
            }
            _this.setState(function (prevState) { return (__assign({}, prevState, { isExpanded: !prevState.isExpanded })); });
            if (_this.inputNode) {
                _this.inputNode.blur();
            }
        };
        this.outsideClickHandler = function (ev) {
            _this.setState(function (prevState) { return (__assign({}, prevState, { isExpanded: false })); });
        };
        window.addEventListener("click", this.outsideClickHandler);
        window.addEventListener("keydown", this.keypressHandler);
    };
    DatePicker.prototype.componentWillUnmount = function () {
        window.removeEventListener("click", this.outsideClickHandler);
        window.removeEventListener("keydown", this.keypressHandler);
    };
    DatePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, start = _a.start, end = _a.end;
        var placeholderDays = utils_1.monthStartDay(this.state.year, this.state.month);
        var daysInCurrentMonth = utils_1.daysInMonth(this.state.month, this.state.year);
        return (React.createElement(Container, { css: this.props.css, isExpanded: this.state.isExpanded, onClick: function (ev) {
                ev.stopPropagation();
            } },
            React.createElement(Toggle, { onClick: function () {
                    _this.setState(function (prevState) { return ({
                        isExpanded: !prevState.isExpanded
                    }); });
                } },
                React.createElement(Icon_1.default, { name: this.state.isExpanded ? "ChevronUp" : "ChevronDown", size: 12 })),
            React.createElement(Input, { innerRef: function (node) {
                    _this.inputNode = node;
                }, value: [start, end].filter(function (s) { return !!s; }).join(" - "), placeholder: this.props.placeholder, onFocus: function () {
                    _this.setState(function (prevState) { return ({
                        isExpanded: !prevState.isExpanded
                    }); });
                    _this.inputNode && _this.inputNode.blur();
                } }),
            React.createElement(Card_1.default, { className: "co_card" },
                React.createElement(Nav, null,
                    React.createElement(IconContainer, { onClick: function () {
                            _this.changeMonth(-1);
                        } },
                        React.createElement(Icon_1.default, { name: "ChevronLeft", size: 12 })),
                    React.createElement("span", null, utils_1.months[this.state.month] + ", " + this.state.year),
                    React.createElement(IconContainer, { onClick: function () {
                            _this.changeMonth(+1);
                        } },
                        React.createElement(Icon_1.default, { name: "ChevronRight", size: 12 }))),
                React.createElement(Days, null,
                    utils_1.range(placeholderDays).map(function (number, index) {
                        return React.createElement(Day, { key: index, isPlaceholder: true });
                    }),
                    utils_1.range(daysInCurrentMonth).map(function (number, index) {
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