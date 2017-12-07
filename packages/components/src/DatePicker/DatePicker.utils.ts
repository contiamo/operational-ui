import * as moment_ from "moment"

// Temporary hack to work around inconsistent exports/imports between tsc and awesome-typescript-loader
// @todo -> find a better solution here
const moment = typeof moment_ === "function" ? moment_ : (moment_ as any).default

const months: string[] = [
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
]

const range = (n: number): number[] => Array.apply(null, { length: n }).map((val: number, i: number): number => i)

const toDate = (year: number, month: number, day: number): string =>
  `${year}-${month < 9 ? "0" : ""}${month + 1}-${day < 9 ? "0" : ""}${day + 1}`

const monthStartDay = (year: number, month: number): number => moment(toDate(year, month, 0)).day()

const daysInMonth = (month: number, year: number): number => {
  return moment(toDate(year, month, 2)).daysInMonth()
}

export { months, range, daysInMonth, toDate, monthStartDay }
