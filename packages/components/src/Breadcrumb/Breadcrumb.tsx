import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"
import { darken } from "@operational/utils"

import { Icon, IconName, ContextConsumer, Context } from "../"
import { WithTheme, Css, CssStatic } from "../types"
import { isModifiedEvent } from "../utils"

export interface Props {
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  /** Navigation property à la react-router <Link/> */
  to?: string
  children?: React.ReactNode
  icon?: IconName | React.ReactNode
}

const containerStyles = ({ theme }: WithTheme): CssStatic => ({
  label: "breadcrumb",
  "& svg": {
    marginLeft: 4,
  },
  "a&": {
    color: theme.colors.linkText,
    borderBottom: "1px solid currentColor",
    "&:hover": {
      color: darken(theme.colors.linkText, 5),
    },
  },
})

const Container = glamorous.span(containerStyles)

const ContainerLink = glamorous.a(containerStyles)

const Content = glamorous.span(({ theme }: WithTheme): CssStatic => ({}))

const Breadcrumb = (props: Props) => {
  const reactFeatherIcon = props.icon === String(props.icon) ? (props.icon as IconName) : "ChevronDown"
  const ContainerComponent = props.to ? ContainerLink : Container
  return (
    <ContextConsumer>
      {(ctx: Context) => (
        <ContainerComponent
          className={props.className}
          css={props.css}
          href={props.to}
          onClick={(ev: React.SyntheticEvent<Node>) => {
            if (!isModifiedEvent(ev) && props.to && ctx.pushState) {
              ev.preventDefault()
              ctx.pushState(props.to)
            }
          }}
        >
          <Content>{props.children}</Content>
          {props.icon ? (
            props.icon === String(props.icon) ? (
              <Icon name={reactFeatherIcon} size={12} />
            ) : (
              props.icon
            )
          ) : null}
        </ContainerComponent>
      )}
    </ContextConsumer>
  )
}

export default Breadcrumb
