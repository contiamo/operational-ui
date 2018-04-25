/// <reference types="react" />
import * as React from "react";
export interface Props {
    title: string;
    __experimentalBackLinkUrl?: string;
    __experimentalBackLinkLabel?: string;
    breadcrumbs?: React.ReactNode;
    controls?: React.ReactNode;
    children?: React.ReactNode;
}
declare const Page: (props: Props) => JSX.Element;
export default Page;
