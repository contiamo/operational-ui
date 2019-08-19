import * as React from "react"

import OperationalContext from "../OperationalContext/OperationalContext"
import { DefaultProps } from "../types"
import { darken, inputFocus, isModifiedEvent, isOutsideLink } from "../utils"
import { expandColor } from "../utils/constants"
import styled from "../utils/styled"
import { IconComponentType } from "../Icon"

export interface SimpleLinkProps extends DefaultProps {
  /** Invoked when you click on the button */
  onClick?: (e?: React.SyntheticEvent<React.ReactNode>) => void
  /** Navigation property à la react-router <Link/> */
  to?: string
  /** SimpleLink color theme (hex or named color from `theme.color`) */
  color?: string
  /**
   * Indicates that this component is left of other content, and adds an appropriate right margin.
   */
  left?: boolean
  /**
   * Indicates that this component is right of other content, and adds an appropriate left margin.
   */
  right?: boolean
  /** Icon to display on right or left of button (optional) */
  icon?: IconComponentType
  children?: React.ReactNode
}

const BaseSimpleLink = styled<"a" | "button">("button", {
  shouldForwardProp: prop => !["color_", "left_", "right_", "as"].includes(prop),
})<{
  color_?: string
  left_?: boolean
  right_?: boolean
  as?: "button" | "a"
}>(({ theme, color_, left_, right_ }) => {
  const actualColor = color_ ? expandColor(theme, color_) || color_ : theme.color.primary
  const hoverColor = darken(actualColor, 5)
  return {
    actualColor,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: right_ ? theme.space.base : 0,
    marginRight: left_ ? theme.space.base : 0,
    fontSize: theme.font.size.fineprint,
    fontFamily: theme.font.family.main,
    fontWeight: theme.font.weight.medium,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.borderRadius,
    border: 0,
    position: "relative",
    cursor: "pointer",
    ":focus": {
      ...inputFocus({ theme }),
    },
    ":hover": {
      color: hoverColor,
    },
    "& > svg": {
      marginLeft: theme.space.base,
    },
  }
})

const SimpleLink: React.SFC<SimpleLinkProps> = ({
  to,
  children,
  icon: Icon,
  color,
  onClick,
  left,
  right,
  ...props
}) => {
  return (
    <OperationalContext>
      {ctx => (
        <BaseSimpleLink
          {...props}
          as={to ? "a" : undefined}
          left_={left}
          right_={right}
          color_={color}
          href={to}
          role="button"
          aria-label={typeof children === "string" ? children : undefined}
          onClick={(ev: React.SyntheticEvent<React.ReactNode>) => {
            if (onClick) {
              onClick()
            }

            if (!isModifiedEvent(ev) && ctx.pushState && to && !isOutsideLink(to)) {
              ev.preventDefault()
              ctx.pushState(to)
            }
          }}
        >
          {children}
          {Icon && <Icon right size={12} />}
        </BaseSimpleLink>
      )}
    </OperationalContext>
  )
}

export default SimpleLink
