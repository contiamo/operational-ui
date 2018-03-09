/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
export interface Props {
    theme?: Theme;
    children?: React.ReactNode;
    withBaseStyles?: boolean;
}
declare const OperationalUI: (props: Props) => JSX.Element;
export default OperationalUI;
