/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export declare type Value = number | string;
export interface IOption {
    label?: string;
    value: Value;
}
export interface Props {
    /** Id */
    id?: string;
    /** Glamorous css */
    css?: Css;
    /** ClassName */
    className?: string;
    /** Options available */
    options: IOption[];
    /** Current value */
    value: null | Value | Value[];
    /** Make the list filterable */
    filterable?: boolean;
    /** Disable the component */
    disabled?: boolean;
    /** Callback trigger on any changes */
    onChange?: (newValue: null | Value | Value[], changedItem?: Value) => void;
    /** Text color */
    color?: string;
    /** Text to display when no active selection */
    placeholder?: string;
    /** Label text */
    label?: string;
}
export interface State {
    open: boolean;
    updating: boolean;
    search: string;
}
declare class Select extends React.Component<Props, State> {
    state: State;
    containerNode: Node;
    static defaultProps: Partial<Props>;
    handleClick(ev: React.SyntheticEvent<Node>): void;
    handleEsc(e: KeyboardEvent): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getDisplayValue(): string;
    selectOption(option: IOption): void;
    isOptionSelected(option: IOption): boolean;
    close(): void;
    render(): JSX.Element;
}
export default Select;
