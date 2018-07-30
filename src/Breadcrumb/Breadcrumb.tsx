import * as React from "react"
import Icon, { IconName } from "../Icon/Icon"
import OperationalContext from "../OperationalContext/OperationalContext"
import { darken, isModifiedEvent } from "../utils"
import { OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"

export interface Props {
  /** Navigation property à la react-router <Link/> */
  to?: string
  onClick?: (ev?: React.SyntheticEvent<React.ReactNode>) => void
  children?: React.ReactNode
  icon?: IconName
}

const containerStyles = {
  label: "breadcrumb",
  "& svg": {
    marginLeft: 4,
  },
}

const Container = styled("span")(containerStyles)

const ContainerLink = styled("a")(containerStyles, ({ theme }: { theme: OperationalStyleConstants }) => ({
  "&:link, &:visited": {
    color: theme.color.primary,
    borderBottom: "1px solid currentColor",
    "&:hover": {
      color: darken(theme.color.primary, 5),
    },
  },
}))

const Content = styled("span")()

const Breadcrumb: React.SFC<Props> = ({ to, icon, onClick, ...props }) => {
  const ContainerComponent: any = to ? ContainerLink : Container
  return (
    <OperationalContext>
      {ctx => (
        <ContainerComponent
          {...props}
          href={to}
          onClick={(ev: React.SyntheticEvent<Node>) => {
            if (onClick) {
              onClick(ev)
            }
            if (!isModifiedEvent(ev) && to && ctx.pushState) {
              ev.preventDefault()
              ctx.pushState(to)
            }
          }}
        >
          <Content>{props.children}</Content>
          {icon && <Icon name={icon} size={12} />}
        </ContainerComponent>
      )}
    </OperationalContext>
  )
}

export default Breadcrumb
