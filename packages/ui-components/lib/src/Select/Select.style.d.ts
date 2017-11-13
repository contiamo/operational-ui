/// <reference types="react" />
import { GlamorousComponent } from "glamorous";
import { Theme } from "contiamo-ui-theme";
declare const Container: GlamorousComponent<Pick<{
    theme: Theme;
    color?: string;
    disabled: boolean;
    updating: boolean;
    style?: any;
}, "style" | "color" | "disabled" | "updating"> & React.HTMLProps<HTMLDivElement>, {
    theme: Theme;
    color?: string;
    disabled: boolean;
    updating: boolean;
    style?: any;
}>;
declare const DisplayValue: GlamorousComponent<Pick<{
    theme: Theme;
    isPlaceholder: boolean;
}, "isPlaceholder"> & React.HTMLProps<HTMLDivElement>, {
    theme: Theme;
    isPlaceholder: boolean;
}>;
declare const Options: GlamorousComponent<Pick<{
    theme: Theme;
}, never> & React.HTMLProps<HTMLDivElement>, {
    theme: Theme;
}>;
declare const OptionsList: GlamorousComponent<Pick<{
    theme: Theme;
}, never> & React.HTMLProps<HTMLDivElement>, {
    theme: Theme;
}>;
export { Container, Options, OptionsList, DisplayValue };
