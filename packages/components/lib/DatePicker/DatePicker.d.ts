/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    id?: string;
    label?: string;
    /** Start date in the format YYYY-MM-DD. */
    start?: string;
    /** End date in the format YYYY-MM-DD. */
    end?: string;
    /** Triggered every time the start or end dates change. */
    onChange?: (date: {
        start?: string;
        end?: string;
    }) => void;
    css?: Css;
    className?: string;
    /** Placeholder text when no dates selected */
    placeholder?: string;
}
export interface State {
    isExpanded: boolean;
    year: number;
    month: number;
}
declare class DatePicker extends React.Component<Props, State> {
    static defaultProps: {
        placeholder: string;
    };
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
