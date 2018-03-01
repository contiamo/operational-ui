import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  id?: string | number
  css?: {}
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "sidebar",
  width: "100%",
  maxWidth: 280,
  maxHeight: "100%",
  boxShadow: theme.shadows.card,
  position: "relative",
  overflow: "hidden",
  scrollBehavior: "smooth", // future-proof
  backgroundColor: theme.colors.cardBackground,
  color: theme.colors.gray80
}))

const Sidebar = (props: Props) => (
  <Container key={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Sidebar
