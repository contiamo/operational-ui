import { GlamorousComponent } from "glamorous";
declare const Container: GlamorousComponent<{
    isExpanded: boolean;
}, {}>;
declare const Toggle: GlamorousComponent<{
    onClick?: {};
}, {}>;
declare const MonthNav: GlamorousComponent<{}, {}>;
declare const IconContainer: GlamorousComponent<{
    onClick?: {};
}, {}>;
declare const Days: GlamorousComponent<{}, {}>;
declare const Day: GlamorousComponent<{
    selected?: boolean;
    isPlaceholder?: boolean;
    onClick?: {};
}, {}>;
declare const Input: GlamorousComponent<{
    onClick?: {};
    id?: string;
    readOnly?: boolean;
    value?: string;
    placeholder?: string;
}, {}>;
declare const ClearButton: GlamorousComponent<{
    onClick?: {};
}, {}>;
export { Container, Toggle, MonthNav, IconContainer, Days, Day, Input, ClearButton };
