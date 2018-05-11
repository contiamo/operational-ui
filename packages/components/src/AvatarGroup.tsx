import * as React from "react"
import glamorous, { CSSProperties, Div } from "glamorous"
import { Theme } from "@operational/theme"

import { Avatar } from "./"

export type WithTheme = { theme: Theme }

export interface Props {
  css?: (props: WithTheme) => CSSProperties | CSSProperties
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "avatar-group",
  display: "flex",
  "& :not(:first-child)": {
    marginLeft: theme.spacing * -1,
    "& > .opui_avatar-picture": { boxShadow: "-1px 0 0 1px white" },
  },
  "& .opui_name-container": {
    display: "none",
  },
}))

const AvatarGroup = (props: Props) => (
  <Container css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default AvatarGroup
