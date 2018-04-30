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
    "December",
];
// A range of numbers pre-filled in an array
// range(5) -> [ 0, 1, 2, 3, 4 ]
exports.range = function (n) {
    return Array.apply(null, { length: n }).map(function (val, i) { return i; });
};
exports.toDate = function (year, month, day) {
    return year + "-" + (month < 9 ? "0" : "") + (month + 1) + "-" + (day < 9 ? "0" : "") + (day + 1);
};
exports.validateDateString = function (date) {
    var chunks = date.split("-").map(function (chunk) { return Number(chunk); });
    if (chunks.length !== 3) {
        throw new Error("Date must be of the format YYYY-MM-DD. You seem to have supplied fewer numbers separated by dashes.");
    }
    if (isNaN(chunks[0])) {
        throw new Error("Invalid year. Date must be a valid YYYY-MM-DD format.");
    }
    if (isNaN(chunks[1])) {
        throw new Error("Invalid month. Date must be a valid YYYY-MM-DD format.");
    }
    if (isNaN(chunks[2])) {
        throw new Error("Invalid day. Date must be a valid YYYY-MM-DD format.");
    }
};
exports.toYearMonthDay = function (date) {
    var chunks = date.split("-").map(function (chunk) { return Number(chunk); });
    return {
        year: chunks[0],
        // Months and days are numbered starting 0 as a state management convenience
        month: chunks[1] - 1,
        day: chunks[2] - 1,
    };
};
exports.monthStartDay = function (year, month) { return moment(exports.toDate(year, month, 0)).day(); };
exports.daysInMonth = function (month, year) {
    return moment(exports.toDate(year, month, 2)).daysInMonth();
};
//# sourceMappingURL=DatePicker.utils.js.map