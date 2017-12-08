declare const months: string[];
declare const range: (n: number) => number[];
declare const toDate: (year: number, month: number, day: number) => string;
declare const monthStartDay: (year: number, month: number) => number;
declare const daysInMonth: (month: number, year: number) => number;
export { months, range, daysInMonth, toDate, monthStartDay };
