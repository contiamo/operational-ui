/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
export interface Props {
    id?: string | number;
    css?: any;
    className?: string;
    placeholder?: string;
    onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => Promise<void>;
    theme?: Theme;
    color?: string;
}
declare const SelectFilter: (props: Props) => JSX.Element;
export default SelectFilter;
