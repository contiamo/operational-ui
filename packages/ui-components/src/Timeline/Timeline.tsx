import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"

import TimelineItem from "./TimelineItem"
import { Theme } from "contiamo-ui-theme"

export interface IProps {
  key?: string | number
  css?: {}
  className?: string
  children: any
}

const Container = glamorous.ul({
  listStyle: "none",
  padding: "0",
  margin: "0"
})

const Timeline: React.SFC<IProps> = ({ key, css, className, children }: IProps) => (
  <Container key={key} css={css} className={className}>
    {children}
  </Container>
)

export default Timeline
export { Timeline, TimelineItem }
