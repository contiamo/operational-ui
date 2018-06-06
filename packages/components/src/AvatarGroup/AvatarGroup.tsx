import * as React from "react"
import glamorous, { Div } from "glamorous"
import { Theme } from "@operational/theme"

import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  /** `css` prop as expected in a glamorous component */
  css?: Css
  /** Class name */
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(
  ({ theme }: WithTheme): CssStatic => ({
    label: "avatar-group",
    display: "flex",
    "& :not(:first-child)": {
      marginLeft: theme.spacing * -1,
      "& > .opui_avatar-picture": { boxShadow: "-1px 0 0 1px white" },
    },
    "& .opui_name-container": {
      display: "none",
    },
  }),
)

const AvatarGroup = (props: Props) => (
  <Container css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default AvatarGroup
