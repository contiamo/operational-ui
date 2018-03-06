/// <reference types="react" />
import React from "react";
import { GlamorousComponent } from "glamorous";
import { Theme } from "@operational/theme";
export declare const inputFocus: ({theme}: {
    theme: Theme;
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
