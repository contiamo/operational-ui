import * as React from "react"
import glamorous, { CSSProperties, Div } from "glamorous"
import { Theme } from "@operational/theme"

import { Avatar } from "./"

export type WithTheme = { theme: Theme }

export interface AvatarCollectionProps {
  people: {
    name: string
    photo?: string
  }[]
  size?: number
  css?: (props: WithTheme) => CSSProperties | CSSProperties
}
const AvatarCollection = ({ people = [], size = 32, css = {} }: AvatarCollectionProps) => (
  <Div css={{ display: "flex", ...css }}>
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
  </Div>
)

export default AvatarCollection
