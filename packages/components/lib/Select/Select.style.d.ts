import { GlamorousComponent } from "glamorous";
export interface IContainerProps {
    id?: string;
    color?: string;
    disabled: boolean;
    style?: {};
    role?: string;
    tabIndex?: number;
    onClick?: () => void;
}
declare const Container: GlamorousComponent<IContainerProps, {}>;
export interface IDisplayValueProps {
    isPlaceholder: boolean;
}
declare const DisplayValue: GlamorousComponent<IDisplayValueProps, {}>;
declare const Options: GlamorousComponent<{}, {}>;
declare const OptionsList: GlamorousComponent<{}, {}>;
export { Container, Options, OptionsList, DisplayValue };
