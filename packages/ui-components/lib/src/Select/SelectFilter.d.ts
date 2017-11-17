/// <reference types="react" />
import * as React from "react";
import { Theme } from "contiamo-ui-theme";
export interface IProps {
    id?: string | number;
    css?: any;
    className?: string;
    placeholder?: string;
    onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => Promise<void>;
    theme?: Theme;
    color?: string;
}
declare const SelectFilter: (props: IProps) => JSX.Element;
export default SelectFilter;
