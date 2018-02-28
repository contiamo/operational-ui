import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  theme: Theme
}

const TitleType: GlamorousComponent<{}, {}> = glamorous.h1(({ theme }: Props): {} => ({
  ...theme.typography.title,
  label: "titletype"
}))

const Heading1Type: GlamorousComponent<{}, {}> = glamorous.h1(({ theme }: Props): {} => ({
  ...theme.typography.heading1,
  label: "heading1type"
}))

const Heading2Type: GlamorousComponent<{}, {}> = glamorous.h2(({ theme }: Props): {} => ({
  ...theme.typography.heading2,
  label: "heading2type"
}))

const BodyType: GlamorousComponent<{}, {}> = glamorous.p(({ theme }: Props): {} => ({
  ...theme.typography.body,
  label: "bodytype"
}))

const SmallType: GlamorousComponent<{}, {}> = glamorous.p(({ theme }: Props): {} => ({
  ...theme.typography.small,
  label: "smalltype"
}))

export { TitleType, Heading1Type, Heading2Type, BodyType, SmallType }
