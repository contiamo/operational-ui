/// <reference types="react" />
import * as React from "react";
import { GlamorousComponent } from "glamorous";
import { Theme } from "@operational/theme";
export interface ContainerProps {
    isExpanded: boolean;
}
export declare const Container: GlamorousComponent<ContainerProps, ContainerProps & {
    theme: Theme;
}>;
export declare const DatePickerCard: GlamorousComponent<Pick<{
    theme: Theme;
    isExpanded: boolean;
}, "isExpanded"> & React.HTMLProps<HTMLDivElement>, {
    theme: Theme;
    isExpanded: boolean;
}>;
export declare const Toggle: GlamorousComponent<{
    onClick?: (ev: React.SyntheticEvent<MouseEvent>) => void;
}, {}>;
export declare const MonthNav: GlamorousComponent<{}, {}>;
export declare const IconContainer: GlamorousComponent<React.HTMLProps<{}>, {}>;
export declare const Days: GlamorousComponent<{}, {}>;
export declare const Day: GlamorousComponent<{
    selected?: boolean;
    isPlaceholder?: boolean;
} & React.HTMLProps<{}>, {}>;
export declare const Input: GlamorousComponent<Pick<{
    theme: Theme;
    isExpanded: boolean;
}, "isExpanded"> & React.HTMLProps<HTMLInputElement>, {
    theme: Theme;
    isExpanded: boolean;
}>;
export declare const ClearButton: GlamorousComponent<{
    onClick?: (ev: MouseEvent) => void;
}, {}>;
