import * as React from "react"
import { IconComponentType } from "../Icon/Icon"
import OperationalContext from "../OperationalContext/OperationalContext"
import { DefaultProps } from "../types"
import { darken, isModifiedEvent, isOutsideLink } from "../utils"
import { OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"

export interface BreadcrumbProps extends DefaultProps {
  /** Navigation property à la react-router <Link/> */
  to: string
  onClick?: (ev?: React.SyntheticEvent<React.ReactNode>) => void
  children?: React.ReactNode
  icon?: IconComponentType
}

const Container = styled("a")(({ theme }: { theme: OperationalStyleConstants }) => ({
  color: theme.color.primary,
  label: "breadcrumb",
  "&:hover": {
    color: darken(theme.color.primary, 5),
  },
}))

const Breadcrumb: React.SFC<BreadcrumbProps> = ({ to, icon: Icon, onClick, ...props }) => (
  <OperationalContext>
    {ctx => (
      <Container
        {...props}
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
        <span>{props.children}</span>
        {Icon && <Icon size={12} right />}
      </Container>
    )}
  </OperationalContext>
)

export default Breadcrumb
