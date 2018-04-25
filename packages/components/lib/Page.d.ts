/// <reference types="react" />
import * as React from "react";
export interface Props {
    title: string;
    __experimentalBackLink: {
        url: string;
        label?: string;
        onClick?: () => void;
    };
    breadcrumbs?: React.ReactNode;
    controls?: React.ReactNode;
    children?: React.ReactNode;
}
declare const Page: (props: Props) => JSX.Element;
export default Page;
