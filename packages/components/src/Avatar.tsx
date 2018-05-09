import * as React from "react"
import glamorous, { CSSProperties, Div } from "glamorous"
import { Theme } from "@operational/theme"

export type WithTheme = { theme: Theme }

export interface Props {
  name: string
  withName?: boolean
  photo?: string
  css?: CSSProperties | (<T>(props: T & WithTheme) => CSSProperties)
  className?: string
  size?: number
}

const Picture = glamorous.div(({ theme, photo }: { theme: Theme; photo?: string }) => ({
  marginRight: theme.spacing / 2,
  width: theme.spacing * 2.5,
  height: theme.spacing * 2.5,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: photo && `url(${photo})`,
}))

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  display: "block",
}))

const NameContainer = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  display: "block",
}))

const getInitials = (name: string): string => {
  if (!name) {
    return ""
  }
  const splitName = name.split(" ")
  return splitName[0].slice(0, 1) + splitName[splitName.length - 1].slice(0, 1)
}

const Avatar = (props: Props) => (
  <Container css={props.css} className={props.className}>
    <Picture photo={props.photo}>{getInitials(props.name)}</Picture>
    {props.withName && <NameContainer>{props.name}</NameContainer>}
  </Container>
)

export default Avatar
