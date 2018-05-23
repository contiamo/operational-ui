/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: number | string;
    css?: any;
    className?: string;
    selected?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
    color?: string;
}
declare const SelectOption: (props: Props) => JSX.Element;
export default SelectOption;
