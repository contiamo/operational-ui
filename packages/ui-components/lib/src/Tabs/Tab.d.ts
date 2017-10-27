/// <reference types="react" />
import * as React from "react";
export declare type TabProps = {
    children?: React.ReactNode;
    disabled?: boolean;
    index?: number;
    title?: string;
};
declare const Tab: React.SFC<TabProps>;
export default Tab;
