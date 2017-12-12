import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

export interface IProps {
  id?: string | number
  className?: string
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
  css?: any
}

const Container = glamorous.div({})

const SideNavigationItem = (props: IProps) => (
  <Container key={props.id} css={props.css} className={props.className} onClick={props.onClick}>
    {props.children}
  </Container>
)

export default SideNavigationItem
