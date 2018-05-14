import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"
import { darken } from "@operational/utils"

import Icon, { IconName } from "./Icon"
import { WithTheme, Css, CssStatic } from "./types"

export interface Props {
  css?: Css
  className?: string
  children?: React.ReactNode
  icon?: IconName | React.ReactNode
}

const Container = glamorous.span(({ theme }: WithTheme): CssStatic => ({
  label: "breadcrumb",
  "& svg": {
    marginLeft: 4,
  },
  "& a": {
    color: theme.colors.linkText,
    borderBottom: "1px solid currentColor",
    "&:hover": {
      color: darken(theme.colors.linkText, 5),
    },
  },
}))

const Content = glamorous.span(({ theme }: WithTheme): CssStatic => ({}))

const Breadcrumb = (props: Props) => {
  const reactFeatherIcon = props.icon === String(props.icon) ? (props.icon as IconName) : "ChevronDown"
  return (
    <Container className={props.className} css={props.css}>
      <Content>{props.children}</Content>
      {props.icon ? props.icon === String(props.icon) ? <Icon name={reactFeatherIcon} size={12} /> : props.icon : null}
    </Container>
  )
}

export default Breadcrumb
