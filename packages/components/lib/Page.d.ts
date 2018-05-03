/// <reference types="react" />
import * as React from "react";
import { IconName } from "./Icon";
export interface Props {
    title: string;
    titleIcon?: IconName;
    breadcrumbs?: React.ReactNode;
    controls?: React.ReactNode;
    children?: React.ReactNode;
}
declare const Page: (props: Props) => JSX.Element;
export default Page;
