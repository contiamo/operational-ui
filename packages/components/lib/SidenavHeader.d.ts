/// <reference types="react" />
import * as React from "react";
import { IconName } from "./Icon";
export interface Props {
    id?: string | number;
    css?: {};
    className?: string;
    label: string | React.ReactNode;
    icon: IconName | React.ReactNode;
    active?: boolean;
    expanded?: boolean;
    onClick?: () => void;
}
declare const SidenavHeader: (props: Props) => JSX.Element;
export default SidenavHeader;
