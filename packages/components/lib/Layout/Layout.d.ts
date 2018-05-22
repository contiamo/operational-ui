/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    css?: Css;
    className?: string;
    /** Side navigation, see `Sidenav` component */
    sidenav?: React.ReactNode;
    /** Main content, see `Page` component */
    main?: React.ReactNode;
    /** Sets whether a loading progress bar should be rendered */
    loading?: boolean;
}
declare const Layout: (props: Props) => JSX.Element;
export default Layout;
