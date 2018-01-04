/// <reference types="react" />
import * as React from "react";
import { GlamorousComponent } from "glamorous";
import { Theme } from "@operational/theme";
import TooltipStyle from "./Tooltip/Tooltip.style";
/**
  The <Tooltip /> component.

  The problem:
  Say you have a container with `overflow: hidden`.
  Say this container has items that need to show tooltips, that appear
  _outside_ of page flow, and are not clipped by the overflow.

  The solution is to use `position: fixed`, with dynamically calculated
  positions at the time of mounting, but React makes this a little
  tricky, especially if you want a simple API.

  This solution:
  A tooltip is placed in an absolute position, relative to its parent,
  even risking getting cut off to overflow.

  At the time of mounting, this _perfect_ position of the tooltip is captured
  relative to `document`. These coordinates are then set as CSS properties
  on the tooltip, along with `position: fixed` and all is well with the
  world. 🌈
*/
export interface TooltipPosition extends React.CSSProperties {
    position: "absolute" | "fixed";
    transform?: string;
    top?: number;
    left?: number;
    bottom?: number | string;
}
export interface IRectCoords {
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
}
export interface IProps {
    className?: string;
    children?: React.ReactNode;
    active?: boolean;
    anchor?: string;
    color?: string;
    betaFixOverflow?: boolean;
}
export interface IState {
    style: TooltipPosition;
}
declare class Tooltip extends React.Component<IProps, IState> {
    static defaultProps: {
        anchor: string;
        active: boolean;
    };
    state: IState;
    tooltip: HTMLDivElement;
    componentDidMount(): void;
    getPosition(): TooltipPosition;
    render(): JSX.Element;
}
declare const _default: GlamorousComponent<IProps & object & Pick<{
    theme: Theme;
    color?: string;
    anchor?: string;
}, "color" | "anchor">, {
    theme: Theme;
    color?: string;
    anchor?: string;
}>;
export default _default;
export { Tooltip, TooltipStyle as style };
