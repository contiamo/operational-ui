import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"

import TimelineItem from "./TimelineItem"
import { Theme } from "contiamo-ui-theme"

export interface IProps {
  id?: string | number
  css?: {}
  className?: string
  children: any
}

const Container = glamorous.ul({
  listStyle: "none",
  padding: "0",
  margin: "0"
})

const Timeline = (props: IProps) => (
  <Container key={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Timeline
export { Timeline, TimelineItem }
