"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var DatePicker_utils_1 = require("./DatePicker.utils");
var DatePicker_styles_1 = require("./DatePicker.styles");
var setNewDate = function (date, current) {
    var start = current.start, end = current.end;
    var newStart = start && !end ? start : date;
    var newEnd = start && !end ? date : start && end ? null : end;
    var _a = [newStart, newEnd].sort(), sortedNewStart = _a[0], sortedNewEnd = _a[1];
    return {
        start: sortedNewStart,
        end: sortedNewEnd
    };
};
var isSelected = function (date, current) {
    var start = current.start, end = current.end;
    return date === start || date === end || (!!start && !!end && date >= start && date <= end);
};
var Month = function (_a) {
    var year = _a.year, month = _a.month, start = _a.start, end = _a.end, onChange = _a.onChange;
    var prevPlaceholderDays = DatePicker_utils_1.monthStartDay(year, month);
    var nextMonth = month === 11 ? 0 : month + 1;
    var nextYear = month === 11 ? year + 1 : year;
    var prevMonth = month === 0 ? 11 : month - 1;
    var prevYear = month === 0 ? year - 1 : year;
    var daysInCurrentMonth = DatePicker_utils_1.daysInMonth(month, year);
    var daysInPreviousMonth = DatePicker_utils_1.daysInMonth(prevMonth, prevYear);
    var nextPlaceholderDays = (daysInCurrentMonth + prevPlaceholderDays) % 7 === 0 ? 0 : 7 - (daysInCurrentMonth + prevPlaceholderDays) % 7;
    return (React.createElement(DatePicker_styles_1.Days, null,
        DatePicker_utils_1.range(prevPlaceholderDays).map(function (number, index) {
            var day = daysInPreviousMonth + index - prevPlaceholderDays;
            var date = DatePicker_utils_1.toDate(prevYear, prevMonth, day);
            return (React.createElement(DatePicker_styles_1.Day, { selected: isSelected(date, { start: start, end: end }), key: index, isPlaceholder: true, onClick: function () {
                    onChange && onChange(setNewDate(date, { start: start, end: end }));
                } }, day + 1));
        }),
        DatePicker_utils_1.range(daysInCurrentMonth).map(function (number, index) {
            var date = DatePicker_utils_1.toDate(year, month, index);
            return (React.createElement(DatePicker_styles_1.Day, { selected: isSelected(date, { start: start, end: end }), key: index, onClick: function () {
                    onChange && onChange(setNewDate(date, { start: start, end: end }));
                } }, index + 1));
        }),
        DatePicker_utils_1.range(nextPlaceholderDays).map(function (number, index) {
            var date = DatePicker_utils_1.toDate(nextYear, nextMonth, number);
            return (React.createElement(DatePicker_styles_1.Day, { key: index, selected: isSelected(date, { start: start, end: end }), isPlaceholder: true, onClick: function () {
                    onChange && onChange(setNewDate(date, { start: start, end: end }));
                } }, number + 1));
        })));
};
exports.default = Month;
//# sourceMappingURL=DatePicker.Month.js.map