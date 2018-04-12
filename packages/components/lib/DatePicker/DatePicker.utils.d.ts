export declare const months: string[];
export declare const range: (n: number) => number[];
export declare const toDate: (year: number, month: number, day: number) => string;
export declare const validateDateString: (date: string) => void;
export declare const toYearMonthDay: (date: string) => {
    year: number;
    month: number;
    day: number;
};
export declare const monthStartDay: (year: number, month: number) => number;
export declare const daysInMonth: (month: number, year: number) => number;
