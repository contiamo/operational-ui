/// <reference types="react" />
import * as React from "react";
import { GlamorousComponent } from "glamorous";
import { Theme } from "@operational/theme";
import { Props as CardProps } from "../Card";
export interface ContainerProps {
    isExpanded: boolean;
}
export declare const Container: GlamorousComponent<ContainerProps, ContainerProps & {
    theme: Theme;
}>;
export interface DatePickerCardProps {
    theme: Theme;
    isExpanded?: boolean;
}
export declare const DatePickerCard: GlamorousComponent<CardProps & object & Pick<DatePickerCardProps, "isExpanded">, DatePickerCardProps>;
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
export declare const Input: GlamorousComponent<React.HTMLProps<{}>, {}>;
export declare const ClearButton: GlamorousComponent<{
    onClick?: (ev: MouseEvent) => void;
}, {}>;
