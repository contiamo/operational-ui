import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { WithTheme, Css, CssStatic } from "../types"
export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */

  css?: any
  className?: string
  /** Children, typically a single string serving as a title. A controls element such as a condensed works well as a second child. */

  children?: React.ReactNode
}
const Container = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    ...theme.deprecated.typography.heading1,
    fontSize: 14,
    label: "cardheader",
    display: "flex",
    alignItems: "center",

    /** @todo Add to theme once colors are updated across codebase */
    backgroundColor: "#F8F8F8",

    /** @todo Add to theme once colors are updated across codebase */
    color: "#747474",
    // This ensures that the card header text and card controls are placed in opposite corners.
    justifyContent: "space-between",
    height: 40,
    margin: -20,
    marginBottom: 20,
    padding: `0 20px`,
    lineHeight: 1,
    "& > *": {
      fontSize: 12,
      color: "#909090",
    },
  }),
)

const CardHeader = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default CardHeader
