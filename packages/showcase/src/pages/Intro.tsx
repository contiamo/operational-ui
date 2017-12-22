import * as React from "react"
import glamorous from "glamorous"
import { Link } from "react-router-dom"
import { Card, Icon, Heading2Type } from "@operational/components"
import { Theme } from "@operational/theme"

import PageContent from "../components/PageContent/PageContent"
import Logo from "../components/Logo/Logo"
import Demo from "../components/Demo/Demo"

const TitleBar = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  padding: `${theme.spacing * 1}px 0`,
  color: "#000",
  position: "relative",
  height: 400,
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  "& h1": {
    ...theme.typography.title,
    fontWeight: 400,
    fontSize: "2.5rem",
    textAlign: "center",
    margin: "10px 0 0px 0"
  },
  "& h2": {
    ...theme.typography.body,
    fontSize: "1.25rem",
    textAlign: "center",
    marginTop: 0
  }
}))

const TitleBarContent = glamorous.div({
  textAlign: "center",
  position: "relative",
  zIndex: 1000,
  "& svg": {
    margin: "auto"
  }
})

const MyCard = ({ className }: { className?: string }) => (
  <PageContent>
    <Card css={{ width: "100%", position: "relative", padding: 0 }}>
      <TitleBar>
        <TitleBarContent>
          <Logo size={80} />
          <h1>Operational UI</h1>
          <h2>Building blocks for effective operational interfaces</h2>
        </TitleBarContent>
        <Demo />
      </TitleBar>
    </Card>
  </PageContent>
)

export default MyCard
