import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"
import { Icon } from "@operational/components"

export interface Props {}

const Container = glamorous.footer(({ theme }: { theme: Theme }): {} => ({
  label: "footer",
  borderRadius: 4,
  color: "rgba(255, 255, 255, 0.7)",
  padding: 1.5 * theme.spacing,
  textAlign: "center",
  ...theme.typography.body,
  backgroundColor: theme.colors.navBackground
}))

const Footer = (props: Props) => <Container>Made in Berlin at Contiamo</Container>

export default Footer
