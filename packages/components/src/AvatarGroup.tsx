import * as React from "react"
import glamorous, { CSSProperties, Div } from "glamorous"
import { Theme } from "@operational/theme"

import { Avatar } from "./"

export type WithTheme = { theme: Theme }

export interface Props {
  people: {
    name: string
    photo?: string
  }[]
  size?: number
  css?: (props: WithTheme) => CSSProperties | CSSProperties
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "avatar-group",
  display: "flex",
}))

const AvatarGroup = ({ people = [], size = 32, css = {} }: Props) => (
  <Container>
    {people.map((person, index) => (
      <Avatar
        key={index}
        css={({ theme }: WithTheme) => ({
          ":not(:first-child)": { marginLeft: theme.spacing * -0.5, boxShadow: "-2px 0 0 1px white" },
        })}
        size={size}
        name={person.name}
        photo={person.photo}
      />
    ))}
  </Container>
)

export default AvatarGroup
