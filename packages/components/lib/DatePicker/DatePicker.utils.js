"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment_ = require("moment");
// Temporary hack to work around inconsistent exports/imports between tsc and awesome-typescript-loader
// @todo -> find a better solution here
var moment = typeof moment_ === "function" ? moment_ : moment_.default;
var months = [
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
exports.months = months;
var range = function (n) { return Array.apply(null, { length: n }).map(function (val, i) { return i; }); };
exports.range = range;
var toDate = function (year, month, day) {
    return year + "-" + (month < 9 ? "0" : "") + (month + 1) + "-" + (day < 9 ? "0" : "") + (day + 1);
};
exports.toDate = toDate;
var monthStartDay = function (year, month) { return moment(toDate(year, month, 0)).day(); };
exports.monthStartDay = monthStartDay;
var daysInMonth = function (month, year) {
    return moment(toDate(year, month, 2)).daysInMonth();
};
exports.daysInMonth = daysInMonth;
//# sourceMappingURL=DatePicker.utils.js.map