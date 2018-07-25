import * as React from "react"
import styled from "react-emotion"
import Icon, { IconName } from "../Icon/Icon"
import { Consumer as OperationalContext } from "../OperationalUI/OperationalUI"
import { darken, isModifiedEvent } from "../utils"
import { OperationalStyleConstants } from "../utils/constants"

export interface Props {
  className?: string
  /** Navigation property à la react-router <Link/> */
  to?: string
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

const Breadcrumb = (props: Props) => {
  const ContainerComponent: any = props.to ? ContainerLink : Container
  return (
    <OperationalContext>
      {ctx => (
        <ContainerComponent
          className={props.className}
          href={props.to}
          onClick={(ev: React.SyntheticEvent<Node>) => {
            if (!isModifiedEvent(ev) && props.to && ctx.pushState) {
              ev.preventDefault()
              ctx.pushState(props.to)
            }
          }}
        >
          <Content>{props.children}</Content>
          {props.icon && <Icon name={props.icon} size={12} />}
        </ContainerComponent>
      )}
    </OperationalContext>
  )
}

export default Breadcrumb
