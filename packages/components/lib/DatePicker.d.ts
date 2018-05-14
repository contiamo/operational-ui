/// <reference types="react" />
import * as React from "react";
import { Css } from "./types";
export interface Props {
    id?: string;
    label?: string;
    start?: string;
    end?: string;
    onChange?: (date: {
        start?: string;
        end?: string;
    }) => void;
    css?: Css;
    className?: string;
    placeholder?: string;
}
export interface State {
    isExpanded: boolean;
    year: number;
    month: number;
}
declare class DatePicker extends React.Component<Props, State> {
    constructor(props: Props);
    containerNode: any;
    inputNode: any;
    keypressHandler: (a: any) => void;
    outsideClickHandler: (a: any) => void;
    validate(props?: Props): void;
    changeMonth(diff: number): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default DatePicker;
