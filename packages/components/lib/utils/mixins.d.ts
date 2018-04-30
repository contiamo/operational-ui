/// <reference types="react" />
import React from "react";
import { GlamorousComponent } from "glamorous";
import { Theme } from "@operational/theme";
export declare const inputFocus: ({theme, isError}: {
    theme: Theme;
    isError?: boolean;
}) => {};
export declare const Label: GlamorousComponent<Pick<{
    theme: Theme;
}, never> & React.HTMLProps<HTMLLabelElement>, {
    theme: Theme;
}>;
export declare const LabelText: GlamorousComponent<Pick<{
    theme: Theme;
}, never> & React.HTMLProps<HTMLSpanElement>, {
    theme: Theme;
}>;
export declare const FormFieldControls: GlamorousComponent<Pick<{
    theme: Theme;
}, never> & React.HTMLProps<HTMLDivElement>, {
    theme: Theme;
}>;
export declare const FormFieldControl: GlamorousComponent<Pick<{
    theme: Theme;
}, never> & React.HTMLProps<HTMLDivElement>, {
    theme: Theme;
}>;
export declare const FormFieldError: GlamorousComponent<Pick<{
    theme: Theme;
}, never> & React.HTMLProps<HTMLDivElement>, {
    theme: Theme;
}>;
