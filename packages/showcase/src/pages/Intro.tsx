import * as React from "react"
import glamorous from "glamorous"
import { Link } from "react-router-dom"
import { Card, Icon, Heading2Type } from "@operational/components"
import { Theme } from "@operational/theme"

import PageContent from "../components/PageContent/PageContent"
import Demo from "../components/Demo/Demo"

const TitleBar = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  padding: `${theme.spacing * 1}px 0`,
  color: "#000",
  borderBottom: `1px solid ${theme.colors.separator}`,
  "& > h1": {
    ...theme.typography.title,
    textAlign: "center",
    margin: 0
  },
  "& > h2": {
    ...theme.typography.body,
    textAlign: "center",
    marginTop: 0
  }
}))

const MyCard = ({ className }: { className?: string }) => (
  <PageContent>
    <Card css={{ width: "100%", position: "relative" }}>
      <TitleBar>
        <h1>Operational UI</h1>
        <h2>Building blocks for effective operational interfaces</h2>
      </TitleBar>
      <Demo />
    </Card>
  </PageContent>
)

export default MyCard
