import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  children?: React.ReactNode
}

const Container = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): {} => ({
    label: "Messages",
    position: "fixed",
    zIndex: theme.deprecated.baseZIndex + 500,
    bottom: 2 * theme.deprecated.spacing,
    right: 2 * theme.deprecated.spacing,
    "& > *": {
      width: 400,
      height: "auto",
      marginTop: theme.deprecated.spacing / 2,
    },
  }),
)

const Messages = (props: Props) => (
  <Container css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Messages
