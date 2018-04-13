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
var mixins_1 = require("./utils/mixins");
var Icon_1 = require("./Icon");
var DatePicker_styles_1 = require("./DatePicker/DatePicker.styles");
var DatePicker_utils_1 = require("./DatePicker/DatePicker.utils");
var DatePicker_Month_1 = require("./DatePicker/DatePicker.Month");
var DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.validate(props);
        // Start year month is either based on the start date
        // or the current month if no start date is specified.
        var startYearMonthInWidget = props.start
            ? {
                year: DatePicker_utils_1.toYearMonthDay(props.start).year,
                month: DatePicker_utils_1.toYearMonthDay(props.start).month
            }
            : {
                year: new Date().getFullYear(),
                month: new Date().getMonth()
            };
        _this.state = __assign({}, startYearMonthInWidget, { isExpanded: false });
        return _this;
    }
    // Throw runtime errors if start/end dates are of the wrong format.
    // Optional props argument is used when the component doesn't have
    // these dates on the instance (e.g. constructor).
    DatePicker.prototype.validate = function (props) {
        var validatedProps = props || this.props;
        // Validate start date of
        if (validatedProps.start) {
            DatePicker_utils_1.validateDateString(validatedProps.start);
        }
        if (validatedProps.end) {
            DatePicker_utils_1.validateDateString(validatedProps.end);
        }
    };
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
            _this.setState(function (prevState) { return (__assign({}, prevState, { isExpanded: false })); });
            if (_this.inputNode) {
                _this.inputNode.blur();
            }
        };
        this.outsideClickHandler = function (ev) {
            if (_this.containerNode && (_this.containerNode === ev.target || _this.containerNode.contains(ev.target))) {
                return;
            }
            _this.setState(function (prevState) { return (__assign({}, prevState, { isExpanded: false })); });
        };
        document.addEventListener("click", this.outsideClickHandler);
        document.addEventListener("keydown", this.keypressHandler);
    };
    DatePicker.prototype.componentDidUpdate = function () {
        this.validate();
    };
    DatePicker.prototype.componentWillUnmount = function () {
        document.removeEventListener("click", this.outsideClickHandler);
        document.removeEventListener("keydown", this.keypressHandler);
    };
    DatePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, onChange = _a.onChange, placeholder = _a.placeholder, start = _a.start, end = _a.end, label = _a.label, id = _a.id, css = _a.css, className = _a.className;
        var _b = this.state, isExpanded = _b.isExpanded, month = _b.month, year = _b.year;
        var domId = id || (label && label.toLowerCase ? label.toLowerCase().replace(/\s/g, "-") : null);
        var placeholderDays = DatePicker_utils_1.monthStartDay(year, month);
        var daysInCurrentMonth = DatePicker_utils_1.daysInMonth(month, year);
        var datePickerWithoutLabel = (React.createElement(DatePicker_styles_1.Container, { innerRef: function (node) {
                _this.containerNode = node;
            }, key: id, isExpanded: isExpanded },
            !!(start && end) && (React.createElement(DatePicker_styles_1.Toggle, { onClick: function (ev) {
                    ev.preventDefault();
                    onChange && onChange({ start: null, end: null });
                } },
                React.createElement(Icon_1.default, { name: "X", size: 14 }))),
            React.createElement(DatePicker_styles_1.Input, { id: domId, readOnly: true, innerRef: function (node) {
                    _this.inputNode = node;
                }, value: [start, end].filter(function (s) { return !!s; }).join(" - "), placeholder: placeholder || "Enter date", onClick: function (ev) {
                    _this.setState(function (prevState) { return ({ isExpanded: !prevState.isExpanded }); });
                    _this.inputNode && _this.state.isExpanded && _this.inputNode.blur();
                }, css: { width: "100%" } }),
            React.createElement(DatePicker_styles_1.DatePickerCard, { isExpanded: isExpanded },
                React.createElement(DatePicker_styles_1.MonthNav, null,
                    React.createElement(DatePicker_styles_1.IconContainer, { onClick: function () { return _this.changeMonth(-1); } },
                        React.createElement(Icon_1.default, { name: "ChevronLeft", size: 14 })),
                    React.createElement("span", null, DatePicker_utils_1.months[month] + ", " + year),
                    React.createElement(DatePicker_styles_1.IconContainer, { onClick: function () { return _this.changeMonth(+1); } },
                        React.createElement(Icon_1.default, { name: "ChevronRight", size: 14 }))),
                React.createElement(DatePicker_Month_1.default, { start: start, end: end, year: year, month: month, onChange: onChange }))));
        return label ? (React.createElement(mixins_1.Label, null,
            React.createElement(mixins_1.LabelText, null, label),
            datePickerWithoutLabel)) : (datePickerWithoutLabel);
    };
    return DatePicker;
}(React.Component));
exports.default = DatePicker;
//# sourceMappingURL=DatePicker.js.map