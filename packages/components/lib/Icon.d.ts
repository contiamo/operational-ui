/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
import { ReactFeatherIconName } from "./ReactFeather";
export interface IProps {
    id?: string | number;
    name: ReactFeatherIconName;
    size?: number;
    color?: string;
}
export interface IPropsWithTheme extends IProps {
    theme: Theme;
}
declare const WrappedIcon: React.SFC<IProps>;
export default WrappedIcon;
export { ReactFeatherIconName };
