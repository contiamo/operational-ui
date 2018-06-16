import * as React from "react"
import styled from "react-emotion"
import { Css } from "../types"
export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */

  css?: Css
  className?: string
  children: React.ReactNode
}
const Container = styled("ul")({
  label: "timeline",
  listStyle: "none",
  padding: "0",
  margin: "0",
})

const Timeline = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Timeline
