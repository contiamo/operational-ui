/// <reference types="react" />
import * as React from "react";
export interface Props {
    css?: {};
    className?: string;
    sidenav?: React.ReactNode;
    main?: React.ReactNode;
    loading?: boolean;
}
declare const Layout: (props: Props) => JSX.Element;
export default Layout;
