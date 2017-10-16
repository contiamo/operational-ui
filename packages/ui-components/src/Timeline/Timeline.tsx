import * as React from "react"
import glamorous from "glamorous"

import TimelineItem from "./Item/TimelineItem"

interface IProps {
  style?: any
  className?: string
  children: any
}

const Container = glamorous.ul({
  listStyle: "none",
  padding: "0",
  margin: "0"
})

const Timeline: React.SFC<IProps> = ({ style, className, children }: IProps) => (
  <Container style={style} className={className}>
    {children}
  </Container>
)

export default Timeline
export { Timeline, TimelineItem }
