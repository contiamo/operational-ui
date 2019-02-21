import * as React from "react"

import Icon, { IconName } from "../Icon/Icon"
import OperationalContext from "../OperationalContext/OperationalContext"
import { DefaultProps } from "../types"
import { darken, isModifiedEvent, isOutsideLink } from "../utils"
import { expandColor } from "../utils/constants"
import styled from "../utils/styled"

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
  icon?: IconName
  children?: React.ReactNode
}

const SimpleLink: React.SFC<SimpleLinkProps> = ({ to, children, icon, color, onClick, left, right, ...props }) => {
  const Container = styled(to ? "a" : "p")<{ color_?: string; left_?: boolean; right_?: boolean }>(
    ({ theme, color_, left_, right_ }) => {
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
        outline: "none",
        position: "relative",
        ":hover": {
          color: hoverColor,
        },
        "& > svg": {
          marginLeft: theme.space.base,
        },
      }
    },
  )

  return (
    <OperationalContext>
      {ctx => (
        <Container
          {...props}
          left_={left}
          right_={right}
          color_={color}
          href={to}
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
          {icon && <Icon right name={icon} size={12} />}
        </Container>
      )}
    </OperationalContext>
  )
}

export default SimpleLink
