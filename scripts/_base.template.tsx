import React, { MouseEventHandler } from "react"

import styled from "../src/utils/styled"

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
  pointer-events: all;
  transition: background-color 0.2s, fill 0.075s ease;

  ${({ onClick, theme, size = 18 }) =>
    onClick
      ? `
    &:hover {
      background: ${theme.color.separators.default};
    }
    min-height: ${size + theme.space.small}px;
    min-width: ${size + theme.space.small}px;
    border-radius: 100%;
    cursor: pointer;
    padding: ${theme.space.base};
  `
      : ""}

  margin-left: ${({ right, theme }) => (right ? theme.space.small : 0)}px;
  margin-right: ${({ left, theme }) => (left ? theme.space.small : 0)}px;
  outline: none;
`
