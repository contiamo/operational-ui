/// <reference types="react" />
import * as React from "react";
import { Css } from "./types";
export interface Props {
    css?: Css;
    className?: string;
    sidenav?: React.ReactNode;
    main?: React.ReactNode;
    loading?: boolean;
}
declare const Layout: (props: Props) => JSX.Element;
export default Layout;
