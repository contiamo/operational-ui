import * as React from "react"
import glamorous from "glamorous"

import TimelineItem from "./Item/TimelineItem"

type Props = {
  className?: string
  children: any
}

const Container = glamorous.ul({
  listStyle: "none",
  padding: "0",
  margin: "0"
})

const Timeline: React.SFC<Props> = ({ className, children }: Props) => (
  <Container className={className}>{children}</Container>
)

export default Timeline
export { Timeline, TimelineItem }
