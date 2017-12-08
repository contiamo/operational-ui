/// <reference types="react" />
import * as React from "react";
export interface IDatePair {
    start?: string;
    end?: string;
}
export interface IProps {
    year: number;
    month: number;
    start?: string;
    end?: string;
    onChange?: (date: IDatePair) => void;
}
declare const Month: React.SFC<IProps>;
export default Month;
