/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    css?: Css;
    className?: string;
    children?: React.ReactNode;
    /** Make the tab and its content inaccessible */
    disabled?: boolean;
    index?: number;
    /** Title to be displayed in the tab button */
    title?: string;
}
declare const Tab: (props: Props) => JSX.Element;
export default Tab;
