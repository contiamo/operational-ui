/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string;
    label?: string;
    start?: string;
    end?: string;
    onChange?: (date: {
        start?: string;
        end?: string;
    }) => void;
    css?: any;
    className?: string;
    placeholder?: string;
}
export interface State {
    isExpanded: boolean;
    year: number;
    month: number;
}
declare class DatePicker extends React.Component<Props, State> {
    state: {
        isExpanded: boolean;
        year: number;
        month: number;
    };
    containerNode: any;
    inputNode: any;
    keypressHandler: (a: any) => void;
    outsideClickHandler: (a: any) => void;
    changeMonth(diff: number): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default DatePicker;
