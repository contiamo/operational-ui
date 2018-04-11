"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment_ = require("moment");
// Temporary hack to work around inconsistent exports/imports between tsc and awesome-typescript-loader
// @todo -> find a better solution here
var moment = typeof moment_ === "function" ? moment_ : moment_.default;
exports.months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
exports.range = function (n) {
    return Array.apply(null, { length: n }).map(function (val, i) { return i; });
};
exports.toDate = function (year, month, day) {
    return year + "-" + (month < 9 ? "0" : "") + (month + 1) + "-" + (day < 9 ? "0" : "") + (day + 1);
};
exports.toYearMonthDay = function (date) {
    var chunks = date.split("-").map(function (chunk) { return Number(chunk); });
    if (chunks.length !== 3 || isNaN(chunks[0]) || isNaN(chunks[1]) || isNaN(chunks[2])) {
        return null;
    }
    return {
        year: chunks[0],
        // Months and days are numbered starting 0 as a state management convenience
        month: chunks[1] - 1,
        day: chunks[2] - 1
    };
};
exports.monthStartDay = function (year, month) { return moment(exports.toDate(year, month, 0)).day(); };
exports.daysInMonth = function (month, year) {
    return moment(exports.toDate(year, month, 2)).daysInMonth();
};
//# sourceMappingURL=DatePicker.utils.js.map