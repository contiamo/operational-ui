/// <reference types="react" />
import * as React from "react";
import { GlamorousComponent } from "glamorous";
declare const Container: GlamorousComponent<{
    isExpanded: boolean;
}, {}>;
declare const Toggle: GlamorousComponent<{
    onClick?: {};
}, {}>;
declare const MonthNav: GlamorousComponent<{}, {}>;
declare const IconContainer: GlamorousComponent<React.HTMLProps<{}>, {}>;
declare const Days: GlamorousComponent<{}, {}>;
declare const Day: GlamorousComponent<{
    selected?: boolean;
    isPlaceholder?: boolean;
} & React.HTMLProps<{}>, {}>;
declare const Input: GlamorousComponent<React.HTMLProps<{}>, {}>;
declare const ClearButton: GlamorousComponent<React.HTMLProps<{}>, {}>;
export { Container, Toggle, MonthNav, IconContainer, Days, Day, Input, ClearButton };
