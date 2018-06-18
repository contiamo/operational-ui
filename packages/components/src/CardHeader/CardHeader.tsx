import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: any
  className?: string
  /** As title, please note that is override by `title` if provided */
  children?: React.ReactNode
  /** Main title */
  title?: React.ReactNode
  /** Action part (right side), this is typically where to put a button */
  action?: React.ReactNode
}

const Container = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  fontFamily: theme.font.family.main,
  fontSize: theme.font.size.body,
  label: "cardheader",
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.color.background.lighter, // "#F8F8F8",
  color: theme.color.text.lighter,
  // This ensures that the card header text and card controls are placed in opposite corners.
  justifyContent: "space-between",
  height: 40,
  margin: -20,
  marginBottom: 20,
  padding: `0 20px`,
  lineHeight: 1,
  "& > :not(:first-child)": {
    fontSize: 12,
    color: "#909090",
  },
}))

const CardHeader = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    <div>{props.title || props.children}</div>
    <div>{props.action}</div>
  </Container>
)

export default CardHeader
