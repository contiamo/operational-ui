import * as moment_ from "moment"

// Temporary hack to work around inconsistent exports/imports between tsc and awesome-typescript-loader
// @todo -> find a better solution here
const moment = typeof moment_ === "function" ? moment_ : (moment_ as any).default

export const months: string[] = [
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
]

// A range of numbers pre-filled in an array
// range(5) -> [ 0, 1, 2, 3, 4 ]
export const range = (n: number): number[] =>
  Array.apply(null, { length: n }).map((val: number, i: number): number => i)

export const toDate = (year: number, month: number, day: number): string =>
  `${year}-${month < 9 ? "0" : ""}${month + 1}-${day < 9 ? "0" : ""}${day + 1}`

export const validateDateString = (date: string): void => {
  const chunks = date.split("-").map(chunk => Number(chunk))
  if (chunks.length !== 3) {
    throw new Error(
      "Date must be of the format YYYY-MM-DD. You seem to have supplied fewer numbers separated by dashes.",
    )
  }
  if (isNaN(chunks[0])) {
    throw new Error("Invalid year. Date must be a valid YYYY-MM-DD format.")
  }
  if (isNaN(chunks[1])) {
    throw new Error("Invalid month. Date must be a valid YYYY-MM-DD format.")
  }
  if (isNaN(chunks[2])) {
    throw new Error("Invalid day. Date must be a valid YYYY-MM-DD format.")
  }
}

export const toYearMonthDay = (date: string): { year: number; month: number; day: number } => {
  const chunks = date.split("-").map(chunk => Number(chunk))
  return {
    year: chunks[0],
    // Months and days are numbered starting 0 as a state management convenience
    month: chunks[1] - 1,
    day: chunks[2] - 1,
  }
}

export const monthStartDay = (year: number, month: number): number => moment(toDate(year, month, 0)).day()

export const daysInMonth = (month: number, year: number): number => {
  return moment(toDate(year, month, 2)).daysInMonth()
}
