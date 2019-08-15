import * as React from "react"
import { IconComponentType } from "../Icon"
import OperationalContext from "../OperationalContext/OperationalContext"
import { DefaultProps } from "../types"
import { inputFocus, isModifiedEvent, isOutsideLink } from "../utils"
import styled from "../utils/styled"

export interface BreadcrumbProps extends DefaultProps {
  /** Navigation property à la react-router <Link/> */
  to: string
  onClick?: (ev?: React.SyntheticEvent<React.ReactNode>) => void
  children?: React.ReactNode
  icon?: IconComponentType
  /** Optionally moves icon from default position on right, to before the text, including appropriate padding */
  iconLeft?: boolean
}

const Container = styled("a")(({ theme }) => ({
  color: theme.color.primary,
  label: "breadcrumb",
  "&:hover": {
    ...inputFocus({ theme }),
  },
  "&:focus": {
    ...inputFocus({ theme }),
  },
  "& > span": {
    outline: "none",
  },
}))

const Breadcrumb: React.SFC<BreadcrumbProps> = ({ to, icon: Icon, onClick, ...props }) => (
  <OperationalContext>
    {ctx => (
      <Container
        {...props}
        tabIndex={0} // for cypress
        href={to}
        onClick={(ev: React.SyntheticEvent<Node>) => {
          if (onClick) {
            onClick(ev)
          }
          if (!isModifiedEvent(ev) && ctx.pushState && to && !isOutsideLink(to)) {
            ev.preventDefault()
            ctx.pushState(to)
          }
        }}
      >
        {Icon && props.iconLeft && <Icon size={12} left />}
        <span>{props.children}</span>
        {Icon && !props.iconLeft && <Icon size={12} right />}
      </Container>
    )}
  </OperationalContext>
)

export default Breadcrumb
