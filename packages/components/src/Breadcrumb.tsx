import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"
import Icon from "./Icon"
import { ReactFeatherIconName } from "./ReactFeather"

export interface IProps {
  className?: string
  css?: {}
  children?: React.ReactNode
  icon?: ReactFeatherIconName | React.ReactNode
}

const Container = glamorous.span(({ theme }: { theme: Theme }): {} => ({
  color: theme.colors.linkText,
  "& svg": {
    marginLeft: 4
  }
}))

const Content = glamorous.span(({ theme }: { theme: Theme }): {} => ({
  borderBottom: "1px solid currentColor"
}))

export default (props: IProps) => {
  const reactFeatherIcon = props.icon === String(props.icon) ? (props.icon as ReactFeatherIconName) : "ChevronDown"
  return (
    <Container className={props.className} css={props.css}>
      <Content>{props.children}</Content>
      {props.icon ? props.icon === String(props.icon) ? <Icon name={reactFeatherIcon} size={12} /> : props.icon : null}
    </Container>
  )
}
