/// <reference types="react" />
export interface IDatePair {
    start?: string;
    end?: string;
}
export interface Props {
    year: number;
    month: number;
    start?: string;
    end?: string;
    onChange?: (date: IDatePair) => void;
}
declare const Month: ({ year, month, start, end, onChange }: Props) => JSX.Element;
export default Month;
