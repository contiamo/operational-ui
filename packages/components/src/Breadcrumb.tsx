import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"
import { darken } from "@operational/utils"
import Icon, { IconName } from "./Icon"

export interface IProps {
  className?: string
  css?: {}
  children?: React.ReactNode
  icon?: IconName | React.ReactNode
}

const Container = glamorous.span(({ theme }: { theme: Theme }): {} => ({
  label: "breadcrumb",
  color: theme.colors.linkText,
  "& svg": {
    marginLeft: 4
  },
  "&:hover": {
    color: darken(theme.colors.linkText, 5)
  }
}))

const Content = glamorous.span(({ theme }: { theme: Theme }): {} => ({
  borderBottom: "1px solid currentColor"
}))

export default (props: IProps) => {
  const reactFeatherIcon = props.icon === String(props.icon) ? (props.icon as IconName) : "ChevronDown"
  return (
    <Container className={props.className} css={props.css}>
      <Content>{props.children}</Content>
      {props.icon ? props.icon === String(props.icon) ? <Icon name={reactFeatherIcon} size={12} /> : props.icon : null}
    </Container>
  )
}
