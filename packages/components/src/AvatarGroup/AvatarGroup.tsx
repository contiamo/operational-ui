import * as React from "react"
import glamorous, { Div } from "glamorous"
import { Theme } from "@operational/theme"

import { Avatar } from "../../"
import { WithTheme, Css, CssStatic } from "../types"

export interface AvatarItem {
  photo?: string
  name: string
}
export interface Props {
  /** `css` prop as expected in a glamorous component */
  css?: Css
  /** Class name */
  className?: string
  children?: React.ReactNode
  /** Avatars list */
  avatars?: AvatarItem[]
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
    {props.avatars ? props.avatars.map(avatar => <Avatar {...avatar} />) : props.children}
  </Container>
)

export default AvatarGroup
