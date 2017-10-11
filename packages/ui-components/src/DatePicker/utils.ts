import moment from "moment"

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

const daysInMonth = (month: number, year: number): number => {
  return moment(`${year}-${month < 9 ? "0" : ""}${month + 1}-02`).daysInMonth()
}

export { months, range, daysInMonth }
