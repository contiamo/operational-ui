/// <reference types="react" />
import * as React from "react";
import { CSSProperties } from "glamorous";
export declare type Value = number | string;
export interface IOption {
    label?: string;
    value: Value;
}
export interface Props {
    id?: string;
    css?: CSSProperties;
    className?: string;
    options: IOption[];
    value: null | Value | Value[];
    filterable?: boolean;
    disabled?: boolean;
    onChange?: (newValue: null | Value | Value[], changedItem?: Value) => void;
    color?: string;
    placeholder?: string;
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
