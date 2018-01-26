/// <reference types="react" />
import * as React from "react";
import { GlamorousComponent } from "glamorous";
export declare const Container: GlamorousComponent<{
    isExpanded: boolean;
}, {}>;
export declare const Toggle: GlamorousComponent<{
    onClick?: {};
}, {}>;
export declare const MonthNav: GlamorousComponent<{}, {}>;
export declare const IconContainer: GlamorousComponent<React.HTMLProps<{}>, {}>;
export declare const Days: GlamorousComponent<{}, {}>;
export declare const Day: GlamorousComponent<{
    selected?: boolean;
    isPlaceholder?: boolean;
} & React.HTMLProps<{}>, {}>;
export declare const Input: GlamorousComponent<React.HTMLProps<{}>, {}>;
export declare const ClearButton: GlamorousComponent<React.HTMLProps<{}>, {}>;
