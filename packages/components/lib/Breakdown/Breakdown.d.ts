/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
import { IconName } from "../";
export interface Props {
    /** Id */
    id?: string;
    /** Glamorous CSS */
    css?: Css;
    /** Class name */
    className?: string;
    children: React.ReactNode;
    /** A number by which the breakdown is represented */
    number?: number;
    /** A statistic number label within the bar of the breakdown */
    label: string;
    /** The percentage to fill the bar. This is typically passed in from a container component that calculates percentages at large */
    fill: number;
    /** A theme palette color name, or a hex code that the bar will be colored with */
    color?: string;
    /** Bar color */
    barColor?: string;
    /** An icon that is displayed on the breakdown */
    icon?: IconName;
    /** Invoked weth the mouse click the breakdown */
    onClick?: () => void;
    /** Invoked when the mouse enters the breakdown. Useful for tooltips/infowindows */
    onMouseEnter?: () => void;
    /** Invoked when the mouse leaves the breakdown. Useful for tooltips/infowindows */
    onMouseLeave?: () => void;
}
declare const Breakdown: (props: Props) => JSX.Element;
export default Breakdown;
