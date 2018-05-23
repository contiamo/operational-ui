/// <reference types="react" />
import * as React from "react";
import { IconName } from "../";
export interface Props {
    /** Page title */
    title: string;
    /** Icon displayed next to the title. Should match related sidenav icons */
    titleIcon?: IconName;
    /** Page breadcrumbs, using the `Breadcrumbs` component */
    breadcrumbs?: React.ReactNode;
    /** Page controls, typically `condensed button` component inside a fragment */
    controls?: React.ReactNode;
    /** Content of the page */
    children?: React.ReactNode;
}
declare const Page: (props: Props) => JSX.Element;
export default Page;
