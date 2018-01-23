import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { hexOrColor, readableTextColor } from "@operational/utils"

export interface IProps {
  id?: string | number
  className?: string
  css?: {}
  children: React.ReactNode
}

const Container = glamorous.header(({ theme }: { theme: Theme }): {} => ({
  label: "header",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: theme.colors.white,
  height: 52,
  alignItems: "center",
  padding: `${theme.spacing / 2}px ${theme.spacing * 4 / 3}px`,
  boxShadow: theme.shadows.card
}))

export default (props: IProps) => (
  <Container key={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)
