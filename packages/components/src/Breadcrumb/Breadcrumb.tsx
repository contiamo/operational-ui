import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import { darken } from "@operational/utils"
import { Icon, IconName, ContextConsumer, Context } from "../"
import { WithTheme, Css, CssStatic } from "../types"
import { isModifiedEvent } from "../utils"

export interface Props {
  className?: string
  /** Navigation property à la react-router <Link/> */
  to?: string
  children?: React.ReactNode
  icon?: IconName
}

const containerStyles = ({ theme }: WithTheme): CssStatic => ({
  label: "breadcrumb",
  "& svg": {
    marginLeft: 4,
  },
})

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

const Content = styled("span")(({ theme }: WithTheme): CssStatic => ({}))

const Breadcrumb = (props: Props) => {
  const reactFeatherIcon = props.icon === String(props.icon) ? (props.icon as IconName) : "ChevronDown"
  const ContainerComponent: any = props.to ? ContainerLink : Container
  return (
    <ContextConsumer>
      {(ctx: Context) => (
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
    </ContextConsumer>
  )
}

export default Breadcrumb
