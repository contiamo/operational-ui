/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
export interface Props {
    /** Theme */
    theme?: Theme;
    /** Children */
    children?: React.ReactNode;
    /** Use the base styles */
    withBaseStyles?: boolean;
}
declare const OperationalUI: (props: Props) => JSX.Element;
export default OperationalUI;
