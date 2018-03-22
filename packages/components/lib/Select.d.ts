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
    value: undefined | Value | Value[];
    filterable?: boolean;
    disabled?: boolean;
    onChange: (newValue: Value | Value[], changedItem?: Value) => void;
    onClick?: () => void;
    onFilter?: () => void;
    color?: string;
    placeholder?: string;
    label?: string;
}
export interface State {
    open: boolean;
    updating: boolean;
    filter: RegExp;
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
    updateFilter(event: React.SyntheticEvent<HTMLInputElement>): Promise<void>;
    toggle(): Promise<void>;
    close(): void;
    render(): JSX.Element;
}
export default Select;
