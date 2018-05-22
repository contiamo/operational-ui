/// <reference types="react" />
import * as React from "react";
import { IconName } from "../";
import { Css } from "../types";
export interface Props {
    /** Id */
    id?: string;
    /** Glamorous CSS */
    css?: Css;
    /**
     * What color of chip would you like? It can be a hex value or a named theme color
     * @default  The `primary` color of your theme.
     */
    color?: string;
    /** Handle clicks on the chip's body. This is never triggered when the icon bar is clicked. When an icon is not specified, however, this basically turns into a full element click handler. */
    onClick?: () => void;
    /** Handle clicks on the chip's icon area on the right  */
    onIconClick?: () => void;
    /** Class name */
    className?: string;
    children: React.ReactNode;
    /** The name of the icon shown in the right icon bar area of the chip. A typical use here would be the `X` icon for closing the chip. Note that this icon is only displayed if there is an `onIconClick` prop present.  */
    icon?: IconName | React.ReactNode;
}
declare const Chip: (props: Props) => JSX.Element;
export default Chip;
