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
var Month = function (_a) {
    var year = _a.year, month = _a.month, start = _a.start, end = _a.end, onChange = _a.onChange;
    var placeholderDays = DatePicker_utils_1.monthStartDay(year, month);
    var daysInCurrentMonth = DatePicker_utils_1.daysInMonth(month, year);
    return (React.createElement(DatePicker_styles_1.Days, null,
        DatePicker_utils_1.range(placeholderDays).map(function (number, index) {
            return React.createElement(DatePicker_styles_1.Day, { key: index, isPlaceholder: true });
        }),
        DatePicker_utils_1.range(daysInCurrentMonth).map(function (number, index) {
            var date = DatePicker_utils_1.toDate(year, month, index);
            return (React.createElement(DatePicker_styles_1.Day, { selected: date === start || date === end || (!!start && !!end && date >= start && date <= end), key: index, onClick: function () {
                    onChange && onChange(setNewDate(date, { start: start, end: end }));
                } }, index + 1));
        })));
};
exports.default = Month;
//# sourceMappingURL=DatePicker.Month.js.map