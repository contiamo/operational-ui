import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

export interface IProps {
  id?: string | number
  css?: {}
  className?: string
  children: any
}

const Container = glamorous.ul({
  label: "timeline",
  listStyle: "none",
  padding: "0",
  margin: "0"
})

export default (props: IProps) => (
  <Container key={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)
