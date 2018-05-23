/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
import * as BrandIcons from "./Icon.Brand";
import { ReactFeatherIconName } from "./Icon.ReactFeather";
export declare type IconName = ReactFeatherIconName | BrandIcons.BrandIconName;
export interface Props {
    /**
     * Icon name. See https://feathericons.com (convert name to PascalCase) for feather icons.
     * For OperationalUI brand icons, use the values `OperationalUI`, `Labs`, `Components`, `Blocks` and `Visualizations`
     */
    name: IconName;
    /**
     * Size
     * @default props.theme.spacing * 1.5
     */
    size?: number;
    /** Icon color, specified as a hex, or a color name (info, success, warning, error) */
    color?: string;
    /** Use the colored version of the logo (works for `name = Pantheon` only) */
    colored?: boolean;
    /**
     * OperationalUI needs this prop to animate the inner circle.
     * All other icons should ignore it.
     */
    rotation?: number;
}
export interface PropsWithTheme extends Props {
    theme: Theme;
}
declare const _default: React.StatelessComponent<Pick<PropsWithTheme, "color" | "size" | "name" | "colored" | "rotation">>;
export default _default;
