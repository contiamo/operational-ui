import React, { MouseEventHandler } from "react"

import styled from "../utils/styled"

export interface IconPropsBase extends React.SVGProps<SVGSVGElement> {
  /**
   * Size
   *
   * @default 18
   */
  size?: number
  /** Icon color, specified as a hex, or a color name (info, success, warning, error) */
  color?: string
  onClick?: MouseEventHandler
  tabIndex?: number
}

export type IconProps =
  | (IconPropsBase & {
      left?: never
      /**
       * Indicates that this component is right of other content, and adds an appropriate left margin.
       */
      right?: boolean
    })
  | (IconPropsBase & {
      /**
       * Indicates that this component is left of other content, and adds an appropriate right margin.
       */
      left?: boolean
      right?: never
    })

export type IconComponentType = React.ComponentType<React.SVGProps<SVGSVGElement> & IconProps>

export const Svg = styled.svg<IconProps>`
  min-height: ${({ size = 18 }) => size}px;
  min-width: ${({ size = 18 }) => size}px;
  /* otherwise corners of icon cut out */
  overflow: visible;
  margin-left: ${({ right, theme }) => (right ? theme.space.small : 0)}px;
  margin-right: ${({ left, theme }) => (left ? theme.space.small : 0)}px;

  ${({ onClick, theme }) =>
    onClick
      ? `
    padding: ${theme.space.base}px;
    cursor: pointer;
    outline: none;
    :hover, :focus, .no-focus &:hover:focus {
      background: ${theme.color.background.light};
      /* we need to set it here, because otherwise icon takes shape of ellipse at least in Chrome, for unknown reason */
      border-radius: 100%;
    }
    .no-focus &:focus {
      background: initial;
      border-radius: 0;
    }
    `
      : ""}
`
