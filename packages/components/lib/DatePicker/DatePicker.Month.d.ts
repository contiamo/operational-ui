/// <reference types="react" />
import * as React from "react";
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
declare const Month: React.SFC<Props>;
export default Month;
